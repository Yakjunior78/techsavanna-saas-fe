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
    <h2 id="what-are-cookies">What Are Cookies?</h2>
    <p>
      Cookies are small text files stored on your device when you visit websites. They help websites remember your preferences, understand how you use the site, and improve your experience. This Cookie Policy explains how {{ companyName }} uses cookies and similar technologies.
    </p>

    <h2 id="types-of-cookies">Types of Cookies We Use</h2>

    <h3>Essential Cookies</h3>
    <p>
      These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility. You cannot opt out of these cookies.
    </p>
    <div class="mt-4 overflow-hidden rounded-xl border border-gray-200">
      <table>
        <thead>
          <tr>
            <th>Cookie</th>
            <th>Purpose</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>session_id</code></td>
            <td>Maintains user session</td>
            <td>Session</td>
          </tr>
          <tr>
            <td><code>csrf_token</code></td>
            <td>Security protection</td>
            <td>Session</td>
          </tr>
          <tr>
            <td><code>cookie-consent</code></td>
            <td>Stores consent preferences</td>
            <td>1 year</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h3>Analytics Cookies</h3>
    <p>
      These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our services.
    </p>
    <div class="mt-4 overflow-hidden rounded-xl border border-gray-200">
      <table>
        <thead>
          <tr>
            <th>Cookie</th>
            <th>Purpose</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>_ga</code></td>
            <td>Google Analytics - distinguishes users</td>
            <td>2 years</td>
          </tr>
          <tr>
            <td><code>_gid</code></td>
            <td>Google Analytics - distinguishes users</td>
            <td>24 hours</td>
          </tr>
          <tr>
            <td><code>_gat</code></td>
            <td>Google Analytics - throttle requests</td>
            <td>1 minute</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h3>Marketing Cookies</h3>
    <p>
      These cookies track visitors across websites to display relevant advertisements. They are used to deliver personalized marketing content based on your interests.
    </p>
    <div class="mt-4 overflow-hidden rounded-xl border border-gray-200">
      <table>
        <thead>
          <tr>
            <th>Cookie</th>
            <th>Purpose</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>_fbp</code></td>
            <td>Facebook pixel tracking</td>
            <td>3 months</td>
          </tr>
          <tr>
            <td><code>_gcl_au</code></td>
            <td>Google Ads conversion tracking</td>
            <td>3 months</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2 id="manage-cookies">How to Manage Cookies</h2>

    <h3>Cookie Consent Banner</h3>
    <p>
      When you first visit our website, you will see a cookie consent banner that allows you to accept all cookies, reject non-essential cookies, or customize your preferences.
    </p>

    <h3>Browser Settings</h3>
    <p>Most web browsers allow you to control cookies through their settings. You can:</p>
    <ul>
      <li>View what cookies are stored on your device</li>
      <li>Delete all or specific cookies</li>
      <li>Block third-party cookies</li>
      <li>Block all cookies from certain websites</li>
      <li>Block all cookies (note: this may affect website functionality)</li>
    </ul>

    <h3>Opt-Out Links</h3>
    <p>You can opt out of specific third-party cookies:</p>
    <ul>
      <li><a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out</a></li>
      <li><a href="https://www.facebook.com/settings/?tab=ads" target="_blank" rel="noopener noreferrer">Facebook Ad Preferences</a></li>
      <li><a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Google Ad Settings</a></li>
    </ul>

    <h2 id="similar-technologies">Similar Technologies</h2>
    <p>In addition to cookies, we may use similar technologies:</p>
    <ul>
      <li><strong>Local Storage:</strong> Stores data locally in your browser with no expiration date</li>
      <li><strong>Session Storage:</strong> Stores data for the duration of your browser session</li>
      <li><strong>Pixels/Web Beacons:</strong> Small images that track page views and email opens</li>
    </ul>

    <h2 id="updates">Updates to This Policy</h2>
    <p>
      We may update this Cookie Policy periodically to reflect changes in our practices or applicable laws. The effective date at the top indicates when this policy was last revised.
    </p>

    <h2 id="contact">Contact Us</h2>
    <p>If you have questions about our use of cookies or this policy, please contact us at:</p>
    <div class="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
      <p class="!mt-0 font-semibold text-gray-900">{{ companyName }}</p>
      <p class="!mt-1">
        Email: <a :href="`mailto:${contactEmail}`">{{ contactEmail }}</a>
      </p>
    </div>
  </div>
</template>
