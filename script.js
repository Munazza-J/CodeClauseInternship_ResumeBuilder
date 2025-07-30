// Utility to format bulleted text from textarea
function formatBullets(text) {
  const lines = text.split("\n").filter(line => line.trim() !== "");
  return lines.map(line => `• ${line.trim()}`).join("\n");
}

// Utility to format plain text (for paragraphs like experience/projects)
function formatParagraph(text) {
  return text.trim().replace(/\n+/g, "\n");
}

// Input fields
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const phoneInput = document.getElementById("phoneInput");
const linkedinInput = document.getElementById("linkedinInput");
const summaryInput = document.getElementById("summaryInput");
const educationInput = document.getElementById("educationInput");
const techSkillsInput = document.getElementById("techSkillsInput");
const softSkillsInput = document.getElementById("softSkillsInput");
const projectsInput = document.getElementById("projectsInput");
const achievementsInput = document.getElementById("achievementsInput");
const experienceInput = document.getElementById("experienceInput");

// Preview fields
const previewName = document.getElementById("previewName");
const previewEmail = document.getElementById("previewEmail");
const previewPhone = document.getElementById("previewPhone");
const previewLinkedIn = document.getElementById("previewLinkedIn");
const previewSummary = document.getElementById("previewSummary");
const previewEducation = document.getElementById("previewEducation");
const previewTechSkills = document.getElementById("previewTechSkills");
const previewSoftSkills = document.getElementById("previewSoftSkills");
const previewProjects = document.getElementById("previewProjects");
const previewAchievements = document.getElementById("previewAchievements");
const previewExperience = document.getElementById("previewExperience");

// Update preview on input
nameInput.addEventListener("input", () => {
  previewName.textContent = nameInput.value || "Your Name";
  applyScaleToFit(document.getElementById("pdfContent"));
});
emailInput.addEventListener("input", () => {
  previewEmail.textContent = emailInput.value || "you@example.com";
  applyScaleToFit(document.getElementById("pdfContent"));
});
phoneInput.addEventListener("input", () => {
  previewPhone.textContent = phoneInput.value || "123-456-7890";
  applyScaleToFit(document.getElementById("pdfContent"));
});
linkedinInput.addEventListener("input", () => {
  previewLinkedIn.textContent = linkedinInput.value || "linkedin.com/in/yourname";
  applyScaleToFit(document.getElementById("pdfContent"));
});
summaryInput.addEventListener("input", () => {
  previewSummary.textContent = formatBullets(summaryInput.value) || "Your summary will appear here.";
  applyScaleToFit(document.getElementById("pdfContent"));
});
educationInput.addEventListener("input", () => {
  previewEducation.textContent = formatParagraph(educationInput.value) || "Your education details here.";
  applyScaleToFit(document.getElementById("pdfContent"));
});
techSkillsInput.addEventListener("input", () => {
  previewTechSkills.textContent = formatBullets(techSkillsInput.value) || "List of technical skills...";
  applyScaleToFit(document.getElementById("pdfContent"));
});
softSkillsInput.addEventListener("input", () => {
  previewSoftSkills.textContent = formatBullets(softSkillsInput.value) || "List of soft skills...";
  applyScaleToFit(document.getElementById("pdfContent"));
});
projectsInput.addEventListener("input", () => {
  previewProjects.textContent = formatParagraph(projectsInput.value) || "Your project descriptions...";
  applyScaleToFit(document.getElementById("pdfContent"));
});
achievementsInput.addEventListener("input", () => {
  previewAchievements.textContent = formatParagraph(achievementsInput.value) || "Certificates or achievements...";
  applyScaleToFit(document.getElementById("pdfContent"));
});
experienceInput.addEventListener("input", () => {
  previewExperience.textContent = formatParagraph(experienceInput.value) || "Experience info or job title...";
  applyScaleToFit(document.getElementById("pdfContent"));
});


// Helper to apply appropriate scale class
function applyScaleToFit(element) {
  const height = element.scrollHeight;
  const maxHeight = 1123;

  // Clean previous scale classes
  element.classList.remove("scale-small", "scale-smaller", "scale-tiny", "shrink-text");

  if (height > maxHeight * 1.4) {
    element.classList.add("scale-tiny", "shrink-text");
  } else if (height > maxHeight * 1.2) {
    element.classList.add("scale-smaller", "shrink-text");
  } else if (height > maxHeight) {
    element.classList.add("scale-small");
  }
}

// Export to PDF with scaling
async function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const element = document.getElementById("pdfContent");

  // Clean up old classes
  element.classList.remove(
    "scale-small",
    "scale-smaller",
    "scale-tiny",
    "shrink-text",
    "tiny-text"
  );

  // Wait a bit for the reset
  await new Promise(res => setTimeout(res, 100));

  const maxHeight = 1123;
  let attempts = [
    [], // Original
    ["scale-small"],
    ["scale-smaller", "shrink-text"],
    ["scale-tiny", "tiny-text"]
  ];

  for (let classes of attempts) {
    // Reset classes
    element.classList.remove("scale-small", "scale-smaller", "scale-tiny", "shrink-text", "tiny-text");

    // Apply this combination
    classes.forEach(cls => element.classList.add(cls));
    await new Promise(res => setTimeout(res, 100)); // wait for styles to apply

    // Check height
    if (element.scrollHeight <= maxHeight) break;
  }

  // Convert to canvas
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    scrollY: -window.scrollY
  });

  // Generate PDF
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "pt", "a4");
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const imgProps = pdf.getImageProperties(imgData);
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save("resume.pdf");

  // Optional cleanup
  element.classList.remove("scale-small", "scale-smaller", "scale-tiny", "shrink-text", "tiny-text");
}


/* Utility to format bulleted text from textarea
function formatBullets(text) {
  const lines = text.split("\n").filter(line => line.trim() !== "");
  return lines.map(line => `• ${line.trim()}`).join("\n");
}

// Utility to format plain text (for paragraphs like experience/projects)
function formatParagraph(text) {
  return text.trim().replace(/\n+/g, "\n");
}

// Input fields
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const phoneInput = document.getElementById("phoneInput");
const linkedinInput = document.getElementById("linkedinInput");
const summaryInput = document.getElementById("summaryInput");
const educationInput = document.getElementById("educationInput");
const techSkillsInput = document.getElementById("techSkillsInput");
const softSkillsInput = document.getElementById("softSkillsInput");
const projectsInput = document.getElementById("projectsInput");
const achievementsInput = document.getElementById("achievementsInput");
const experienceInput = document.getElementById("experienceInput");

// Preview fields
const previewName = document.getElementById("previewName");
const previewEmail = document.getElementById("previewEmail");
const previewPhone = document.getElementById("previewPhone");
const previewLinkedIn = document.getElementById("previewLinkedIn");
const previewSummary = document.getElementById("previewSummary");
const previewEducation = document.getElementById("previewEducation");
const previewTechSkills = document.getElementById("previewTechSkills");
const previewSoftSkills = document.getElementById("previewSoftSkills");
const previewProjects = document.getElementById("previewProjects");
const previewAchievements = document.getElementById("previewAchievements");
const previewExperience = document.getElementById("previewExperience");

// Update preview on input
nameInput.addEventListener("input", () => {
  previewName.textContent = nameInput.value || "Your Name";
});
emailInput.addEventListener("input", () => {
  previewEmail.textContent = emailInput.value || "you@example.com";
});
phoneInput.addEventListener("input", () => {
  previewPhone.textContent = phoneInput.value || "123-456-7890";
});
linkedinInput.addEventListener("input", () => {
  previewLinkedIn.textContent = linkedinInput.value || "linkedin.com/in/yourname";
});
summaryInput.addEventListener("input", () => {
  previewSummary.textContent = formatBullets(summaryInput.value) || "Your summary will appear here.";
});
educationInput.addEventListener("input", () => {
  previewEducation.textContent = formatParagraph(educationInput.value) || "Your education details here.";
});
techSkillsInput.addEventListener("input", () => {
  previewTechSkills.textContent = formatBullets(techSkillsInput.value) || "List of technical skills...";
});
softSkillsInput.addEventListener("input", () => {
  previewSoftSkills.textContent = formatBullets(softSkillsInput.value) || "List of soft skills...";
});
projectsInput.addEventListener("input", () => {
  previewProjects.textContent = formatParagraph(projectsInput.value) || "Your project descriptions...";
});
achievementsInput.addEventListener("input", () => {
  previewAchievements.textContent = formatParagraph(achievementsInput.value) || "Certificates or achievements...";
});
experienceInput.addEventListener("input", () => {
  previewExperience.textContent = formatParagraph(experienceInput.value) || "Experience info or job title...";
});

// Helper to apply appropriate scale class
function applyScaleToFit(element) {
  const height = element.scrollHeight;
  const maxHeight = 1123;

  // Clean previous scale classes
  element.classList.remove("scale-small", "scale-smaller", "scale-tiny", "shrink-text");

  if (height > maxHeight * 1.4) {
    element.classList.add("scale-tiny", "shrink-text");
  } else if (height > maxHeight * 1.2) {
    element.classList.add("scale-smaller", "shrink-text");
  } else if (height > maxHeight) {
    element.classList.add("scale-small");
  }
}

// Export to PDF with scaling
async function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const element = document.getElementById("pdfContent");

  // Clean up old classes
  element.classList.remove(
    "scale-small",
    "scale-smaller",
    "scale-tiny",
    "shrink-text",
    "tiny-text"
  );

  // Wait a bit for the reset
  await new Promise(res => setTimeout(res, 100));

  const maxHeight = 1123;
  let attempts = [
    [], // Original
    ["scale-small"],
    ["scale-smaller", "shrink-text"],
    ["scale-tiny", "tiny-text"]
  ];

  for (let classes of attempts) {
    // Reset classes
    element.classList.remove("scale-small", "scale-smaller", "scale-tiny", "shrink-text", "tiny-text");

    // Apply this combination
    classes.forEach(cls => element.classList.add(cls));
    await new Promise(res => setTimeout(res, 100)); // wait for styles to apply

    // Check height
    if (element.scrollHeight <= maxHeight) break;
  }

  // Convert to canvas
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    scrollY: -window.scrollY
  });

  // Generate PDF
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "pt", "a4");
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const imgProps = pdf.getImageProperties(imgData);
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save("resume.pdf");

  // Optional cleanup
  element.classList.remove("scale-small", "scale-smaller", "scale-tiny", "shrink-text", "tiny-text");
}*/


