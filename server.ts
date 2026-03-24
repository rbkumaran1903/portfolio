import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Dummy resume data - this is the "way in backend" to add the resume later
  const resumeData = {
    name: "Balakumaran",
    title: "Senior Business Analyst & Strategic PMO",
    summary: "Over 15 years of experience in business analysis, process optimization, and strategic PMO leadership. Expert in General Insurance and Financial Services domains with a track record of delivering 25+ high-impact projects.",
    experience: [
      {
        company: "General Insurance & Strategic PMO",
        role: "Senior Business Analyst / PMO",
        period: "2021 – Present",
        highlights: [
          "Leading strategic business analysis and PMO governance for enterprise-scale General Insurance transformations.",
          "Expertly managing Agile/Scrum ceremonies, including sprint planning, daily stand-ups, and retrospectives.",
          "Establishing robust PMO frameworks for risk management (RAID logs) and resource allocation.",
          "Building rapid Proof of Concepts (POCs) to support PreSales teams in high-value client acquisitions.",
          "Bridging the gap between executive stakeholders and cross-functional development teams."
        ]
      },
      {
        company: "Financial Services Firm",
        role: "Business Analyst (Agile Focus)",
        period: "2016 – 2021",
        highlights: [
          "Drove end-to-end project lifecycles using Agile methodologies for complex Insurance and US Payments - ACH / ICL systems.",
          "Authored comprehensive BRDs, FRDs, and User Stories to ensure alignment with business objectives.",
          "Facilitated UAT strategies and stakeholder sign-offs for high-impact platform migrations.",
          "Optimized delivery workflows, resulting in a 20% reduction in project turnaround time."
        ]
      },
      {
        company: "Escribe Outsourcing Pvt Ltd",
        role: "Operations / Functional Support",
        period: "2008 – 2016",
        highlights: [
          "Developed foundational expertise in process optimization.",
          "Provided functional business support for various operations.",
          "Contributed to the improvement of operational workflows."
        ]
      }
    ],
    skills: [
      "Business Analysis",
      "Strategic PMO",
      "Process Optimization",
      "Trained Scrum Master",
      "PreSales POC Development",
      "Agile/Scrum",
      "Stakeholder Management",
      "Insurance Domain",
      "US Payments - ACH / ICL"
    ]
  };

  // API route for resume data
  app.get("/api/resume", (req, res) => {
    res.json(resumeData);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
