<script setup lang="ts">
interface Props {
  companyName?: string
  contactEmail?: string
}

withDefaults(defineProps<Props>(), {
  companyName: 'TechSavanna',
  contactEmail: 'legal@techsavanna.co.ke'
})
</script>

<template>
  <div>
    <h2 id="acceptance">Acceptance of Terms</h2>
    <p>
      By accessing or using {{ companyName }}'s services ("Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Services.
    </p>

    <h2 id="description">Description of Services</h2>
    <p>
      {{ companyName }} provides cloud-based software solutions including point-of-sale systems, human resource management, learning management, and enterprise resource planning tools. Our Services are designed to help businesses streamline operations and improve efficiency.
    </p>

    <h2 id="registration">Account Registration</h2>
    <p>To use our Services, you must:</p>
    <ul>
      <li>Provide accurate and complete registration information</li>
      <li>Maintain the security of your account credentials</li>
      <li>Promptly update any changes to your information</li>
      <li>Accept responsibility for all activities under your account</li>
      <li>Be at least 18 years old or have legal authority to enter into contracts</li>
    </ul>

    <h2 id="billing">Subscription and Billing</h2>

    <h3>Fees</h3>
    <p>
      You agree to pay all applicable fees for your subscription plan. Fees are non-refundable except as required by law or as explicitly stated in these Terms.
    </p>

    <h3>Billing Cycle</h3>
    <p>
      Subscriptions are billed in advance on a monthly or annual basis. Your subscription will automatically renew unless cancelled before the renewal date.
    </p>

    <h3>Price Changes</h3>
    <p>
      We may modify our pricing with 30 days' notice. Continued use of Services after price changes constitutes acceptance of new pricing.
    </p>

    <h2 id="acceptable-use">Acceptable Use</h2>
    <p>You agree not to:</p>
    <ul>
      <li>Violate any applicable laws or regulations</li>
      <li>Infringe upon intellectual property rights of others</li>
      <li>Upload malicious code or attempt to compromise system security</li>
      <li>Use the Services for unauthorized commercial purposes</li>
      <li>Interfere with other users' access to the Services</li>
      <li>Attempt to reverse engineer or extract source code</li>
      <li>Use automated systems to access the Services without permission</li>
      <li>Share account credentials with unauthorized parties</li>
    </ul>

    <h2 id="intellectual-property">Intellectual Property</h2>

    <h3>Our Rights</h3>
    <p>
      All content, features, and functionality of our Services are owned by {{ companyName }} and protected by intellectual property laws. You may not copy, modify, or distribute our proprietary materials without written consent.
    </p>

    <h3>Your Content</h3>
    <p>
      You retain ownership of data and content you upload to our Services. By using our Services, you grant us a limited license to process your content as necessary to provide the Services.
    </p>

    <h2 id="data-protection">Data Protection</h2>
    <p>
      We process your data in accordance with our <a href="/privacy-policy">Privacy Policy</a> and applicable data protection laws. We implement appropriate security measures to protect your information.
    </p>

    <h2 id="availability">Service Availability</h2>
    <p>
      We strive to maintain high availability of our Services but do not guarantee uninterrupted access. We may perform scheduled maintenance or updates that temporarily affect availability. We will provide advance notice when possible.
    </p>

    <h2 id="liability">Limitation of Liability</h2>
    <div class="warning-box">
      <p class="!mt-0">
        <strong>Important:</strong> To the maximum extent permitted by law, {{ companyName }} shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities.
      </p>
      <p>
        Our total liability shall not exceed the amount paid by you for the Services in the 12 months preceding the claim.
      </p>
    </div>

    <h2 id="warranty">Disclaimer of Warranties</h2>
    <p>
      Our Services are provided "as is" and "as available" without warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.
    </p>

    <h2 id="indemnification">Indemnification</h2>
    <p>
      You agree to indemnify and hold harmless {{ companyName }} and its affiliates from any claims, damages, or expenses arising from your use of the Services or violation of these Terms.
    </p>

    <h2 id="termination">Termination</h2>
    <p>
      Either party may terminate this agreement at any time. Upon termination, your right to use the Services will cease immediately. You may export your data before termination. We may retain certain data as required by law.
    </p>

    <h2 id="governing-law">Governing Law</h2>
    <p>
      These Terms shall be governed by and construed in accordance with applicable laws. Any disputes shall be resolved through good-faith negotiation or, if necessary, binding arbitration.
    </p>

    <h2 id="changes">Changes to Terms</h2>
    <p>
      We reserve the right to modify these Terms at any time. We will notify you of material changes via email or through the Services. Continued use after changes constitutes acceptance of the modified Terms.
    </p>

    <h2 id="severability">Severability</h2>
    <p>
      If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect.
    </p>

    <h2 id="contact">Contact Information</h2>
    <p>For questions about these Terms, please contact us at:</p>
    <div class="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
      <p class="!mt-0 font-semibold text-gray-900">{{ companyName }}</p>
      <p class="!mt-1">
        Email: <a :href="`mailto:${contactEmail}`">{{ contactEmail }}</a>
      </p>
    </div>
  </div>
</template>
