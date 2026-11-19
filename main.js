(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Content ---------- */

  var projects = [
    { art: 'lab', fig: 'lab', period: 'Sep 2026 to now', title: 'AI-checked network labs', body: 'An automated validation workflow for Cisco Packet Tracer. An LLM-driven toolchain writes the device configurations, applies them and checks the result.', points: ['Generates, applies and verifies router and switch configurations without manual checking.', 'Covers routing, VLAN, NAT and ACL configurations, the same topics I teach.', 'Replaces the slow, manual marking of student lab work.'], tools: 'LLMs, Cisco Packet Tracer, Python' },
    { art: 'incident', fig: 'incident', period: 'Feb to Mar 2025', title: 'UPMS security incident investigation', body: 'An incident report on a two-week attack campaign against a university web server, written with two teammates for the Cybersecurity Operations course at CMU Africa.', points: ['Worked through 1.1 million Wazuh alerts and Kibana alert rules to reconstruct the attack, from Nmap reconnaissance to Hydra brute force against SSH.', 'Found more than 16,000 web application attacks, including SQL injection, cross-site scripting and 284 Shellshock attempts, 16 of which succeeded.', 'Spotted an exposed remote desktop service and a mail service on a non-standard port that pointed to data exfiltration, and mapped each stage to MITRE ATT&CK.', 'Wrote the response plan and Ubuntu hardening scripts: firewall rules limited to admin addresses, key-only SSH with no root login, and exposed services switched off.'], tools: 'Wazuh, Kibana, MITRE ATT&CK, ufw, OpenSSH, Ubuntu' },
    { art: 'soc', fig: 'soc', period: 'Nov to Dec 2024', title: 'A working SOC, built from scratch', body: 'A complete security operations lab, built in VirtualBox with two teammates for the Network Security course at CMU Africa.', points: ['pfSense firewall at the edge with two VLANs, one for users and one for servers: outbound traffic allowed, all inbound traffic blocked, DHCP on each VLAN.', 'Windows Server 2016 domain controller (netsec.local) with baseline group policies: password rules, account lockout, and audit logging of logons, account changes and file access.', 'ELK Stack on Ubuntu collecting pfSense syslog and Windows events through Winlogbeat, with Kibana dashboards and alert rules.', 'Snort and Suricata for intrusion detection and prevention, a Squid transparent proxy for web filtering, and OpenVPN with its own certificate authority for remote access.', 'Tested from Kali Linux: Nmap scans and Hydra brute-force attempts were detected and blocked, and inbound pings and SSH were dropped.'], tools: 'VirtualBox, pfSense, Snort, Suricata, Squid, OpenVPN, Windows Server, Active Directory, ELK Stack, Winlogbeat, Kali Linux' },
    { art: 'redblue', period: 'Feb to May 2025', title: 'Attack, detect, remediate', body: 'Led a red team and blue team assessment of a critical web application for the Cybersecurity Operations course.', points: ['Ran vulnerability scans and exploited authentication flaws with Burp Suite, OWASP ZAP and Metasploit.', 'Wrote a remediation plan that ranked more than 30 high-risk vulnerabilities, cutting overall risk by 40% and moving the app toward ISO 27001.', 'Set up SIEM log analysis in the ELK Stack to correlate events and spot attack patterns, cutting incident response time by 35%.'], tools: 'ELK Stack, Wazuh, MISP, Burp Suite, OWASP ZAP, Metasploit, Wireshark' },
    { art: 'phone', fig: 'phone', period: 'Jul to Aug 2025', title: 'ShieldKids', body: 'A child safety Android app, built during my cybersecurity internship at Shield Tech Hub in Kigali.', points: ['Delivered the MVP in a six-week Agile cycle: one app for parents, one for children.', 'Set up Firestore sync and fine-grained permissions for full screen-time tracking, keeping family data protected.', 'Ran daily code reviews and API integration tests, and kept the project confidential.'], tools: 'Android, Firebase, Firestore' },
    { art: 'school', period: 'Since 2021', title: 'Usomi', body: 'A school management platform (SaaS) for secondary schools, built by Techy Ahead, the technology arm of Go Ahead RDC.', points: ['Modules for school finances, student transport, grades and administrative reporting.', 'In use by secondary schools in the DRC.', 'Techy Ahead also builds websites for companies and gives IT support to private firms.'], tools: 'SaaS, EdTech' },
    { art: 'truck', period: 'Oct 2021 to Sep 2024', title: 'IT systems for a logistics firm', body: 'Sole IT consultant for Ets Belle Vie in Goma, a company running heavy vehicles and a water distribution service.', points: ['Set up a fleet management system for more than 70 heavy vehicles: flatbeds, tractors and semi-trucks.', 'Built a backup and disaster recovery routine on Google Drive that protects ten years of financial and logistics records.', 'Built the company website in WordPress and PHP. Its monthly posts brought in four new clients in 2023 and helped launch the water service.', 'Supported more than 20 staff on QuickBooks, SAGE, Microsoft Office and Google Workspace.'], tools: 'WordPress, PHP, Google Workspace, QuickBooks, SAGE' },
    { art: 'moodle', period: 'Oct 2018 to Jul 2022', title: 'Ujuzi learning platform', body: 'The secure website and e-learning platform behind Ujuzi, the programming course I ran at CRES in Goma.', points: ['Deployed Moodle for more than 100 users.', 'Built custom workflows that automate student registration and track progress.', 'Set up user management that keeps learner data protected as the platform grows.'], tools: 'Moodle, web hosting' },
    { art: 'agent', period: 'Sep to Nov 2026', title: 'Kaggriculture agent', link: 'https://github.com/the-genius-man/kaggriculture-agent', fig: 'agent', body: 'An agent for the Kaggle Kaggriculture farming simulation. It plays a season of planting, watering and harvesting, and is tuned by search rather than by hand.', points: ['An explicit, parameterised policy (planting phases, watering, harvest timing) that Optuna searches over.', 'A self-play league with strict promotion gates: a candidate only replaces the champion after winning measured head-to-head games.', 'Deployment diagnoses backed by evidence files, which found a cash-starved early game, crops dying of thirst and production collapsing late in the season.', 'A Kaggle and Colab notebook that runs the league, exports the agent and a resumable checkpoint, and never submits on its own.'], tools: 'Python, Optuna, Kaggle, GitHub Actions' },
    { art: 'book', period: 'Jun to Aug 2026', title: 'A book on modern networking', body: 'Contributing author on a book on modern networking, as a Research Assistant at CMU Africa.', points: ['Wrote the chapter on network security.', 'Drafted the hands-on labs.', 'Produced the diagrams and figures, and formatted the manuscript.'], tools: 'Carnegie Mellon University Africa' }
  ];

  var art = {
    lab: '<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="14" y="44" width="92" height="32" rx="8"/><circle cx="30" cy="60" r="4"/><circle cx="44" cy="60" r="4"/><path d="M60 60h32"/><path d="M34 44V30M86 44V30M34 30h52"/><path d="M60 30V16"/><path d="M40 92l10 10 22-22"/></svg>',
    incident: '<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M60 14l46 80H14z"/><path d="M60 46v24M60 80v.5"/><path d="M18 108h84"/></svg>',
    soc: '<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M60 12l38 14v30c0 26-16 42-38 52C38 98 22 82 22 56V26z"/><path d="M30 62h14l6-12 8 24 8-18 6 6h18"/></svg>',
    redblue: '<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="60" cy="60" r="40"/><circle cx="60" cy="60" r="18"/><path d="M60 8v22M60 90v22M8 60h22M90 60h22"/></svg>',
    phone: '<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="34" y="10" width="52" height="100" rx="10"/><path d="M52 20h16"/><path d="M60 40l16 6v12c0 11-7 18-16 22-9-4-16-11-16-22V46z"/><path d="M52 64l5 5 11-11"/></svg>',
    school: '<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 52l46-24 46 24-46 24z"/><path d="M34 62v22c0 6 12 12 26 12s26-6 26-12V62"/><path d="M106 52v30"/></svg>',
    truck: '<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 36h62v46H12z"/><path d="M74 50h20l14 16v16H74z"/><circle cx="32" cy="88" r="9"/><circle cx="88" cy="88" r="9"/><path d="M12 82h11M41 82h38M97 82h11"/></svg>',
    moodle: '<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="14" y="26" width="92" height="60" rx="6"/><path d="M44 102h32M60 86v16"/><path d="M34 60l26-12 26 12-26 12z"/><path d="M48 66v10c0 3 6 6 12 6s12-3 12-6V66"/></svg>',
    agent: '<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 96c20-30 40-30 60-10s26 14 32-6"/><path d="M60 40c-8-14-22-18-36-14 2 16 12 26 28 28z"/><path d="M60 40c8-14 22-18 36-14-2 16-12 26-28 28z"/><path d="M60 40v56"/><circle cx="60" cy="100" r="6"/></svg>',
    book: '<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M60 32c-10-8-24-10-42-8v66c18-2 32 0 42 8 10-8 24-10 42-8V24c-18-2-32 0-42 8z"/><path d="M60 32v66"/><path d="M28 44h20M28 58h20M72 44h20M72 58h20"/></svg>'
  };

  /* Diagrams, drawn in draw.io: assets/diagrams/*.svg (sources in assets/diagrams/src) */
  var figureCaptions = {
    soc: 'Topology of the SOC lab',
    incident: 'How the investigation ran',
    lab: 'The validation loop',
    phone: 'Two apps, one backend, strict permissions',
    agent: 'How a new agent earns deployment'
  };
  var figureCache = {};
  function loadFigure(key, box) {
    var caption = figureCaptions[key];
    var path = 'assets/diagrams/' + key + '.svg';
    box.innerHTML = '<figure><img src="' + path + '" alt="' + caption + '"><figcaption>' + caption + '</figcaption></figure>';
    if (!window.fetch || location.protocol === 'file:') return;
    var done = function (svg) {
      if (box.dataset.key !== key) return;
      box.innerHTML = '<figure>' + svg + '<figcaption>' + caption + '</figcaption></figure>';
    };
    if (figureCache[key]) { done(figureCache[key]); return; }
    fetch(path).then(function (r) { return r.ok ? r.text() : ''; }).then(function (svg) {
      if (svg && svg.indexOf('<svg') === 0) { figureCache[key] = svg; done(svg); }
    }).catch(function () {});
  }

  var ventures = [
    { init: 'GA', name: 'Go Ahead RDC', url: 'https://goahead.africa', when: 'Since 2021', short: 'A group in Goma working in security, technology, agribusiness and transport.', intro: 'Co-Managing Director of a multisectoral firm with units in private security, technology, and agribusiness and transport.', points: ['Runs the guard staffing operation: recruiting and vetting guards, posting them to clients on rotating shifts and covering absences.', 'Built an in-house guard training programme. Competitors then hired trained guards away, which changed how the firm trains, deploys and keeps staff.', 'Owns vendor relationships, buying and planning across the units.'] },
    { init: 'TA', name: 'Techy Ahead', when: 'Since 2021', short: 'The technology arm of Go Ahead. Maker of the Usomi school platform.', intro: 'The technology company inside Go Ahead RDC, bringing software and IT services to local schools and firms.', points: ['Built and launched Usomi, a school management platform for secondary schools: finances, student transport, grades and reports.', 'Builds websites for local companies.', 'Gives ongoing IT support and consulting to private firms.'] },
    { init: 'ZP', name: 'Zero Panne', url: 'https://zeropanne.ikiotahub.com', when: 'Since 2022', short: 'A mobile garage service that brings vehicle repair to the customer.', intro: 'Co-founder of a mobile vehicle maintenance company in Goma.', points: ['Tested the market informally for 18 months, then registered the company as a SARL under OHADA law.', 'Co-wrote the business plan: market study, Business Model Canvas, competitive position and three-year projections.', 'Secured $21,000 in COPA funding plus $2,000 of personal capital to buy a mobile workshop vehicle.'] },
    { init: 'CR', name: 'CRES', url: 'https://le-cres.org', when: '2018 to 2022', short: 'A research centre turned technology transfer centre. Home of Ujuzi.', intro: 'Co-founder and programme manager of the Centre de Recherche et d’Expertise Scientifique, a research centre that became a technology transfer centre.', points: ['Designed and ran Ujuzi, a programming course: recruited 140 students and guided 30 to completion.', 'Managed an $8,000 budget over two years and oversaw the curriculum and instructors.', 'Deployed a Moodle learning platform for more than 100 users.', 'CRES gave rise to Zero Panne and to i-kiota, a startup accelerator.'] }
  ];

  var jobs = [
    { year: '2026', when: 'Sep 2026 to now', role: 'Independent IT consultant', org: 'Kigali, Rwanda', points: ['IT consulting for clients in Kigali.', 'Built the AI-checked Packet Tracer lab workflow.'] },
    { year: '2026', when: 'Jun to Aug 2026', role: 'Research Assistant', org: 'Carnegie Mellon University Africa', points: ['Contributing author on a book on modern networking: security chapter, labs, diagrams and manuscript layout.'] },
    { year: '2026', when: 'Feb to Mar 2026', role: 'Teaching Assistant, Advanced Networks', org: 'Adventist University of Central Africa', points: ['Taught 52 students IP addressing, routing and switching, VLANs, NAT, static and dynamic routing, and ACLs.', 'Ran hands-on Cisco Packet Tracer labs, and set and marked router and switch exercises.'] },
    { year: '2026', when: 'Jan to May 2026', role: 'Teaching Assistant, Information Systems Audit', org: 'Carnegie Mellon University Africa', points: ['Taught audit frameworks to more than 10 students, focused on finding weaknesses and testing controls.', 'Wrote five audit simulations based on real compliance problems.'] },
    { year: '2025', when: 'Aug to Dec 2025', role: 'Teaching Assistant, Cloud Computing', org: 'Carnegie Mellon University Africa', points: ['Gave second-level support for AWS and Azure lab environments, with 99% uptime for more than 30 students.', 'Solved over 100 student questions on cloud deployment and security, and held weekly office hours.', 'Prepared recitations, assignments and solutions, and graded homework.'] },
    { year: '2025', when: 'Jul to Aug 2025', role: 'Cybersecurity Intern', org: 'Shield Tech Hub, Kigali', points: ['Built the ShieldKids parent and child Android apps on Firebase in six weeks.'] },
    { year: '2025', when: 'Jul to Aug 2025', role: 'Student Worker, Student Induction Program', org: 'Carnegie Mellon University Africa', points: ['Worked under the Mastercard Foundation programme coordinator during summer induction.', 'Redesigned the Graduate Handbook for more than 200 international students, adding local prices and weather.', 'Prepared English Enhancement Program assignments for 25 students and ran their research poster show, which drew over 50 visitors.'] },
    { year: '2024', when: '2024 to 2026', role: 'Student leadership', org: 'Carnegie Mellon University Africa', points: ['Served on the advisory committee to the Mastercard Foundation Scholars Representative.', 'Led several student clubs.'] },
    { year: '2021', when: 'Jan 2021 to now', role: 'Co-Managing Director', org: 'Go Ahead RDC, Goma, DRC', points: ['Co-manage a multisectoral firm: private security services, a technology arm (Techy Ahead), agribusiness and transport.', 'Run the guard staffing operation: recruiting and vetting, rotating shift rosters and cover for absences.', 'Designed an in-house guard training programme and changed how the firm trains, deploys and keeps staff after competitors hired trained guards away.', 'Own vendor relationships, procurement and planning across the units; directed delivery of the Usomi school platform.'] },
    { year: '2021', when: 'Oct 2021 to Sep 2024', role: 'IT Technician Consultant', org: 'Ets Belle Vie, Goma, DRC', points: ['Ran IT for more than 20 staff: computers, network, accounts and business software.', 'Fleet system for 70+ heavy vehicles, ten-year backup and recovery, and the company website.'] },
    { year: '2021', when: 'Mar to Jul 2021', role: 'Network Technician Intern', org: 'Kenya Power and Lighting Company', points: ['Installed and maintained Cisco routers, switches and IP phones across four floors.', 'Spliced fibre optic cable and supported radio repeater sites.', 'Supported more than 50 staff in five departments.'] },
    { year: '2019', when: 'Jan 2019 to Aug 2021', role: 'Graphic Designer, Yearbook Office', org: 'University of Eastern Africa Baraton, Kenya', points: ['Designed two 200-page yearbooks in Adobe InDesign and negotiated the printing contract, for over 1,500 students.', 'Photographed weekly events and ran the office social media.'] },
    { year: '2018', when: 'Oct 2018 to Jul 2022', role: 'Co-founder and Programme Manager', org: 'CRES, Goma, DRC', points: ['Co-founded a research centre that became a technology transfer centre, and later spun out Zero Panne and the i-kiota accelerator.', 'Designed and ran Ujuzi, a programming upskilling course: recruited 140 students and guided 30 to completion.', 'Managed an $8,000 budget over two years, supervised curriculum development and coordinated instructors.', 'Deployed and administered a Moodle platform for more than 100 users.'] },
  ];

  var education = [
    { year: '2026', when: 'Aug 2024 to May 2026', kind: 'Degree', role: 'MS in Information Technology, Cybersecurity', org: 'Carnegie Mellon University Africa, Kigali, Rwanda', points: ['Mastercard Foundation Scholar.', 'Network security, cybersecurity operations, cloud computing and information systems audit.', 'Teaching Assistant for Cloud Computing and Information Systems Audit; Research Assistant on a networking textbook.'] },
    { year: '2025', when: '2025', kind: 'Certification', role: 'Google Cybersecurity Professional Certificate', org: 'Google, via Coursera', points: ['Security frameworks, network security, Linux and SQL, detection and response, and Python for security tasks.'] },
    { year: '2024', when: '2024', kind: 'Certification', role: 'AWS Certified Cloud Practitioner', org: 'Amazon Web Services', points: ['Cloud concepts, core AWS services, security and compliance, pricing and support.'] },
    { year: '2023', when: '2023', kind: 'Certification', role: 'TEF Certificate in Business Management', org: 'Tony Elumelu Foundation', points: ['Business planning, financial management and marketing for early-stage ventures.'] },
    { year: '2023', when: '2023', kind: 'Training', role: 'AWS Cloud Computing programme', org: 'ALX Africa', points: ['Hands-on AWS training that led to the Cloud Practitioner certification.'] },
    { year: '2021', when: 'Jan 2017 to Aug 2021', kind: 'Degree', role: 'Dual BSc, Software Engineering and Networks and Communication Systems', org: 'University of Eastern Africa Baraton, Eldoret, Kenya', points: ['Software engineering, network administration and information security.', 'Graphic designer at the Yearbook Office; network technician intern at Kenya Power.'] },
    { year: '2020', when: '2020', kind: 'Certification', role: 'Microsoft Azure Fundamentals (AZ-900)', org: 'Microsoft', points: ['Cloud concepts, Azure services, security, privacy, pricing and support.'] }
  ];

  var skills = [
    { group: 'Security', items: [
      ['SIEM (ELK Stack)', 'The SOC lab and the UPMS investigation at CMU Africa: pfSense and Windows logs into Kibana.'],
      ['Wazuh', 'Hunted through 1.1 million alerts for the UPMS incident report.'],
      ['Snort and Suricata', 'IDS/IPS in the SOC lab. Caught Nmap scans and Hydra brute force from Kali.'],
      ['Incident response', 'Wrote the UPMS incident report, with each stage mapped to MITRE ATT&CK.'],
      ['Vulnerability assessment', 'Burp Suite, OWASP ZAP and Metasploit on a critical web app; ranked 30+ findings.'],
      ['IS audit', 'Taught it at CMU Africa and wrote five audit simulations.'],
      ['ISO 27001', 'The remediation plan for the red and blue team project was built around it.'],
      ['Wireshark', 'Traffic analysis in the red and blue team project.'],
      ['MISP', 'Threat intelligence sharing in the red and blue team project.']
    ] },
    { group: 'Networks', items: [
      ['Cisco routing and switching', 'Kenya Power internship across four floors; taught to 52 students at AUCA.'],
      ['Cisco Packet Tracer', 'Teaching labs, and the AI-checked validation workflow.'],
      ['pfSense', 'The edge firewall of the SOC lab, with VLANs and logging to ELK.'],
      ['VLANs, NAT and ACLs', 'Two VLANs in the SOC lab; a full module in the AUCA course.'],
      ['OpenVPN', 'Remote access for the SOC lab, with its own certificate authority.'],
      ['Active Directory', 'The netsec.local domain with baseline group policies and audit logging.'],
      ['Windows Server', 'Domain controller for the SOC lab.'],
      ['Linux', 'Ubuntu servers for ELK and users; the hardening scripts in the UPMS report.'],
      ['Fibre optic', 'Spliced fibre and supported radio repeater sites at Kenya Power.']
    ] },
    { group: 'Cloud and tools', items: [
      ['AWS', 'Cloud Practitioner certified. Supported student labs at CMU Africa.'],
      ['Azure', 'AZ-900 certified. Supported student labs at CMU Africa.'],
      ['Docker', 'Containers for coursework and lab environments.'],
      ['Firebase', 'Backend of the ShieldKids apps, with Firestore permissions.'],
      ['Git', 'Every project on github.com/the-genius-man.'],
      ['Google Workspace', 'Ran it for more than 20 staff at Ets Belle Vie.'],
      ['Moodle', 'The Ujuzi platform for more than 100 learners.'],
      ['Backup and disaster recovery', 'Ten years of Belle Vie records protected on Google Drive.']
    ] },
    { group: 'Development', items: [
      ['Python', 'The Packet Tracer validation workflow.'],
      ['Bash', 'Ubuntu hardening scripts from the UPMS report.'],
      ['SQL', 'Coursework and the Usomi platform.'],
      ['Flutter and Dart', 'Cross-platform mobile development; ShieldKids and client work.'],
      ['Android', 'The ShieldKids parent and child apps.'],
      ['PHP and WordPress', 'The Ets Belle Vie website.'],
      ['LLM tooling', 'Drives the Packet Tracer configuration workflow.'],
      ['Agile delivery', 'The six-week ShieldKids cycle with daily code reviews.']
    ] }
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
  function store(key, value) {
    try { if (value === undefined) return localStorage.getItem(key); localStorage.setItem(key, value); } catch (e) { return null; }
  }
  function inkColor() { return getComputedStyle(document.documentElement).getPropertyValue('--ink').trim(); }
  function hexToRgb(hex) {
    var h = hex.replace('#', '');
    return [parseInt(h.substr(0, 2), 16), parseInt(h.substr(2, 2), 16), parseInt(h.substr(4, 2), 16)];
  }

  var main = document.getElementById('main');

  /* ---------- Night mode ---------- */

  var modeBtn = document.getElementById('mode');
  var themeMeta = document.querySelector('meta[name="theme-color"]');
  function setNight(on, save) {
    document.documentElement.classList.toggle('night', on);
    modeBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
    modeBtn.setAttribute('aria-label', on ? 'Switch to day mode' : 'Switch to night mode');
    modeBtn.querySelector('.mode-text').textContent = on ? 'Day' : 'Night';
    if (themeMeta) themeMeta.setAttribute('content', on ? '#00132E' : '#ffffff');
    if (save) store('nick-theme', on ? 'night' : 'day');
    netColor = hexToRgb(inkColor());
  }
  var saved = store('nick-theme');
  var netColor = [0, 19, 46];
  setNight(saved ? saved === 'night' : window.matchMedia('(prefers-color-scheme: dark)').matches, false);
  modeBtn.addEventListener('click', function () {
    setNight(!document.documentElement.classList.contains('night'), true);
  });

  /* ---------- The living network ---------- */

  var canvas = document.getElementById('net');
  var ctx = canvas.getContext('2d');
  var nodes = [], packets = [], W = 0, H = 0, dpr = 1;
  var mouse = { x: -9999, y: -9999, px: 0, py: 0 };
  var LINK = 150;

  function sizeNet() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var want = Math.max(28, Math.min(80, Math.round(W * H / 22000)));
    while (nodes.length < want) nodes.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25, r: 1.5 + Math.random() * 2 });
    nodes.length = want;
  }

  function newPacket() {
    var tries = 12;
    while (tries--) {
      var a = Math.floor(Math.random() * nodes.length);
      var b = Math.floor(Math.random() * nodes.length);
      if (a === b) continue;
      var dx = nodes[a].x - nodes[b].x, dy = nodes[a].y - nodes[b].y;
      if (dx * dx + dy * dy < LINK * LINK) return { a: a, b: b, t: 0, speed: 0.004 + Math.random() * 0.006, peach: Math.random() < 0.18 };
    }
    return null;
  }

  function drawNet() {
    ctx.clearRect(0, 0, W, H);
    var c = netColor.join(',');
    var ox = mouse.px, oy = mouse.py;
    var i, j, n, m, dx, dy, d2;
    for (i = 0; i < nodes.length; i++) {
      n = nodes[i];
      n.x += n.vx; n.y += n.vy;
      if (n.x < -20) n.x = W + 20; if (n.x > W + 20) n.x = -20;
      if (n.y < -20) n.y = H + 20; if (n.y > H + 20) n.y = -20;
      dx = n.x - mouse.x; dy = n.y - mouse.y; d2 = dx * dx + dy * dy;
      if (d2 < 160 * 160 && d2 > 1) { var f = (1 - Math.sqrt(d2) / 160) * 0.35; n.x += dx / Math.sqrt(d2) * f; n.y += dy / Math.sqrt(d2) * f; }
    }
    ctx.lineWidth = 1;
    for (i = 0; i < nodes.length; i++) {
      n = nodes[i];
      for (j = i + 1; j < nodes.length; j++) {
        m = nodes[j];
        dx = n.x - m.x; dy = n.y - m.y; d2 = dx * dx + dy * dy;
        if (d2 < LINK * LINK) {
          ctx.strokeStyle = 'rgba(' + c + ',' + (0.16 * (1 - Math.sqrt(d2) / LINK)).toFixed(3) + ')';
          ctx.beginPath(); ctx.moveTo(n.x + ox, n.y + oy); ctx.lineTo(m.x + ox, m.y + oy); ctx.stroke();
        }
      }
    }
    for (i = 0; i < nodes.length; i++) {
      n = nodes[i];
      ctx.fillStyle = 'rgba(' + c + ',0.28)';
      ctx.beginPath(); ctx.arc(n.x + ox, n.y + oy, n.r, 0, Math.PI * 2); ctx.fill();
    }
    while (packets.length < 14) { var p = newPacket(); if (!p) break; packets.push(p); }
    for (i = packets.length - 1; i >= 0; i--) {
      var pk = packets[i];
      pk.t += pk.speed;
      var A = nodes[pk.a], B = nodes[pk.b];
      if (pk.t >= 1 || !A || !B) { packets.splice(i, 1); continue; }
      var x = A.x + (B.x - A.x) * pk.t, y = A.y + (B.y - A.y) * pk.t;
      ctx.fillStyle = pk.peach ? 'rgba(245,180,151,0.95)' : 'rgba(' + c + ',0.7)';
      ctx.beginPath(); ctx.arc(x + ox, y + oy, pk.peach ? 3 : 2.2, 0, Math.PI * 2); ctx.fill();
    }
  }

  var netRunning = false;
  function loop() { if (!netRunning) return; drawNet(); requestAnimationFrame(loop); }
  function startNet() { if (reduced || netRunning) return; netRunning = true; requestAnimationFrame(loop); }
  function stopNet() { netRunning = false; }
  if (!reduced) {
    sizeNet();
    window.addEventListener('resize', sizeNet);
    window.addEventListener('pointermove', function (e) {
      mouse.x = e.clientX; mouse.y = e.clientY;
      mouse.px = (e.clientX - W / 2) * -0.012; mouse.py = (e.clientY - H / 2) * -0.012;
    });
    window.addEventListener('pointerleave', function () { mouse.x = -9999; mouse.y = -9999; });
    document.addEventListener('visibilitychange', function () { document.hidden ? stopNet() : startNet(); });
    startNet();
  }

  /* ---------- Shooting stars you can catch ---------- */

  var sky = document.getElementById('sky');
  var starPath = 'M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z';
  [{ x: 70, y: 5, dur: 11, delay: 2 }, { x: 95, y: 30, dur: 14, delay: 7 }, { x: 55, y: 18, dur: 17, delay: 12 }].forEach(function (m) {
    var meteor = el('div', 'meteor');
    meteor.style.left = m.x + '%';
    meteor.style.top = m.y + '%';
    meteor.style.animationDuration = m.dur + 's';
    meteor.style.animationDelay = m.delay + 's';
    meteor.addEventListener('click', function (e) {
      burst(e.clientX, e.clientY);
      meteor.classList.add('is-hit');
      setTimeout(function () { meteor.classList.remove('is-hit'); }, m.dur * 1000);
    });
    sky.appendChild(meteor);
  });

  function burst(x, y) {
    var ink = inkColor();
    for (var k = 0; k < 16; k++) {
      var s = el('div', 'spark');
      var ang = Math.PI * 2 * k / 16 + Math.random() * 0.5;
      var dist = 60 + Math.random() * 90;
      s.style.left = x - 5 + 'px';
      s.style.top = y - 5 + 'px';
      s.style.setProperty('--dx', Math.round(Math.cos(ang) * dist) + 'px');
      s.style.setProperty('--dy', Math.round(Math.sin(ang) * dist) + 'px');
      s.innerHTML = '<svg viewBox="0 0 24 24"><path d="' + starPath + '" fill="' + (k % 3 === 0 ? '#F5B497' : ink) + '"/></svg>';
      sky.appendChild(s);
      setTimeout(function (node) { node.remove(); }, 950, s);
    }
  }

  /* ---------- Tabs, transitions, heading reveal ---------- */

  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tab'));
  var pages = Array.prototype.slice.call(document.querySelectorAll('.page'));
  var order = tabs.map(function (t) { return t.dataset.tab; });
  var currentTab = 'about';

  function revealHeading(h) {
    if (!h || h.dataset.split === 'done' && !h.dataset.text) return;
    var text = h.dataset.text || h.textContent;
    h.dataset.text = text;
    h.innerHTML = '';
    h.setAttribute('aria-label', text);
    text.split('').forEach(function (ch, i) {
      var s = el('span', 'ch', ch);
      s.setAttribute('aria-hidden', 'true');
      s.style.animationDelay = (i * 0.045) + 's';
      h.appendChild(s);
    });
  }

  function showPage(name) {
    var from = order.indexOf(currentTab), to = order.indexOf(name);
    var dir = to >= from ? 'in-left' : 'in-right';
    currentTab = name;
    tabs.forEach(function (t) {
      if (t.dataset.tab === name) t.setAttribute('aria-current', 'page');
      else t.removeAttribute('aria-current');
    });
    pages.forEach(function (p) {
      var on = p.dataset.page === name;
      p.hidden = !on;
      p.classList.remove('in-left', 'in-right', 'is-active');
      if (on) {
        void p.offsetWidth;
        p.classList.add('is-active', dir);
        revealHeading(p.querySelector('h1[data-reveal]'));
      }
    });
    main.scrollTop = 0;
    if (name === 'about') runCounters();
    if (name === 'experience') expTimeline.reset();
    if (name === 'education') eduTimeline.reset();
    if (history.replaceState) history.replaceState(null, '', '#' + name);
  }
  tabs.forEach(function (t) { t.addEventListener('click', function () { showPage(t.dataset.tab); }); });

  /* ---------- Rotating word ---------- */

  var rotWords = ['secure systems', 'networks', 'training programmes', 'businesses'];
  var rotEl = document.querySelector('#rotator .rot-word');
  var rotI = 0;
  if (!reduced) {
    setInterval(function () {
      rotEl.classList.remove('in');
      rotEl.classList.add('out');
      setTimeout(function () {
        rotI = (rotI + 1) % rotWords.length;
        rotEl.textContent = rotWords[rotI];
        rotEl.classList.remove('out');
        rotEl.classList.add('in');
      }, 340);
    }, 2800);
  }

  /* ---------- Counters ---------- */

  function runCounters() {
    var nums = document.querySelectorAll('#numbers .num');
    nums.forEach(function (n) {
      var target = parseInt(n.dataset.count, 10);
      var prefix = n.dataset.prefix || '', suffix = n.dataset.suffix || '';
      if (reduced) { n.textContent = prefix + target + suffix; return; }
      var start = null, dur = 1300;
      function step(ts) {
        if (!start) start = ts;
        var k = Math.min(1, (ts - start) / dur);
        var eased = 1 - Math.pow(1 - k, 3);
        n.textContent = prefix + Math.round(target * eased) + suffix;
        if (k < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }

  /* ---------- Work: stacked cards ---------- */

  var deck = document.getElementById('deck');
  var detail = document.getElementById('work-detail');
  var figureBox = document.getElementById('work-figure');
  var dots = document.getElementById('deck-dots');
  var countEl = document.getElementById('deck-count');
  var shades = ['', 'var(--card-2)', 'var(--card-3)', 'var(--card-4)'];
  var current = 0, sending = false, drag = null;

  var cards = projects.map(function (p, i) {
    var card = el('button', 'card');
    card.type = 'button';
    var a = el('span', 'card-art'); a.innerHTML = art[p.art]; a.setAttribute('aria-hidden', 'true');
    card.appendChild(a);
    card.appendChild(el('span', 'card-period', p.period));
    card.appendChild(el('span', 'card-title', p.title));
    card.appendChild(el('span', 'card-hint', 'Tap or drag for the next project'));
    card.addEventListener('click', function () { if (card.classList.contains('is-front') && !(drag && drag.moved)) next(); });
    deck.appendChild(card);
    var dot = el('button', 'deck-dot');
    dot.type = 'button';
    dot.setAttribute('aria-label', 'Show project ' + (i + 1) + ': ' + p.title);
    dot.addEventListener('click', function () { if (sending) return; current = i; layoutDeck(); });
    dots.appendChild(dot);
    return card;
  });

  function baseTransform(depth) { return 'translateY(' + depth * 16 + 'px) scale(' + (1 - depth * 0.05) + ')'; }

  function layoutDeck() {
    var n = cards.length;
    cards.forEach(function (card, i) {
      var d = (i - current + n) % n;
      var depth = Math.min(d, 3);
      card.dataset.base = baseTransform(depth);
      card.style.transform = card.dataset.base;
      card.style.opacity = d < 4 ? '1' : '0';
      card.style.zIndex = String(20 - d);
      card.style.background = d === 0 ? '' : shades[depth];
      card.classList.toggle('is-front', d === 0);
      card.querySelector('.card-hint').hidden = d !== 0;
      card.tabIndex = d === 0 ? 0 : -1;
      card.setAttribute('aria-hidden', d === 0 ? 'false' : 'true');
      card.setAttribute('aria-label', projects[i].title + '. Show the next project');
    });
    Array.prototype.forEach.call(dots.children, function (dot, i) {
      if (i === current) dot.setAttribute('aria-current', 'true'); else dot.removeAttribute('aria-current');
    });
    countEl.textContent = (current + 1) + ' / ' + n;
    renderDetail();
  }

  function renderDetail() {
    var p = projects[current];
    detail.innerHTML = '';
    detail.appendChild(el('p', 'kicker', p.period));
    detail.appendChild(el('h2', null, p.title));
    detail.appendChild(el('p', 'intro', p.body));
    detail.appendChild(bulletList(p.points));
    detail.appendChild(el('p', 'tools', 'Tools: ' + p.tools));
    if (p.link) {
      var a = el('a', 'btn', 'View the code on GitHub');
      a.href = p.link; a.target = '_blank'; a.rel = 'noopener noreferrer';
      detail.appendChild(a);
    }
    detail.classList.remove('swap');
    void detail.offsetWidth;
    detail.classList.add('swap');
    figureBox.dataset.key = p.fig || '';
    if (p.fig && figureCaptions[p.fig]) loadFigure(p.fig, figureBox); else figureBox.innerHTML = '';
  }

  function next() {
    if (sending) return;
    var front = cards[current];
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

  deck.addEventListener('pointerdown', function (e) {
    var front = cards[current];
    if (e.target.closest('.card') !== front || sending) return;
    drag = { x: e.clientX, dx: 0, moved: false, card: front };
    front.setPointerCapture(e.pointerId);
    front.classList.add('is-dragging');
  });
  deck.addEventListener('pointermove', function (e) {
    var front = cards[current];
    if (drag) {
      drag.dx = e.clientX - drag.x;
      if (Math.abs(drag.dx) > 5) drag.moved = true;
      drag.card.style.transform = 'translateX(' + drag.dx + 'px) rotate(' + (drag.dx / 18) + 'deg)';
      return;
    }
    if (reduced || !front.classList.contains('is-front')) return;
    var r = deck.getBoundingClientRect();
    var rx = ((e.clientY - r.top) / r.height - 0.5) * -8;
    var ry = ((e.clientX - r.left) / r.width - 0.5) * 10;
    front.style.transform = front.dataset.base + ' rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg)';
  });
  function endDrag() {
    if (!drag) return;
    var d = drag; drag = null;
    d.card.classList.remove('is-dragging');
    if (d.dx > 70) { d.card.style.transform = d.card.dataset.base; next(); }
    else if (d.dx < -70) { d.card.style.transform = 'translateX(-130%) rotate(-12deg)'; d.card.style.opacity = '0'; setTimeout(function () { d.card.style.opacity = ''; prev(); }, 300); }
    else d.card.style.transform = d.card.dataset.base;
    setTimeout(function () { d.moved = false; }, 0);
  }
  deck.addEventListener('pointerup', endDrag);
  deck.addEventListener('pointercancel', endDrag);
  deck.addEventListener('pointerleave', function () {
    if (drag) return;
    var front = cards[current];
    front.style.transform = front.dataset.base;
  });
  document.addEventListener('keydown', function (e) {
    if (currentTab !== 'work' || openIndex !== null || termOpen) return;
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
  });
  layoutDeck();

  /* ---------- Ventures: cards and popup ---------- */

  var grid = document.getElementById('venture-grid');
  var overlay = document.getElementById('overlay');
  var dialog = overlay.querySelector('.dialog');
  var openIndex = null, lastFocus = null;

  ventures.forEach(function (v, i) {
    var card = el('button', 'venture');
    card.type = 'button';
    card.setAttribute('aria-label', v.name + '. ' + v.short + ' Open details.');
    var head = el('span', 'v-head');
    var badge = el('span', 'badge', v.init); badge.setAttribute('aria-hidden', 'true');
    var names = el('span');
    names.appendChild(el('span', 'kicker', v.when));
    names.appendChild(el('span', 'v-name', v.name));
    head.appendChild(badge); head.appendChild(names);
    card.appendChild(head);
    card.appendChild(el('span', 'v-short', v.short));
    card.appendChild(el('span', 'v-more', v.url ? v.url.replace(/^https?:\/\//, '') + '  \u2192  Read more' : 'Read more'));
    card.addEventListener('click', function () { openVenture(i); });
    grid.appendChild(card);
  });

  function fillDialog(i) {
    var v = ventures[i], nextV = ventures[(i + 1) % ventures.length];
    document.getElementById('dlg-init').textContent = v.init;
    document.getElementById('dlg-when').textContent = v.when;
    document.getElementById('dlg-name').textContent = v.name;
    document.getElementById('dlg-intro').textContent = v.intro;
    var list = document.getElementById('dlg-points');
    list.innerHTML = '';
    v.points.forEach(function (p) { list.appendChild(el('li', null, p)); });
    var site = document.getElementById('dlg-site');
    if (v.url) { site.hidden = false; site.href = v.url; site.textContent = 'Visit ' + v.url.replace(/^https?:\/\//, ''); }
    else site.hidden = true;
    var nextBtn = document.getElementById('dlg-next');
    nextBtn.innerHTML = '';
    nextBtn.appendChild(document.createTextNode('Next: ' + nextV.name + ' '));
    nextBtn.insertAdjacentHTML('beforeend', '<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>');
  }
  function openVenture(i) { lastFocus = document.activeElement; openIndex = i; fillDialog(i); overlay.hidden = false; dialog.focus(); }
  function closeVenture() { overlay.hidden = true; openIndex = null; if (lastFocus) lastFocus.focus(); }
  document.getElementById('dlg-next').addEventListener('click', function () { openIndex = (openIndex + 1) % ventures.length; fillDialog(openIndex); dialog.scrollTop = 0; });
  document.getElementById('dlg-close').addEventListener('click', closeVenture);
  overlay.addEventListener('click', function (e) { if (e.target === overlay) closeVenture(); });
  document.addEventListener('keydown', function (e) {
    if (openIndex === null) return;
    if (e.key === 'Escape') closeVenture();
    if (e.key === 'Tab') {
      var f = dialog.querySelectorAll('button'), first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ---------- Timelines with pinned years and a year rail ---------- */

  function buildTimeline(items, timelineId, scrollId, railId) {
    var timeline = document.getElementById(timelineId);
    var scroller = document.getElementById(scrollId);
    var rail = document.getElementById(railId);
    var groups = [], groupMap = {};
    items.forEach(function (j) {
      var g = groupMap[j.year];
      if (!g) {
        g = el('div', 'year-group'); g.dataset.year = j.year;
        var pin = el('div', 'year-pin'); pin.appendChild(el('span', 'year', j.year));
        g.appendChild(pin); g.appendChild(el('div', 'tl-items'));
        timeline.appendChild(g); groupMap[j.year] = g; groups.push(g);
        var rb = el('button', null, j.year); rb.type = 'button';
        rb.addEventListener('click', function () {
          var top = g.offsetTop - timeline.offsetTop;
          if (getComputedStyle(scroller).overflowY === 'visible') window.scrollTo({ top: g.getBoundingClientRect().top + window.scrollY - 90, behavior: reduced ? 'auto' : 'smooth' });
          else scroller.scrollTo({ top: top, behavior: reduced ? 'auto' : 'smooth' });
        });
        rail.appendChild(rb);
      }
      var item = el('div', 'tl-item' + (/to now$/.test(j.when) ? ' is-now' : ''));
      item.appendChild(el('p', 'tl-when', j.kind ? j.when + ' \u00b7 ' + j.kind : j.when));
      item.appendChild(el('h2', null, j.role));
      item.appendChild(el('p', 'tl-org', j.org));
      item.appendChild(bulletList(j.points));
      g.querySelector('.tl-items').appendChild(item);
    });
    function setYear(group) {
      groups.forEach(function (g, i) {
        g.classList.toggle('is-current', g === group);
        var b = rail.children[i];
        if (g === group) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current');
      });
    }
    var items = Array.prototype.slice.call(timeline.querySelectorAll('.tl-item'));
    function onScroll() {
      if (!timeline.offsetParent) return;
      var fixed = getComputedStyle(scroller).overflowY !== 'visible';
      var top = fixed ? scroller.getBoundingClientRect().top : 0;
      var tlTop = timeline.getBoundingClientRect().top;
      // the line ends at the centre of the last point
      var last = items[items.length - 1];
      var end = last.getBoundingClientRect().top - tlTop + 14;
      timeline.style.setProperty('--tl-end', end + 'px');
      // at the bottom of the list, the last year counts as reached
      var atEnd = fixed ? scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 4
                        : window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      var active = groups[0];
      groups.forEach(function (g) { if (g.getBoundingClientRect().top - top <= 12) active = g; });
      if (atEnd) active = groups[groups.length - 1];
      setYear(active);
      var view = fixed ? scroller.clientHeight : window.innerHeight;
      var reach = (fixed ? top : 0) + view * 0.55 - tlTop;
      var progress = atEnd ? end : Math.max(0, Math.min(end, reach));
      timeline.style.setProperty('--tl-progress', progress + 'px');
      // light up every point the line has reached
      items.forEach(function (it) {
        var y = it.getBoundingClientRect().top - tlTop + 14;
        it.classList.toggle('is-reached', y <= progress + 1);
      });
    }
    window.addEventListener('resize', onScroll);
    scroller.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    setYear(groups[0]);
    return { reset: function () { scroller.scrollTop = 0; onScroll(); } };
  }

  var expTimeline = buildTimeline(jobs, 'timeline', 'tl-scroll', 'year-rail');
  var eduTimeline = buildTimeline(education, 'edu-timeline', 'edu-scroll', 'edu-rail');

  /* ---------- Skills: chips that expand ---------- */

  var sg = document.getElementById('skill-groups');
  skills.forEach(function (group, gi) {
    var box = el('div', 'skill-group');
    box.appendChild(el('h2', null, group.group));
    var ul = el('ul', 'chips');
    var panel = el('p', 'skill-detail');
    panel.id = 'skill-detail-' + gi;
    panel.hidden = true;
    var chips = [];
    group.items.forEach(function (it) {
      var li = el('li');
      var chip = el('button', 'chip', it[0]);
      chip.type = 'button';
      chip.setAttribute('aria-expanded', 'false');
      chip.setAttribute('aria-controls', panel.id);
      chip.addEventListener('click', function () {
        var open = chip.getAttribute('aria-expanded') === 'true';
        chips.forEach(function (c) { c.setAttribute('aria-expanded', 'false'); });
        if (open) { panel.hidden = true; return; }
        chip.setAttribute('aria-expanded', 'true');
        panel.innerHTML = '';
        var strong = el('strong', null, it[0] + '. ');
        panel.appendChild(strong);
        panel.appendChild(document.createTextNode(it[1]));
        panel.hidden = false;
      });
      chips.push(chip);
      li.appendChild(chip);
      ul.appendChild(li);
    });
    box.appendChild(ul);
    box.appendChild(panel);
    sg.appendChild(box);
  });

  /* ---------- Terminal ---------- */

  var term = document.getElementById('term');
  var termOut = document.getElementById('term-out');
  var termIn = document.getElementById('term-in');
  var termOpen = false;
  var termHint = document.getElementById('term-hint');

  function tprint(text, peach) {
    var line = document.createElement('span');
    line.textContent = text + '\n';
    if (peach) line.className = 'peach';
    termOut.appendChild(line);
    termOut.scrollTop = termOut.scrollHeight;
  }
  function openTerm() {
    termOpen = true; term.hidden = false; termHint.hidden = true;
    if (!termOut.textContent) { tprint('Welcome. Type help to see what I can do.', true); }
    termIn.focus();
  }
  function closeTerm() { termOpen = false; term.hidden = true; termHint.hidden = false; }
  document.getElementById('term-close').addEventListener('click', closeTerm);
  document.addEventListener('keydown', function (e) {
    if (e.key === '`' && e.target !== termIn && !(e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) { e.preventDefault(); termOpen ? closeTerm() : openTerm(); }
    if (e.key === 'Escape' && termOpen) closeTerm();
  });

  var commands = {
    help: function () { return ['Commands:', '  about      who I am', '  work       list the projects', '  ventures   the four companies', '  skills     the skill groups', '  cv         download the CV', '  contact    how to reach me', '  theme      switch day and night', '  go <page>  open a section (about, work, ventures, experience, skills)', '  ping       check the line', '  whoami     you, as far as I can tell', '  clear      wipe the screen', '  exit       close the terminal'].join('\n'); },
    about: function () { return 'Nick Azaria. IT and cybersecurity professional in Kigali. MS in IT (Cybersecurity), CMU Africa, 2026. Builds secure systems, teaches networking and co-manages a company in Goma.'; },
    work: function () { return projects.map(function (p, i) { return (i + 1) + '. ' + p.title + '  (' + p.period + ')'; }).join('\n'); },
    ventures: function () { return ventures.map(function (v) { return v.name + ': ' + v.short; }).join('\n'); },
    skills: function () { return skills.map(function (g) { return g.group + ': ' + g.items.map(function (i) { return i[0]; }).join(', '); }).join('\n'); },
    cv: function () { var a = document.createElement('a'); a.href = 'assets/Nick_Azaria_CV.pdf'; a.download = 'Nick_Azaria_CV.pdf'; document.body.appendChild(a); a.click(); a.remove(); return 'Downloading Nick_Azaria_CV.pdf'; },
    contact: function () { return 'Email: azaria.nick@outlook.fr\nLinkedIn: linkedin.com/in/nick-azaria\nGitHub: github.com/the-genius-man'; },
    theme: function () { modeBtn.click(); return 'Switched to ' + (document.documentElement.classList.contains('night') ? 'night' : 'day') + ' mode.'; },
    go: function (arg) { if (order.indexOf(arg) < 0) return 'Pages: ' + order.join(', '); showPage(arg); return 'Opened ' + arg + '.'; },
    ping: function () { return 'PING portfolio: 64 bytes, time=' + (1 + Math.random() * 3).toFixed(1) + ' ms. All systems operational.'; },
    whoami: function () { return 'A visitor with excellent taste in portfolios.'; },
    date: function () { return new Date().toString(); },
    sudo: function () { return 'Nice try. Nick holds the keys here.'; },
    clear: function () { termOut.innerHTML = ''; return ''; },
    exit: function () { closeTerm(); return ''; }
  };
  document.getElementById('term-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var raw = termIn.value.trim(); termIn.value = '';
    if (!raw) return;
    tprint('$ ' + raw, true);
    var parts = raw.split(/\s+/), cmd = parts[0].toLowerCase(), arg = (parts[1] || '').toLowerCase();
    var fn = commands[cmd];
    var out = fn ? fn(arg) : 'Unknown command: ' + cmd + '. Type help.';
    if (out) tprint(out);
  });

  /* ---------- Status line: last deploy from GitHub ---------- */

  var statusText = document.getElementById('status-text');
  if (window.fetch) {
    fetch('https://api.github.com/repos/the-genius-man/my-portfolio/commits?per_page=1', { headers: { Accept: 'application/vnd.github+json' } })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (data) {
        if (!data || !data[0]) return;
        var d = new Date(data[0].commit.committer.date);
        var txt = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
        statusText.textContent = 'Online. Updated ' + txt;
      })
      .catch(function () {});
  }

  /* ---------- Start ---------- */

  var start = (location.hash || '').replace('#', '');
  if (start && order.indexOf(start) >= 0 && start !== 'about') { currentTab = 'about'; showPage(start); }
  else { revealHeading(document.querySelector('[data-page="about"] h1')); runCounters(); }
})();
