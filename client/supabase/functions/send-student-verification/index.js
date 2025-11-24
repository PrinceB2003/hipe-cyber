// import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

// const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

// serve(async (req) => {
//   try {
//     const { schoolEmail, verificationToken, userName } = await req.json()
    
//     const verificationLink = `${Deno.env.get('https://hipe-cyber.vercel.app/')}/verify-student?token=${verificationToken}`
    
//     const res = await fetch('https://api.resend.com/emails', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${RESEND_API_KEY}`
//       },
//       body: JSON.stringify({
//         from: 'onboarding@resend.dev',
//         to: schoolEmail,
//         subject: 'Verify Your Student Email',
//         html: `
//           <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//             <h2>Hi ${userName}!</h2>
//             <p>Please verify your student email to access student-only features.</p>
//             <a href="${verificationLink}" 
//                style="display: inline-block; padding: 12px 24px; background-color: #00A6FB; 
//                       color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">
//               Verify Student Email
//             </a>
//             <p>Or copy this link: ${verificationLink}</p>
//           </div>
//         `
//       })
//     })

//     const data = await res.json()

//     if (!res.ok) {
//       throw new Error(data.message || 'Failed to send email')
//     }

//     return new Response(
//       JSON.stringify({ success: true, message: 'Verification email sent' }),
//       { headers: { 'Content-Type': 'application/json' } }
//     )
//   } catch (error) {
//     return new Response(
//       JSON.stringify({ success: false, error: error.message }),
//       { status: 500, headers: { 'Content-Type': 'application/json' } }
//     )
//   }
// })