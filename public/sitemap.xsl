<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sm="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  exclude-result-prefixes="sm xhtml">
  <xsl:output method="html" encoding="UTF-8" indent="yes" doctype-system="about:legacy-compat"/>

  <xsl:template match="/sm:urlset">
    <html lang="es">
      <head>
        <meta charset="UTF-8"/>
        <title>Sitemap — Ecommetrica</title>
        <meta name="robots" content="noindex"/>
        <style>
          :root {
            --orange: #e84a34;
            --red: #9c1512;
            --dark: #25272a;
            --black: #121213;
            --cream: #f2ede9;
            --gray: #585a5c;
          }
          * { box-sizing: border-box; }
          body {
            margin: 0;
            font-family: -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background: var(--black);
            color: var(--cream);
          }
          header {
            padding: 48px 24px 32px;
            text-align: center;
            background: linear-gradient(180deg, var(--dark) 0%, var(--black) 100%);
            border-bottom: 1px solid rgba(242, 237, 233, 0.1);
          }
          header img {
            height: 32px;
            margin-bottom: 20px;
          }
          h1 {
            margin: 0 0 8px;
            font-size: 28px;
            font-weight: 600;
            letter-spacing: -0.01em;
          }
          header p {
            margin: 0;
            color: rgba(242, 237, 233, 0.6);
            font-size: 14px;
          }
          .count {
            color: var(--orange);
            font-weight: 600;
          }
          main {
            max-width: 960px;
            margin: 0 auto;
            padding: 32px 24px 64px;
          }
          .search {
            width: 100%;
            padding: 12px 16px;
            margin-bottom: 20px;
            border-radius: 10px;
            border: 1px solid rgba(242, 237, 233, 0.15);
            background: var(--dark);
            color: var(--cream);
            font-size: 14px;
          }
          .search::placeholder { color: rgba(242, 237, 233, 0.4); }
          table {
            width: 100%;
            border-collapse: collapse;
            border-radius: 12px;
            overflow: hidden;
          }
          thead th {
            text-align: left;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            color: rgba(242, 237, 233, 0.5);
            padding: 12px 16px;
            border-bottom: 1px solid rgba(242, 237, 233, 0.1);
          }
          tbody tr {
            border-bottom: 1px solid rgba(242, 237, 233, 0.06);
            transition: background-color 0.15s ease;
          }
          tbody tr:hover { background: rgba(232, 74, 52, 0.08); }
          td {
            padding: 14px 16px;
            font-size: 14px;
            vertical-align: middle;
          }
          td.loc a {
            color: var(--cream);
            text-decoration: none;
            word-break: break-all;
          }
          td.loc a:hover { color: var(--orange); }
          .lang {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 28px;
            padding: 2px 8px;
            border-radius: 999px;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            background: rgba(232, 74, 52, 0.15);
            color: var(--orange);
          }
          .lastmod {
            color: rgba(242, 237, 233, 0.55);
            white-space: nowrap;
          }
          .alts a {
            color: rgba(242, 237, 233, 0.45);
            font-size: 12px;
            text-decoration: none;
            margin-right: 10px;
          }
          .alts a:hover { color: var(--orange); }
          footer {
            text-align: center;
            padding: 24px;
            color: rgba(242, 237, 233, 0.35);
            font-size: 12px;
          }
          footer a { color: rgba(242, 237, 233, 0.5); }
        </style>
      </head>
      <body>
        <header>
          <img src="/images/logo-secundario.png" alt="Ecommetrica"/>
          <h1>Sitemap</h1>
          <p>
            <span class="count"><xsl:value-of select="count(sm:url)"/></span> URLs indexadas — generado automáticamente en cada build
          </p>
        </header>
        <main>
          <input type="text" class="search" placeholder="Filtrar URLs..." onkeyup="
            var q = this.value.toLowerCase();
            var rows = document.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
            for (var i = 0; i &lt; rows.length; i++) {{
              var text = rows[i].textContent.toLowerCase();
              rows[i].style.display = text.indexOf(q) !== -1 ? '' : 'none';
            }}
          "/>
          <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Idioma</th>
                <th>Alternates</th>
                <th>Última actualización</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sm:url">
                <tr>
                  <td class="loc">
                    <a href="{sm:loc}" target="_blank" rel="noopener">
                      <xsl:value-of select="sm:loc"/>
                    </a>
                  </td>
                  <td>
                    <span class="lang">
                      <xsl:choose>
                        <xsl:when test="contains(sm:loc, '/en')">EN</xsl:when>
                        <xsl:otherwise>ES</xsl:otherwise>
                      </xsl:choose>
                    </span>
                  </td>
                  <td class="alts">
                    <xsl:for-each select="xhtml:link[@rel='alternate' and @hreflang != 'x-default']">
                      <a href="{@href}">
                        <xsl:value-of select="@hreflang"/>
                      </a>
                    </xsl:for-each>
                  </td>
                  <td class="lastmod">
                    <xsl:choose>
                      <xsl:when test="sm:lastmod">
                        <xsl:value-of select="sm:lastmod"/>
                      </xsl:when>
                      <xsl:otherwise>—</xsl:otherwise>
                    </xsl:choose>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </main>
        <footer>
          Generado por <a href="https://ecommetrica.com">Ecommetrica</a> — sitemaps.org protocol
        </footer>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
