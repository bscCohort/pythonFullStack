# Who owns what on the internet

Almost nobody explains this part, so people end up thinking "the internet" is one thing you
buy from one company. It is not. **Four different companies do four different jobs**, and you
can change any one of them without touching the others.

---

## The four jobs

<div class="owners">
  <div class="owner">
    <span class="owner-role">1. Registrar</span>
    <b>Namecheap, GoDaddy, Cloudflare</b>
    <span class="owner-what">Rents you the NAME. You never own a domain, you lease it.</span>
    <span class="owner-cost">₹700 to ₹1,200 / year</span>
  </div>
  <div class="owner">
    <span class="owner-role">2. DNS host</span>
    <b>Cloudflare, Route 53</b>
    <span class="owner-what">Answers "where does this name point?" Often the registrar, but need not be.</span>
    <span class="owner-cost">usually free</span>
  </div>
  <div class="owner">
    <span class="owner-role">3. Hosting</span>
    <b>Render, Vercel, AWS</b>
    <span class="owner-what">Runs your actual code on a computer that is always on.</span>
    <span class="owner-cost">free tier, then ₹600+/mo</span>
  </div>
  <div class="owner">
    <span class="owner-role">4. Certificate Authority</span>
    <b>Let's Encrypt</b>
    <span class="owner-what">Vouches that you really control this name, so browsers show the padlock.</span>
    <span class="owner-cost">free</span>
  </div>
</div>

!!! tip "In this project you are already using three of them"
    **Neon** hosts the database, **Render** hosts the API, **Vercel** hosts the frontend.
    You have not bought a domain yet, so `onrender.com` and `vercel.app` are lending you a
    name on *their* domain. That is the only reason you have skipped jobs 1, 2 and 4 so far.

---

## Where the money actually goes

The chain is longer than most people realise:

<div class="chain">
  <div class="chain-node"><b>You</b><i>pay ~₹900/yr</i></div>
  <div class="chain-node"><b>Registrar</b><i>Namecheap</i></div>
  <div class="chain-node"><b>Registry</b><i>Verisign runs .com</i></div>
  <div class="chain-node"><b>ICANN</b><i>~$0.20 fee</i></div>
</div>

- **ICANN** is the non-profit that decides which top-level domains exist at all. `.com`,
  `.in`, `.dev` are theirs to authorise.
- A **registry** operates one TLD. Verisign runs `.com`. NIXI runs `.in`.
- A **registrar** is a licensed reseller. This is who you actually give your card to.
- **You** get a lease, renewable yearly. Stop paying and the name goes back on the market.

That is why a `.com` costs roughly the same everywhere: most of the price is fixed further
up the chain, and the registrar competes on the small margin plus service.

---

## The full flow, from buying to a working site

<ol class="steps">
  <li><strong>Buy the name.</strong> You pay a registrar for <code>mycollegeproject.com</code>. Right now it points nowhere.</li>
  <li><strong>Choose who answers for it.</strong> The registrar records which <em>nameservers</em> are authoritative. By default its own; you can point them at Cloudflare instead.</li>
  <li><strong>Add records.</strong> In that DNS host you say "this name points at this address". See <a href="dns-records.md">DNS records</a> for A versus CNAME.</li>
  <li><strong>Deploy your code.</strong> Render or Vercel runs it and gives you an address.</li>
  <li><strong>Prove you own the name.</strong> The host asks Let's Encrypt for a certificate. Let's Encrypt checks a DNS record or a special URL to confirm you control the domain.</li>
  <li><strong>The padlock appears.</strong> The certificate is installed automatically and <code>https://</code> works.</li>
</ol>

Steps 5 and 6 used to be a paid, manual, annual chore. Let's Encrypt made them free and
automatic in 2016, and it is one of the genuinely important things that happened to the web.

---

## What "authoritative" means

When you look up a name, several machines are involved, and only the last one actually
*knows* the answer. Everyone else is caching or forwarding.

<div class="chain">
  <div class="chain-node"><b>Your laptop</b><i>checks its own cache</i></div>
  <div class="chain-node"><b>Resolver</b><i>your ISP, or 8.8.8.8</i></div>
  <div class="chain-node"><b>Root server</b><i>"ask the .com people"</i></div>
  <div class="chain-node"><b>TLD server</b><i>"ask Cloudflare"</i></div>
  <div class="chain-node"><b>Authoritative</b><i>the real answer</i></div>
</div>

The **authoritative nameserver** is the one holding the records you typed in. Everyone
upstream of it just points closer.

This is why a DNS change is not instant. Each layer caches the answer for a period called
**TTL** (time to live). Set a TTL of one hour and a change can take an hour to be visible
everywhere. It is not broken; it is a cache doing its job.

```bash
# See it for yourself. Ask who is authoritative for a name:
dig +short NS neon.tech

# And what the answer resolves to:
dig +short neon.tech
```

---

## SSL, TLS, HTTPS: three words, one idea

These get used interchangeably and it causes real confusion.

| Word | What it really is |
|---|---|
| **SSL** | The original protocol. **Obsolete and insecure.** Nobody should use it |
| **TLS** | Its replacement. TLS 1.2 and 1.3 are what actually runs today |
| **HTTPS** | HTTP carried inside TLS. The thing you see in the address bar |
| **certificate** | The file proving you control the name. Often called an "SSL certificate" out of habit |

So when a hosting provider says "free SSL", they mean **a TLS certificate, and HTTPS
enabled**. The word SSL survives purely because it is what people searched for in 2005.

See [HTTP vs HTTPS](http-vs-https.md) for what TLS actually does, and
[Certificates and TLS](certificates-and-tls.md) for how the trust chain works.

---

## What you could change tomorrow, independently

The point of splitting the four jobs:

<div class="layers">
  <div class="layer">
    <code>change registrar</code>
    <span>transfer the domain. Site keeps working, DNS records come with you</span>
  </div>
  <div class="layer">
    <code>change DNS host</code>
    <span>repoint nameservers. Records must be recreated at the new host</span>
  </div>
  <div class="layer">
    <code>change hosting</code>
    <span>deploy elsewhere, update one DNS record. Domain untouched</span>
  </div>
  <div class="layer">
    <code>change CA</code>
    <span>you will never do this. It is automatic</span>
  </div>
</div>

This is why "my domain is on GoDaddy but my site is on Vercel" is completely normal, and not
a mistake.

---

## The mistake almost everyone makes once

**Letting the domain expire.** The site stops working and the failure looks like a hosting
problem, because the code is fine and the server is running. Nobody can find it.

Turn on auto-renew. Put the renewal date in a calendar anyway.

---

## Going further

- [DNS records: A, CNAME and the rest](dns-records.md)
- [Certificates and TLS](certificates-and-tls.md)
- [HTTP vs HTTPS](http-vs-https.md)
- [Cloudflare: what is a domain name](https://www.cloudflare.com/en-gb/learning/dns/glossary/what-is-a-domain-name/)
- [Cloudflare: how DNS works](https://www.cloudflare.com/en-gb/learning/dns/what-is-dns/)
- [ICANN: how it all fits together](https://www.icann.org/resources/pages/what-2012-02-25-en)
