import * as React from "react";

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
    <div>
      <h1>Welcome, {firstName}!</h1>
      <p>Click the link below to verify your email:</p>
      <a
        href={`${process.env.PUBLIC_URL}/api/verify?token=${token}&email=${email}`}
      >
        Verify Email
      </a>
    </div>
  );
}
