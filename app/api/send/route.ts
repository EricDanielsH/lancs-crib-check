import EmailTemplate from "../../../components/EmailTemplate";
import { Resend } from "resend";

// Initialize Resend with the API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Ensure this function is exported as POST in your API routes
export async function POST(req: Request) {
  const testEmail = "e.danielshuaman@lancaster.ac.uk";

  try {
    // Extract data from request body
    const { email, name, token } = await req.json();

    // Validate required fields
    if (!email || !name || !token) {
      return new Response(
        JSON.stringify({ message: "Missing required fields." }),
        { status: 400 },
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "LUCribCheck <noreply@lucribcheck.com>",
      to: email || testEmail, // Use test email if none provided
      subject: "Verify your email on LUCribCheck! 🎉 🎉 🎉",
      react: EmailTemplate({ firstName: name, token, email }), // Pass template data
    });

    // Handle error from Resend
    if (error) {
      return new Response(
        JSON.stringify({ message: error.message || "An error occurred." }),
        { status: 500 },
      );
    }

    // Return success response
    return new Response(
      JSON.stringify({ message: "Email sent successfully.", data }),
      { status: 200 },
    );
  } catch (err) {
    // Handle unexpected errors
    return new Response(JSON.stringify({ message: (err as Error).message }), {
      status: 500,
    });
  }
}
