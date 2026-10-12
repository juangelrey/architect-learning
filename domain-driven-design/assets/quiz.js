/*
 * Shared quiz component for the DDD review course.
 *
 * Multiple choice:
 *   <div class="q" data-topic="strategic" data-answer="2">   (answer = 0-based index of correct <li>)
 *     <p class="stem">…</p>
 *     <ol class="options"><li>…</li>…</ol>
 *     <div class="explain">…</div>
 *   </div>
 *   Options are shuffled on load, so the position never gives the answer away.
 *
 * Free recall / scenario:
 *   <div class="recall" data-topic="strategic">
 *     <p class="prompt">…</p>
 *     <textarea></textarea>
 *     <div class="model">… <ul class="rubric"><li>criterion</li>…</ul></div>
 *   </div>
 *   The user writes an answer, reveals the model answer, then self-grades with the rubric checkboxes.
 *
 * Scoreboard: <div id="scoreboard"></div>. Renders per-topic scores and a "Copy results" button.
 */
(function () {
  const TOPICS = {
    strategic: "Part I · Strategic design",
    tactical: "Part II · Tactical design",
    practice: "Part III · DDD in practice",
    beyond: "Part IV · Relationships to other methods",
  };
  const lessonId = document.body.dataset.lesson || location.pathname;
  const state = { mc: [], recall: [] };

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // ---- Multiple choice ----
  document.querySelectorAll(".q").forEach((q, idx) => {
    const list = q.querySelector("ol.options");
    const items = Array.from(list.children);
    const answer = parseInt(q.dataset.answer, 10);
    items.forEach((li, i) => (li.dataset.correct = i === answer ? "1" : "0"));
    shuffle(items).forEach((li) => list.appendChild(li));

    const record = { n: idx + 1, topic: q.dataset.topic, answered: false, correct: false };
    state.mc.push(record);

    const explain = q.querySelector(".explain");
    const verdict = document.createElement("span");
    verdict.className = "verdict";
    if (explain) explain.prepend(verdict);

    items.forEach((li) =>
      li.addEventListener("click", () => {
        if (q.classList.contains("answered")) return;
        q.classList.add("answered");
        const ok = li.dataset.correct === "1";
        record.answered = true;
        record.correct = ok;
        items.forEach((o) => o.dataset.correct === "1" && o.classList.add("correct"));
        if (!ok) li.classList.add("wrong");
        verdict.textContent = ok ? "Correct." : "Not quite.";
        verdict.classList.add(ok ? "ok" : "bad");
        render();
      })
    );
  });

  // ---- Free recall / scenarios ----
  document.querySelectorAll(".recall").forEach((r, idx) => {
    const model = r.querySelector(".model");
    const rubricItems = Array.from(r.querySelectorAll(".rubric li"));
    const record = { n: idx + 1, topic: r.dataset.topic, title: r.dataset.title || `Exercise ${idx + 1}`, total: rubricItems.length, got: 0, revealed: false };
    state.recall.push(record);

    rubricItems.forEach((li) => {
      const label = document.createElement("label");
      const box = document.createElement("input");
      box.type = "checkbox";
      box.disabled = true;
      label.append(box, " ", ...li.childNodes);
      li.appendChild(label);
      box.addEventListener("change", () => {
        record.got = r.querySelectorAll(".rubric input:checked").length;
        render();
      });
    });

    const btn = document.createElement("button");
    btn.textContent = "Reveal model answer";
    btn.addEventListener("click", () => {
      r.classList.add("revealed");
      record.revealed = true;
      btn.disabled = true;
      r.querySelectorAll(".rubric input").forEach((b) => (b.disabled = false));
      render();
    });
    model.before(btn);
  });

  // ---- Scoreboard ----
  const board = document.getElementById("scoreboard");

  function summarize() {
    const rows = {};
    Object.keys(TOPICS).forEach((t) => (rows[t] = { got: 0, total: 0 }));
    state.mc.forEach((r) => {
      if (!rows[r.topic]) return;
      rows[r.topic].total += 1;
      if (r.correct) rows[r.topic].got += 1;
    });
    state.recall.forEach((r) => {
      if (!rows[r.topic] || !r.revealed) return;
      rows[r.topic].total += r.total;
      rows[r.topic].got += r.got;
    });
    return rows;
  }

  function resultsText() {
    const rows = summarize();
    const lines = [`DDD review results: ${document.title} (${new Date().toISOString().slice(0, 10)})`];
    Object.entries(rows).forEach(([t, v]) => v.total && lines.push(`- ${TOPICS[t]}: ${v.got}/${v.total}`));
    const missed = state.mc.filter((r) => r.answered && !r.correct).map((r) => `Q${r.n}`);
    const skipped = state.mc.filter((r) => !r.answered).map((r) => `Q${r.n}`);
    lines.push(`- Missed: ${missed.join(", ") || "none"}`);
    if (skipped.length) lines.push(`- Unanswered: ${skipped.join(", ")}`);
    state.recall.forEach((r) => lines.push(`- ${r.title}: ${r.revealed ? `${r.got}/${r.total} rubric points` : "not attempted"}`));
    return lines.join("\n");
  }

  function render() {
    if (!board) return;
    const rows = summarize();
    const answered = state.mc.filter((r) => r.answered).length;
    let html = `<div class="kicker">Scoreboard</div>
      <p class="small">${answered}/${state.mc.length} questions answered. Scenario rubrics count once revealed.</p>
      <table><thead><tr><th>Part</th><th>Score</th><th></th></tr></thead><tbody>`;
    Object.entries(rows).forEach(([t, v]) => {
      const pct = v.total ? Math.round((100 * v.got) / v.total) : 0;
      html += `<tr><td><span class="tag ${t}">${t}</span> ${TOPICS[t]}</td>
        <td>${v.got}/${v.total}</td>
        <td><div class="bar"><span style="width:${pct}%"></span></div></td></tr>`;
    });
    html += `</tbody></table>
      <button id="copy-results">Copy results for your teacher</button>
      <span id="copy-status" class="small"></span>`;
    board.innerHTML = html;
    board.querySelector("#copy-results").addEventListener("click", copy);
  }

  function copy() {
    const text = resultsText();
    try {
      const history = JSON.parse(localStorage.getItem("ddd-results") || "[]");
      history.push({ lesson: lessonId, at: new Date().toISOString(), text });
      localStorage.setItem("ddd-results", JSON.stringify(history));
    } catch (e) { /* storage unavailable: ignore */ }
    const status = document.getElementById("copy-status");
    const done = () => (status.textContent = " Copied. Paste it into the chat.");
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(done, () => fallback(text));
    } else fallback(text);
    function fallback(t) {
      const ta = document.createElement("textarea");
      ta.value = t;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
      done();
    }
  }

  render();
})();
