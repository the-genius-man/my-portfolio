(function () {
  'use strict';

  /* ---------- Content ---------- */

  var projects = [
    { period: 'Sep 2026 to now', title: 'AI-checked network labs', body: 'An automated validation workflow for Cisco Packet Tracer. An LLM-driven toolchain writes the device configurations, applies them and checks the result.', points: ['Generates, applies and verifies router and switch configurations without manual checking.', 'Covers routing, VLAN, NAT and ACL configurations, the same topics I teach.', 'Replaces the slow, manual marking of student lab work.'], tools: 'LLMs, Cisco Packet Tracer, Python' },
    { period: 'Nov to Dec 2024', title: 'A working SOC, built from scratch', body: 'A complete Security Operations Center, built in VirtualBox for the Network Security course at CMU Africa.', points: ['pfSense firewall with Snort IDS/IPS in front of four machines running Kali Linux, Windows and Ubuntu Server.', 'Joined Windows Server 2016 and Active Directory to an ELK Stack and monitored the machines for a month.', 'Designed a multi-VLAN network with secure remote access over OpenVPN.', 'Launched attacks from Kali Linux, then detected and stopped them.'], tools: 'VirtualBox, pfSense, Snort, OpenVPN, Windows Server, Active Directory, ELK Stack' },
    { period: 'Feb to May 2025', title: 'Attack, detect, remediate', body: 'Led a red team and blue team assessment of a critical web application for the Cybersecurity Operations course.', points: ['Ran vulnerability scans and exploited authentication flaws with Burp Suite, OWASP ZAP and Metasploit.', 'Wrote a remediation plan that ranked more than 30 high-risk vulnerabilities, cutting overall risk by 40% and moving the app toward ISO 27001.', 'Set up SIEM log analysis in the ELK Stack to correlate events and spot attack patterns, cutting incident response time by 35%.'], tools: 'ELK Stack, Wazuh, MISP, Burp Suite, OWASP ZAP, Metasploit, Wireshark' },
    { period: 'Jul to Aug 2025', title: 'ShieldKids', body: 'A child safety Android app, built during my cybersecurity internship at Shield Tech Hub in Kigali.', points: ['Delivered the MVP in a six-week Agile cycle: one app for parents, one for children.', 'Set up Firestore sync and fine-grained permissions for full screen-time tracking, keeping family data protected.', 'Ran daily code reviews and API integration tests, and kept the project confidential.'], tools: 'Android, Firebase, Firestore' },
    { period: 'Since 2021', title: 'Usomi', body: 'A school management platform (SaaS) for secondary schools, built by Techy Ahead, the technology arm of Go Ahead RDC.', points: ['Modules for school finances, student transport, grades and administrative reporting.', 'In use by secondary schools in the DRC.', 'Techy Ahead also builds websites for companies and gives IT support to private firms.'], tools: 'SaaS, EdTech' },
    { period: 'Oct 2021 to Sep 2024', title: 'IT systems for a logistics firm', body: 'Sole IT consultant for Ets Belle Vie in Goma, a company running heavy vehicles and a water distribution service.', points: ['Set up a fleet management system for more than 70 heavy vehicles: flatbeds, tractors and semi-trucks.', 'Built a backup and disaster recovery routine on Google Drive that protects ten years of financial and logistics records.', 'Built the company website in WordPress and PHP. Its monthly posts brought in four new clients in 2023 and helped launch the water service.', 'Supported more than 20 staff on QuickBooks, SAGE, Microsoft Office and Google Workspace.'], tools: 'WordPress, PHP, Google Workspace, QuickBooks, SAGE' },
    { period: 'Oct 2018 to Jul 2022', title: 'Ujuzi learning platform', body: 'The secure website and e-learning platform behind Ujuzi, the programming course I ran at CRES in Goma.', points: ['Deployed Moodle for more than 100 users.', 'Built custom workflows that automate student registration and track progress.', 'Set up user management that keeps learner data protected as the platform grows.'], tools: 'Moodle, web hosting' },
    { period: 'Jun to Aug 2026', title: 'A book on modern networking', body: 'Contributing author on a book on modern networking, as a Research Assistant at CMU Africa.', points: ['Wrote the chapter on network security.', 'Drafted the hands-on labs.', 'Produced the diagrams and figures, and formatted the manuscript.'], tools: 'Carnegie Mellon University Africa' }
  ];

  var ventures = [
    { init: 'GA', name: 'Go Ahead RDC', when: 'Since 2021', short: 'A group in Goma working in security, technology, agribusiness and transport.', intro: 'Co-Managing Director of a multisectoral firm with units in private security, technology, and agribusiness and transport.', points: ['Runs the guard staffing operation: recruiting and vetting guards, posting them to clients on rotating shifts and covering absences.', 'Built an in-house guard training programme. Competitors then hired trained guards away, which changed how the firm trains, deploys and keeps staff.', 'Owns vendor relationships, buying and planning across the units.'] },
    { init: 'TA', name: 'Techy Ahead', when: 'Since 2021', short: 'The technology arm of Go Ahead. Maker of the Usomi school platform.', intro: 'The technology company inside Go Ahead RDC, bringing software and IT services to local schools and firms.', points: ['Built and launched Usomi, a school management platform for secondary schools: finances, student transport, grades and reports.', 'Builds websites for local companies.', 'Gives ongoing IT support and consulting to private firms.'] },
    { init: 'ZP', name: 'Zero Panne', when: 'Since 2022', short: 'A mobile garage service that brings vehicle repair to the customer.', intro: 'Co-founder of a mobile vehicle maintenance company in Goma.', points: ['Tested the market informally for 18 months, then registered the company as a SARL under OHADA law.', 'Co-wrote the business plan: market study, Business Model Canvas, competitive position and three-year projections.', 'Secured $21,000 in COPA funding plus $2,000 of personal capital to buy a mobile workshop vehicle.'] },
    { init: 'CR', name: 'CRES', when: '2018 to 2022', short: 'A research centre turned technology transfer centre. Home of Ujuzi.', intro: 'Co-founder and programme manager of the Centre de Recherche et d’Expertise Scientifique, a research centre that became a technology transfer centre.', points: ['Designed and ran Ujuzi, a programming course: recruited 140 students and guided 30 to completion.', 'Managed an $8,000 budget over two years and oversaw the curriculum and instructors.', 'Deployed a Moodle learning platform for more than 100 users.', 'CRES gave rise to Zero Panne and to i-kiota, a startup accelerator.'] }
  ];

  var jobs = [
    { year: '2026', when: 'Sep 2026 to now', role: 'Independent technology consultant', org: 'Kigali, Rwanda', points: ['Design and deliver mobile apps for clients, from requirements to release.', 'Built the AI-checked Packet Tracer lab workflow.'] },
    { year: '2026', when: 'Jun to Aug 2026', role: 'Research Assistant', org: 'Carnegie Mellon University Africa', points: ['Contributing author on a book on modern networking: security chapter, labs, diagrams and manuscript layout.'] },
    { year: '2026', when: 'Feb to Mar 2026', role: 'Teaching Assistant, Advanced Networks', org: 'Adventist University of Central Africa', points: ['Taught 52 students IP addressing, routing and switching, VLANs, NAT, static and dynamic routing, and ACLs.', 'Ran hands-on Cisco Packet Tracer labs, and set and marked router and switch exercises.'] },
    { year: '2026', when: 'Jan to May 2026', role: 'Teaching Assistant, Information Systems Audit', org: 'Carnegie Mellon University Africa', points: ['Taught audit frameworks to more than 10 students, focused on finding weaknesses and testing controls.', 'Wrote five audit simulations based on real compliance problems.'] },
    { year: '2025', when: 'Aug to Dec 2025', role: 'Teaching Assistant, Cloud Computing', org: 'Carnegie Mellon University Africa', points: ['Gave second-level support for AWS and Azure lab environments, with 99% uptime for more than 30 students.', 'Solved over 100 student questions on cloud deployment and security, and held weekly office hours.', 'Prepared recitations, assignments and solutions, and graded homework.'] },
    { year: '2025', when: 'Jul to Aug 2025', role: 'Cybersecurity Intern', org: 'Shield Tech Hub, Kigali', points: ['Built the ShieldKids parent and child Android apps on Firebase in six weeks.'] },
    { year: '2025', when: 'Jul to Aug 2025', role: 'Student Worker, Student Induction Program', org: 'Carnegie Mellon University Africa', points: ['Worked under the Mastercard Foundation programme coordinator during summer induction.', 'Redesigned the Graduate Handbook for more than 200 international students, adding local prices and weather.', 'Prepared English Enhancement Program assignments for 25 students and ran their research poster show, which drew over 50 visitors.'] },
    { year: '2024', when: '2024 to 2026', role: 'Student leadership', org: 'Carnegie Mellon University Africa', points: ['Served on the advisory committee to the Mastercard Foundation Scholars Representative.', 'Led several student clubs.'] },
    { year: '2021', when: 'Oct 2021 to Sep 2024', role: 'IT Technician Consultant', org: 'Ets Belle Vie, Goma, DRC', points: ['Ran IT for more than 20 staff: computers, network, accounts and business software.', 'Fleet system for 70+ heavy vehicles, ten-year backup and recovery, and the company website.'] },
    { year: '2021', when: 'Mar to Jul 2021', role: 'Network Technician Intern', org: 'Kenya Power and Lighting Company', points: ['Installed and maintained Cisco routers, switches and IP phones across four floors.', 'Spliced fibre optic cable and supported radio repeater sites.', 'Supported more than 50 staff in five departments.'] },
    { year: '2019', when: 'Jan 2019 to Aug 2021', role: 'Graphic Designer, Yearbook Office', org: 'University of Eastern Africa Baraton, Kenya', points: ['Designed two 200-page yearbooks in Adobe InDesign and negotiated the printing contract, for over 1,500 students.', 'Photographed weekly events and ran the office social media.'] }
  ];

  /* ---------- Helpers ---------- */

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function bulletList(points) {
    var ul = el('ul', 'bullets');
    points.forEach(function (p) { ul.appendChild(el('li', null, p)); });
    return ul;
  }

  var main = document.getElementById('main');

  /* ---------- Tabs and page transitions ---------- */

  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tab'));
  var pages = Array.prototype.slice.call(document.querySelectorAll('.page'));

  function showPage(name) {
    tabs.forEach(function (t) {
      if (t.dataset.tab === name) t.setAttribute('aria-current', 'page');
      else t.removeAttribute('aria-current');
    });
    pages.forEach(function (p) {
      var on = p.dataset.page === name;
      p.hidden = !on;
      p.classList.remove('is-active');
      if (on) { void p.offsetWidth; p.classList.add('is-active'); }
    });
    main.scrollTop = 0;
    if (name === 'experience') { tlScroll.scrollTop = 0; setYear(groups[0]); }
    if (history.replaceState) history.replaceState(null, '', '#' + name);
  }

  tabs.forEach(function (t) {
    t.addEventListener('click', function () { showPage(t.dataset.tab); });
  });

  /* ---------- Stars travelling across the sky ---------- */

  var sky = document.querySelector('.sky');
  var starPath = 'M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z';
  var seed = 7;
  function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
  for (var i = 0; i < 28; i++) {
    var dur = 45 + Math.round(rnd() * 55);
    var size = 4 + Math.round(rnd() * 10);
    var color = i % 6 === 0 ? '#F5B497' : (i % 2 ? '#b3b3b3' : '#d0d0d0');
    var star = el('div', 'star');
    star.style.top = (rnd() * 95 - 15).toFixed(1) + '%';
    star.style.animationDuration = dur + 's';
    star.style.animationDelay = (-rnd() * dur).toFixed(1) + 's';
    star.innerHTML = '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24"><path d="' + starPath + '" fill="' + color + '"/></svg>';
    var svg = star.firstChild;
    svg.style.animationDuration = (2.5 + rnd() * 3).toFixed(1) + 's';
    svg.style.animationDelay = (rnd() * 4).toFixed(1) + 's';
    sky.appendChild(star);
  }
  [{ x: 70, y: 5, dur: 11, delay: 2 }, { x: 95, y: 30, dur: 14, delay: 7 }, { x: 55, y: 18, dur: 17, delay: 12 }].forEach(function (m) {
    var meteor = el('div', 'meteor');
    meteor.style.left = m.x + '%';
    meteor.style.top = m.y + '%';
    meteor.style.animationDuration = m.dur + 's';
    meteor.style.animationDelay = m.delay + 's';
    sky.appendChild(meteor);
  });

  /* ---------- Work: stacked cards ---------- */

  var deck = document.getElementById('deck');
  var detail = document.getElementById('work-detail');
  var shades = ['#000000', '#2b2b2b', '#4a4a4a', '#666666'];
  var current = 0;
  var sending = false;

  var cards = projects.map(function (p) {
    var card = el('button', 'card');
    card.type = 'button';
    card.appendChild(el('span', 'card-period', p.period));
    card.appendChild(el('span', 'card-title', p.title));
    card.appendChild(el('span', 'card-hint', 'Tap the card for the next project'));
    card.addEventListener('click', function () { if (card.classList.contains('is-front')) next(); });
    deck.appendChild(card);
    return card;
  });

  function layoutDeck() {
    var n = cards.length;
    cards.forEach(function (card, i) {
      var d = (i - current + n) % n;
      var depth = Math.min(d, 3);
      card.style.transform = 'translateY(' + depth * 16 + 'px) scale(' + (1 - depth * 0.05) + ')';
      card.style.opacity = d < 4 ? '1' : '0';
      card.style.zIndex = String(20 - d);
      card.style.background = shades[depth];
      card.classList.toggle('is-front', d === 0);
      card.querySelector('.card-hint').hidden = d !== 0;
      card.tabIndex = d === 0 ? 0 : -1;
      card.setAttribute('aria-hidden', d === 0 ? 'false' : 'true');
      card.setAttribute('aria-label', projects[i].title + '. Show the next project');
    });
    renderDetail();
  }

  function renderDetail() {
    var p = projects[current];
    detail.innerHTML = '';
    detail.appendChild(el('h2', null, p.title));
    detail.appendChild(el('p', 'intro', p.body));
    detail.appendChild(bulletList(p.points));
    detail.appendChild(el('p', 'tools', 'Tools: ' + p.tools));
    detail.classList.remove('swap');
    void detail.offsetWidth;
    detail.classList.add('swap');
  }

  function next() {
    if (sending) return;
    var front = cards[current];
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { current = (current + 1) % cards.length; layoutDeck(); return; }
    sending = true;
    front.classList.add('is-sending');
    setTimeout(function () {
      front.classList.remove('is-sending');
      current = (current + 1) % cards.length;
      sending = false;
      layoutDeck();
    }, 450);
  }

  function prev() {
    if (sending) return;
    current = (current - 1 + cards.length) % cards.length;
    layoutDeck();
  }

  document.getElementById('next').addEventListener('click', next);
  document.getElementById('prev').addEventListener('click', prev);
  layoutDeck();

  /* ---------- Ventures: cards and popup ---------- */

  var grid = document.getElementById('venture-grid');
  var overlay = document.getElementById('overlay');
  var dialog = overlay.querySelector('.dialog');
  var openIndex = null;
  var lastFocus = null;

  ventures.forEach(function (v, i) {
    var card = el('button', 'venture');
    card.type = 'button';
    card.setAttribute('aria-label', v.name + '. ' + v.short + ' Open details.');
    var head = el('span', 'v-head');
    var badge = el('span', 'badge', v.init);
    badge.setAttribute('aria-hidden', 'true');
    var names = el('span');
    names.appendChild(el('span', 'kicker', v.when));
    names.appendChild(el('span', 'v-name', v.name));
    head.appendChild(badge);
    head.appendChild(names);
    card.appendChild(head);
    card.appendChild(el('span', 'v-short', v.short));
    card.appendChild(el('span', 'v-more', 'Read more'));
    card.addEventListener('click', function () { openVenture(i); });
    grid.appendChild(card);
  });

  function fillDialog(i) {
    var v = ventures[i];
    var nextV = ventures[(i + 1) % ventures.length];
    document.getElementById('dlg-init').textContent = v.init;
    document.getElementById('dlg-when').textContent = v.when;
    document.getElementById('dlg-name').textContent = v.name;
    document.getElementById('dlg-intro').textContent = v.intro;
    var list = document.getElementById('dlg-points');
    list.innerHTML = '';
    v.points.forEach(function (p) { list.appendChild(el('li', null, p)); });
    var nextBtn = document.getElementById('dlg-next');
    nextBtn.innerHTML = '';
    nextBtn.appendChild(document.createTextNode('Next: ' + nextV.name + ' '));
    nextBtn.insertAdjacentHTML('beforeend', '<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>');
  }

  function openVenture(i) {
    lastFocus = document.activeElement;
    openIndex = i;
    fillDialog(i);
    overlay.hidden = false;
    dialog.focus();
  }

  function closeVenture() {
    overlay.hidden = true;
    openIndex = null;
    if (lastFocus) lastFocus.focus();
  }

  document.getElementById('dlg-next').addEventListener('click', function () {
    openIndex = (openIndex + 1) % ventures.length;
    fillDialog(openIndex);
    dialog.scrollTop = 0;
  });
  document.getElementById('dlg-close').addEventListener('click', closeVenture);
  overlay.addEventListener('click', function (e) { if (e.target === overlay) closeVenture(); });
  document.addEventListener('keydown', function (e) {
    if (openIndex === null) return;
    if (e.key === 'Escape') closeVenture();
    if (e.key === 'Tab') {
      var focusables = dialog.querySelectorAll('button');
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ---------- Experience: timeline with pinned years ---------- */

  var timeline = document.getElementById('timeline');
  var tlScroll = document.getElementById('tl-scroll');
  var groups = [];
  var groupMap = {};

  jobs.forEach(function (j, i) {
    var g = groupMap[j.year];
    if (!g) {
      g = el('div', 'year-group');
      g.dataset.year = j.year;
      var pin = el('div', 'year-pin');
      pin.appendChild(el('span', 'year', j.year));
      g.appendChild(pin);
      g.appendChild(el('div', 'tl-items'));
      timeline.appendChild(g);
      groupMap[j.year] = g;
      groups.push(g);
    }
    var item = el('div', 'tl-item' + (i === 0 ? ' is-now' : ''));
    item.appendChild(el('p', 'tl-when', j.when));
    item.appendChild(el('h2', null, j.role));
    item.appendChild(el('p', 'tl-org', j.org));
    item.appendChild(bulletList(j.points));
    g.querySelector('.tl-items').appendChild(item);
  });

  function setYear(group) {
    groups.forEach(function (g) { g.classList.toggle('is-current', g === group); });
  }

  function onTimelineScroll() {
    var scroller = getComputedStyle(tlScroll).overflowY === 'visible' ? null : tlScroll;
    var top = scroller ? scroller.getBoundingClientRect().top : 0;
    var active = groups[0];
    groups.forEach(function (g) {
      if (g.getBoundingClientRect().top - top <= 12) active = g;
    });
    setYear(active);
  }

  tlScroll.addEventListener('scroll', onTimelineScroll, { passive: true });
  window.addEventListener('scroll', onTimelineScroll, { passive: true });
  setYear(groups[0]);

  /* ---------- Start on the page named in the address, if any ---------- */

  var start = (location.hash || '').replace('#', '');
  if (start && document.querySelector('[data-page="' + start + '"]')) showPage(start);
})();
