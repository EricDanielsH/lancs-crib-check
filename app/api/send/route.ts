import EmailTemplate from "../../../components/EmailTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
resend.domains.create({ name: `${process.env.RESEND_API_KEY}` });

export async function POST(req: Request) {
  let testEmail = "e.danielshuaman@lancaster.ac.uk";

  try {
    const { email, name, token } = await req.json(); // Extract the body from the request

    if (!email || !name || !token) {
      return new Response(
        JSON.stringify({ message: "Missing required fields." }),
        { status: 400 },
      );
    }

    const { data, error } = await resend.emails.send({
      from: "LUCribCheck <noreply@lucribcheck.com>",
      to: email || testEmail,
      subject: "Verify your email on LUCribCheck! 🎉 🎉 🎉",
      react: EmailTemplate({ firstName: name, token, email }),
    });

    if (error) {
      return new Response(JSON.stringify({ message: error }), { status: 500 });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ message: (err as Error).message }), {
      status: 500,
    });
  }
}
