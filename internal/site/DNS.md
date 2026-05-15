# cicerogoals.dev DNS

GitHub Pages is configured for:

- Repository: `amacdonald-cgs/cicero-goals`
- Pages build type: GitHub Actions workflow
- Custom domain: `cicerogoals.dev`
- Published artifact path: `internal/site`

Cloudflare is authoritative for `cicerogoals.dev`:

```text
serena.ns.cloudflare.com
will.ns.cloudflare.com
```

Required Cloudflare DNS records for the apex domain:

```text
Type  Name  Content
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
AAAA  @     2606:50c0:8000::153
AAAA  @     2606:50c0:8001::153
AAAA  @     2606:50c0:8002::153
AAAA  @     2606:50c0:8003::153
```

Recommended `www` redirect support:

```text
Type   Name  Content
CNAME  www   amacdonald-cgs.github.io
```

After DNS resolves, re-check:

```bash
dig cicerogoals.dev +noall +answer -t A
dig cicerogoals.dev +noall +answer -t AAAA
dig www.cicerogoals.dev +nostats +nocomments +nocmd
curl -I https://cicerogoals.dev/
```

Then enforce HTTPS in GitHub Pages once the certificate is issued.
