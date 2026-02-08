<script setup lang="ts">
interface Props {
  companyName?: string
  contactEmail?: string
}

withDefaults(defineProps<Props>(), {
  companyName: 'TechSavanna',
  contactEmail: 'privacy@techsavanna.co.ke'
})
</script>

<template>
  <div>
    <h2 id="introduction">Introduction</h2>
    <p>
      {{ companyName }} ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.
    </p>

    <h2 id="information-we-collect">Information We Collect</h2>

    <h3>Personal Information</h3>
    <p>We may collect personal information that you voluntarily provide, including:</p>
    <ul>
      <li>Name and contact information (email address, phone number)</li>
      <li>Account credentials (username, password)</li>
      <li>Business information (company name, business type, address)</li>
      <li>Payment information (processed securely through third-party providers)</li>
      <li>Profile information and preferences</li>
    </ul>

    <h3>Automatically Collected Information</h3>
    <p>When you access our services, we automatically collect:</p>
    <ul>
      <li>Device information (type, operating system, browser)</li>
      <li>IP address and location data</li>
      <li>Usage data (pages visited, features used, time spent)</li>
      <li>Cookies and similar tracking technologies</li>
    </ul>

    <h2 id="how-we-use-information">How We Use Your Information</h2>
    <p>We use the collected information to:</p>
    <ul>
      <li>Provide, maintain, and improve our services</li>
      <li>Process transactions and send related information</li>
      <li>Send administrative information and updates</li>
      <li>Respond to inquiries and provide customer support</li>
      <li>Personalize your experience</li>
      <li>Analyze usage patterns to improve our services</li>
      <li>Protect against fraudulent or illegal activity</li>
      <li>Comply with legal obligations</li>
    </ul>

    <h2 id="legal-basis">Legal Basis for Processing (GDPR)</h2>
    <p>If you are in the European Economic Area (EEA), we process your data based on:</p>
    <ul>
      <li><strong>Consent:</strong> When you have given explicit consent</li>
      <li><strong>Contract:</strong> When processing is necessary for our agreement</li>
      <li><strong>Legal Obligation:</strong> When required by law</li>
      <li><strong>Legitimate Interests:</strong> For business purposes that don't override your rights</li>
    </ul>

    <h2 id="data-sharing">Data Sharing and Disclosure</h2>
    <p>We may share your information with:</p>
    <ul>
      <li><strong>Service Providers:</strong> Third parties that help us operate our services</li>
      <li><strong>Business Partners:</strong> With your consent, for joint offerings</li>
      <li><strong>Legal Requirements:</strong> When required by law or to protect rights</li>
      <li><strong>Business Transfers:</strong> In connection with mergers or acquisitions</li>
    </ul>

    <div class="info-box">
      <p class="!mt-0"><strong>Important:</strong> We do not sell your personal information to third parties.</p>
    </div>

    <h2 id="data-retention">Data Retention</h2>
    <p>
      We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law. When data is no longer needed, we securely delete or anonymize it.
    </p>

    <h2 id="your-rights">Your Rights</h2>
    <p>Depending on your location, you may have the right to:</p>
    <ul>
      <li><strong>Access:</strong> Request a copy of your personal data</li>
      <li><strong>Rectification:</strong> Correct inaccurate or incomplete data</li>
      <li><strong>Erasure:</strong> Request deletion of your data ("right to be forgotten")</li>
      <li><strong>Portability:</strong> Receive your data in a portable format</li>
      <li><strong>Restriction:</strong> Limit how we process your data</li>
      <li><strong>Objection:</strong> Object to certain processing activities</li>
      <li><strong>Withdraw Consent:</strong> Withdraw previously given consent</li>
    </ul>
    <p>To exercise these rights, contact us at <a :href="`mailto:${contactEmail}`">{{ contactEmail }}</a>.</p>

    <h2 id="data-security">Data Security</h2>
    <p>
      We implement appropriate technical and organizational measures to protect your personal information, including encryption, access controls, and regular security assessments. However, no method of transmission over the Internet is 100% secure.
    </p>

    <h2 id="international-transfers">International Transfers</h2>
    <p>
      Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place, such as Standard Contractual Clauses, to protect your data during international transfers.
    </p>

    <h2 id="childrens-privacy">Children's Privacy</h2>
    <p>
      Our services are not intended for children under 16. We do not knowingly collect personal information from children. If you believe we have collected such information, please contact us immediately.
    </p>

    <h2 id="policy-changes">Changes to This Policy</h2>
    <p>
      We may update this Privacy Policy periodically. We will notify you of significant changes by posting the new policy on our website and updating the effective date. Your continued use of our services constitutes acceptance of the updated policy.
    </p>

    <h2 id="contact-us">Contact Us</h2>
    <p>For questions about this Privacy Policy or to exercise your rights, contact us at:</p>
    <div class="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
      <p class="!mt-0 font-semibold text-gray-900">{{ companyName }}</p>
      <p class="!mt-1">
        Email: <a :href="`mailto:${contactEmail}`">{{ contactEmail }}</a>
      </p>
    </div>
  </div>
</template>
