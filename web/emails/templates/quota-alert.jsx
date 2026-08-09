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

export default function QuotaAlertEmail() {
  return (
    <Html>
      <Head />
      <Preview>Krediniz bitmek üzere</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading style={styles.h1}>Krediniz Bitmek Üzere</Heading>
          <Text style={styles.p}>Merhaba {"${user_name}"},</Text>
          <Text style={styles.p}>
            Bu ay için kalan hesaplama krediniz düşük seviyeye indi.
          </Text>

          <Section style={styles.card}>
            <Text style={styles.pStrong}>Kalan kredi</Text>
            <Text style={styles.p}>
              {"${credits_left}"} / {"${monthly_limit}"}
            </Text>
            <Text style={styles.p}>
              Plan yükseltmek için: <Link href={"${upgrade_url}"} style={styles.link}>{"${upgrade_url}"}</Link>
            </Text>
          </Section>

          <Hr style={styles.hr} />
          <Text style={styles.meta}>Şirket: {"${company_name}"}</Text>
        </Container>
      </Body>
    </Html>
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
