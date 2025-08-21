import NavBar from '../components/NavBar';
export default function Tos() {
  return ( 
    <> 
    <NavBar>
        <a href="/" className="hover:text-[#00A6FB]">Home</a>
      </NavBar>
      
    <div className="p-6 max-w-4xl mx-auto bg-[#09090B] text-[#F9F4F4]">
      <h1 className="text-3xl mb-4 font-bold">Terms of Service</h1>
      <p className="mb-6">Effective Date: August 20, 2025</p>

      <p className="mb-6">
        Welcome to <strong>Hipe-Cyber</strong> ("Company," "we," "our," or "us"). These Terms of Service ("Terms") govern your
        access to and use of our cybersecurity learning and career development platform, services, tools, software, and related
        offerings (collectively, the "Services"). By using our Services, you agree to be bound by these Terms.
      </p>

      <h2 className="text-2xl mt-6 mb-2 font-semibold">1. Eligibility</h2>
      <p className="mb-4">
        Our Services are designed primarily for students within the City University of New York (CUNY) system, but are open to all
        learners. By using the Services, you represent and warrant that you are at least 13 years old. If under 18, you must have
        parental or guardian consent.
      </p>

      <h2 className="text-2xl mt-6 mb-2 font-semibold">2. Use of Services</h2>
      <ul className="list-disc list-inside space-y-1 mb-4">
        <li>The Services are meant to help students learn about cybersecurity, explore career paths, and stay informed.</li>
        <li>You agree to use the Services only for educational and career development purposes, in compliance with all applicable laws.</li>
        <li>You may not misuse or attempt to disrupt the platform (e.g., unauthorized access, malware, or tampering).</li>
        <li>You may not post or upload harmful, offensive, or misleading content.</li>
        <li>You may not use the platform to harass or harm others.</li>
      </ul>

      <h2 className="text-2xl mt-6 mb-2 font-semibold">3. Accounts and Profiles</h2>
      <p className="mb-4">
        You may create a user profile with details such as your name, age, CUNY school, major, career interests, skills, resume,
        and goals. You are responsible for maintaining accurate information in your profile. Keep your login credentials safe; you
        are responsible for any activity on your account.
      </p>

      <h2 className="text-2xl mt-6 mb-2 font-semibold">4. Content and Recommendations</h2>
      <p className="mb-2">
        Based on your preferences and profile, the platform may recommend cybersecurity news, resources, or career opportunities.
        Content may include:
      </p>
      <ul className="list-disc list-inside space-y-1 mb-2">
        <li>Current events in cybersecurity (malware, vulnerabilities, compliance updates, tools, industry threats).</li>
        <li>Educational materials tailored to your skill level and interests.</li>
        <li>Career resources such as internships or job postings.</li>
      </ul>
      <p className="mb-4">We do not guarantee the accuracy or completeness of third-party resources.</p>

      <h2 className="text-2xl mt-6 mb-2 font-semibold">5. Community Features (If Available)</h2>
      <p className="mb-4">
        Some parts of the platform may allow you to interact with other students (e.g., forums or discussions). You agree to be
        respectful and professional when engaging with the community. We reserve the right to moderate or remove content that
        violates these Terms.
      </p>

      <h2 className="text-2xl mt-6 mb-2 font-semibold">6. Privacy and Data</h2>
      <p className="mb-4">
        Our Privacy Policy [insert link] explains how we collect, use, and protect your information. By using our Services, you
        consent to the processing of your information as outlined in the Privacy Policy.
      </p>

      <h2 className="text-2xl mt-6 mb-2 font-semibold">7. Intellectual Property</h2>
      <p className="mb-4">
        All content, software, and branding on the platform are owned by Hipe-Cyber or licensed to us. You are granted a limited,
        personal, non-transferable license to use the Services for educational purposes only.
      </p>

      <h2 className="text-2xl mt-6 mb-2 font-semibold">8. Service Availability</h2>
      <p className="mb-4">
        We strive to keep the platform accessible and user-friendly for all students but do not guarantee uninterrupted or
        error-free service. Features may change, be added, or removed as we improve the platform.
      </p>

      <h2 className="text-2xl mt-6 mb-2 font-semibold">9. Disclaimers</h2>
      <p className="mb-4">
        The Services are provided for educational and career development purposes only. We make no guarantees about job placement,
        skill mastery, or future career outcomes. The Services are provided "AS IS" and "AS AVAILABLE."
      </p>

      <h2 className="text-2xl mt-6 mb-2 font-semibold">10. Limitation of Liability</h2>
      <p className="mb-4">
        To the maximum extent permitted by law, we are not liable for indirect, incidental, or consequential damages. Our total
        liability will not exceed any amount you paid for using the Services in the past twelve (12) months (if applicable).
      </p>

      <h2 className="text-2xl mt-6 mb-2 font-semibold">11. Termination</h2>
      <p className="mb-4">
        We may suspend or terminate your account if you violate these Terms. You may also delete your account at any time.
      </p>

      <h2 className="text-2xl mt-6 mb-2 font-semibold">12. Governing Law</h2>
      <p className="mb-4">
        These Terms are governed by the laws of [Insert Jurisdiction], without regard to conflict of law principles.
      </p>

      <h2 className="text-2xl mt-6 mb-2 font-semibold">13. Updates to Terms</h2>
      <p className="mb-4">
        We may update these Terms as the platform evolves. We will notify users of major changes. Continued use of the Services
        after updates means you accept the new Terms.
      </p>

      <h2 className="text-2xl mt-6 mb-2 font-semibold">14. Contact Information</h2>
      <p className="mb-4">
        For questions or support, please contact us at: <strong>hipecyber@gmail.com</strong>
      </p>

      <p className="mt-8 font-semibold">
        By using our Services, you acknowledge that you have read, understood, and agree to these Terms of Service.
      </p>
    </div> 
    
    </>
  );
}