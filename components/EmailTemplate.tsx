import * as React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import Title from "@/components/Title";

interface EmailTemplateProps {
  firstName: string;
  token: string;
  email: string;
}

export default function EmailTemplate({
  firstName,
  token,
  email,
}: EmailTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>Log in with this magic link.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Title />
          <Heading style={heading}>
            🪄 {firstName}! Your verification link
          </Heading>
          <Section style={body}>
            <Text style={paragraph}>
              <Link
                style={link}
                href={`${process.env.PUBLIC_URL}/api/verify?token=${token}&email=${email}`}
              >
                👉 Click here to verify your email 👈
              </Link>
            </Text>
            <Text style={paragraph}>
              If you didn't request this, please ignore this email.
            </Text>
          </Section>
          <Text style={paragraph}>
            Best,
            <br />- LUCribCheck Team
          </Text>
          <Hr style={hr} />
          <p className="font-bold text-xl">
            <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
              LU
            </span>
            CribCheck
          </p>
          <Text style={footer}>LuCribCheck Inc.</Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 25px 48px",
  backgroundImage: 'url("/assets/raycast-bg.png")',
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat, no-repeat",
};

const heading = {
  fontSize: "28px",
  fontWeight: "bold",
  marginTop: "48px",
};

const body = {
  margin: "24px 0",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const link = {
  color: "#FF6363",
};

const hr = {
  borderColor: "#dddddd",
  marginTop: "48px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  marginLeft: "4px",
};
