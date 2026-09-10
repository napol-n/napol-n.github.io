async function loadProjects() {
  const projectGrid = document.getElementById("project-grid");
  const projectCount = document.getElementById("project-count");

  try {
    const response = await fetch("data/projects.json");

    if (!response.ok) {
      throw new Error(
        `HTTP error: ${response.status}`
      );
    }

    const projects = await response.json();

    projectCount.textContent =
      String(projects.length).padStart(2, "0");


    projectGrid.innerHTML = projects
      .map((project, index) => {

        const statusClass =
          project.status === "ACTIVE"
            ? "active"
            : "complete";


        const technologies =
          project.technologies
            .map(
              technology =>
                `<span>${technology}</span>`
            )
            .join("");


        const projectNumber =
          String(index + 1)
            .padStart(2, "0");


        return `
          <article class="project-card">

            <div class="project-header">

              <span class="project-id">
                ${projectNumber}
                //
                ${project.id}
              </span>

              <span class="tag ${statusClass}">
                ${project.status}
              </span>

            </div>


            <h3>
              ${project.title}
            </h3>


            <p>
              ${project.description}
            </p>


            <div class="tags">
              ${technologies}
            </div>


            <a
              class="project-link"
              href="${project.url}"
              target="_blank"
              rel="noopener"
            >
              OPEN_PROJECT →
            </a>

          </article>
        `;
      })
      .join("");

  } catch (error) {

    projectGrid.innerHTML = `
      <div class="project-card">

        <span class="project-id">
          ERROR
        </span>

        <h3>
          Project database unavailable
        </h3>

        <p>
          Could not load data/projects.json
        </p>

      </div>
    `;

    projectCount.textContent = "ERR";

    console.error(
      "Project loading failed:",
      error
    );
  }
}


function updateClock() {

  const clock =
    document.getElementById(
      "system-clock"
    );


  const time =
    new Intl.DateTimeFormat(
      "en-GB",
      {
        timeZone: "Asia/Bangkok",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      }
    )
    .format(new Date());


  clock.textContent = time;
}


loadProjects();

updateClock();

setInterval(
  updateClock,
  1000
);
