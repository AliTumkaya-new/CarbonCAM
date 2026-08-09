import React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export default function ReportReadyEmail() {
  return React.createElement(
    Html,
    null,
    React.createElement(Head, null),
    React.createElement(Preview, null, "Excel raporunuz hazır"),
    React.createElement(
      Body,
      { style: styles.body },
      React.createElement(
        Container,
        { style: styles.container },
        React.createElement(Heading, { style: styles.h1 }, "Excel Raporunuz Hazır"),
        React.createElement(Text, { style: styles.p }, "Merhaba ", "${user_name}", ","),
        React.createElement(
          Text,
          { style: styles.p },
          "Toplu hesaplama tamamlandı. Excel raporunuzu aşağıdaki linkten indirebilirsiniz.",
        ),
        React.createElement(
          Section,
          { style: styles.card },
          React.createElement(Text, { style: styles.pStrong }, "Rapor"),
          React.createElement(Text, { style: styles.p }, "Dosya: ", "${report_filename}"),
          React.createElement(
            Text,
            { style: styles.p },
            "İndirme: ",
            React.createElement(Link, { href: "${download_url}", style: styles.link }, "${download_url}"),
          ),
        ),
        React.createElement(Hr, { style: styles.hr }),
        React.createElement(
          Text,
          { style: styles.meta },
          "Şirket: ",
          "${company_name}",
          React.createElement("br", null),
          "İstek ID: ",
          "${batch_id}",
        ),
      ),
    ),
  );
}

const styles = {
  body: {
    backgroundColor: "#f8fafc",
    margin: 0,
    padding: "24px 0",
    fontFamily:
      "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
  },
  container: {
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    padding: "24px",
    maxWidth: "560px",
  },
  h1: {
    margin: "0 0 12px",
    fontSize: "22px",
    lineHeight: "28px",
    color: "#0f172a",
  },
  p: {
    margin: "0 0 12px",
    fontSize: "14px",
    lineHeight: "20px",
    color: "#334155",
  },
  pStrong: {
    margin: "0 0 8px",
    fontSize: "14px",
    lineHeight: "20px",
    color: "#0f172a",
    fontWeight: 700,
  },
  card: {
    marginTop: "16px",
    padding: "14px",
    borderRadius: "10px",
    backgroundColor: "#f1f5f9",
    border: "1px solid #e2e8f0",
  },
  link: {
    color: "#059669",
    textDecoration: "underline",
  },
  hr: {
    borderColor: "#e2e8f0",
    margin: "18px 0",
  },
  meta: {
    margin: 0,
    fontSize: "12px",
    lineHeight: "18px",
    color: "#64748b",
  },
};
