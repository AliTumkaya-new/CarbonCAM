import { render } from "@react-email/render";
import fs from "node:fs";
import path from "node:path";
import React from "react";

import QuotaAlertEmail from "./templates/quota-alert.mjs";
import ReportReadyEmail from "./templates/report-ready.mjs";
import WelcomeEmail from "./templates/welcome.mjs";

const outDir = path.resolve(process.cwd(), "..", "carboncam_engine", "email_templates");
fs.mkdirSync(outDir, { recursive: true });

const templates = [
  { name: "welcome", component: React.createElement(WelcomeEmail) },
  { name: "report_ready", component: React.createElement(ReportReadyEmail) },
  { name: "quota_alert", component: React.createElement(QuotaAlertEmail) },
];

for (const t of templates) {
  const html = render(t.component, { pretty: true });
  fs.writeFileSync(path.join(outDir, `${t.name}.html`), html, "utf8");
  console.log(`Wrote ${t.name}.html`);
}
