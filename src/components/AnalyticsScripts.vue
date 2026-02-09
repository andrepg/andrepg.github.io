<script>
function setupTagManager(w, d, s, l, i) {
  w[l] = w[l] || []; w[l].push({
    'gtm.start':
      new Date().getTime(), event: 'gtm.js'
  }); const f = d.getElementsByTagName(s)[0],
    j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
      'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
}

function setupMSClarity(c, l, a, r, i, t, y) {
  c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(...arguments) };
  t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
  y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
}

if (import.meta.env.VITE_ENV == 'production') {
  console.log("Enabling tracking scripts")
  setupTagManager(window, document, 'script', 'dataLayer', 'GTM-M3XF5L6')
  setupMSClarity(window, document, 'clarity', 'script', 'mm8qkhz9hd')
} else {
  console.log("Tracking scripts disabled.")
}
</script>