export const coursesData = [
  {
    id: 1,
    title: "Introducere în securitate",
    description: "Fundamentele securității cibernetice pentru începători",
    banner_image: "/banner2.png",
    achievementBadge: "Introducere în securitate",
    chapters: [
      {
        title: "Concepte de bază",
        subsections: [
          {
            name: "🔐 Ce este securitatea cibernetică?",
            content: `Securitatea cibernetică reprezintă practica de protejare a sistemelor, rețelelor și programelor împotriva atacurilor digitale.

Aceste atacuri cibernetice au de obicei ca scop accesarea, modificarea sau distrugerea informațiilor sensibile, extorcarea de bani de la utilizatori sau întreruperea proceselor normale de afaceri.

Implementarea unor măsuri eficace de securitate cibernetică este deosebit de dificilă astăzi, deoarece există mai multe dispozitive decât oameni, iar atacatorii devin din ce în ce mai inovativi.

Un program de securitate cibernetică de succes are mai multe straturi de protecție răspândite pe calculatoare, rețele, programe sau date pe care intenționează să le protejeze.

Într-o organizație, oamenii, procesele și tehnologia trebuie să se completeze reciproc pentru a crea o apărare eficace împotriva atacurilor cibernetice.`
          },
          {
            name: "🎯 De ce este importantă?",
            content: `Costul global al criminalității cibernetice se estimează că va ajunge la 10,5 trilioane de dolari anual până în 2025.

Atacurile cibernetice pot avea consecințe devastatoare pentru organizații și indivizi, incluzând pierderi financiare, deteriorarea reputației și compromiterea datelor personale.

Dependența crescândă de tehnologie în toate aspectele vieții noastre face ca securitatea cibernetică să fie mai critică ca niciodată.

Organizațiile care nu investesc în securitate cibernetică riscă să își piardă încrederea clienților și să se confrunte cu sancțiuni legale.

Securitatea cibernetică nu este doar responsabilitatea departamentului IT, ci a fiecărui membru al organizației.`
          }
        ]
      },
      {
        title: "Tipuri de amenințări",
        subsections: [
          {
            name: "🦠 Malware",
            content: `Malware-ul este un software rău intenționat conceput pentru a deteriora sau a obține acces neautorizat la un sistem de calculator.

Tipurile comune de malware includ viruși, viermi, troieni, ransomware, spyware și adware.

Viruși: Se atașează la fișiere legitime și se răspândesc când aceste fișiere sunt executate.

Viermi: Se auto-replică și se răspândesc prin rețele fără intervenția utilizatorului.

Troieni: Se deghizează ca software legitim, dar conțin cod malițios.

Ransomware: Criptează fișierele victimei și cere o răscumpărare pentru decriptare.

Spyware: Colectează informații despre utilizator fără cunoștința acestuia.`
          },
          {
            name: "🎣 Phishing",
            content: `Phishing-ul este o tehnică de inginerie socială folosită pentru a fura date sensibile ale utilizatorilor, cum ar fi informații de conectare și numere de carduri de credit.

Atacatorii se fac să pară că sunt o entitate de încredere într-o comunicare electronică.

Phishing-ul prin email este cel mai comun tip, unde atacatorii trimit emailuri care par să vină de la surse legitime.

Spear phishing vizează indivizi sau organizații specifice cu informații personalizate.

Whaling vizează executivi de rang înalt sau persoane importante din organizații.

Vishing (voice phishing) folosește apeluri telefonice pentru a obține informații sensibile.

Smishing folosește mesaje text pentru a păcăli victimele.`
          }
        ]
      }
    ],
    quiz: [
      {
        title: "Test Introducere în Securitate",
        totalPoints: 100,
        questions: [
          {
            question: "Ce reprezintă securitatea cibernetică?",
            options: [
              "Protejarea doar a calculatoarelor",
              "Protejarea sistemelor, rețelelor și programelor împotriva atacurilor digitale",
              "Instalarea de antivirus",
              "Folosirea parolelor"
            ],
            correctAns: "Protejarea sistemelor, rețelelor și programelor împotriva atacurilor digitale"
          },
          {
            question: "Care este costul estimat al criminalității cibernetice până în 2025?",
            options: [
              "1 trilion de dolari",
              "5 trilioane de dolari",
              "10,5 trilioane de dolari",
              "15 trilioane de dolari"
            ],
            correctAns: "10,5 trilioane de dolari"
          },
          {
            question: "Ce tip de malware criptează fișierele și cere răscumpărare?",
            options: [
              "Virus",
              "Troian",
              "Ransomware",
              "Spyware"
            ],
            correctAns: "Ransomware"
          },
          {
            question: "Ce este phishing-ul?",
            options: [
              "Un tip de malware",
              "O tehnică de inginerie socială pentru a fura date sensibile",
              "Un tip de firewall",
              "O metodă de criptare"
            ],
            correctAns: "O tehnică de inginerie socială pentru a fura date sensibile"
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Atacuri comune",
    description: "Învață despre cele mai frecvente tipuri de atacuri cibernetice",
    banner_image: "/banner3.png",
    achievementBadge: "Atacuri comune",
    chapters: [
      {
        title: "Atacuri asupra rețelelor",
        subsections: [
          {
            name: "🌐 Atacuri DDoS",
            content: `Un atac de tip Distributed Denial of Service (DDoS) încearcă să facă o resursă online indisponibilă prin inundarea acesteia cu trafic de la multiple surse.

Atacurile DDoS funcționează prin coordonarea mai multor sisteme compromise pentru a ataca o singură țintă.

Tipuri de atacuri DDoS includ atacuri volumetrice, atacuri de protocol și atacuri la nivelul aplicației.

Atacurile volumetrice încearcă să consume lățimea de bandă a țintei sau a infrastructurii din jurul acesteia.

Atacurile de protocol exploatează slăbiciuni în protocoalele de server pentru a epuiza resursele serverului.

Atacurile la nivelul aplicației vizează aplicații web prin inundarea acestora cu cereri aparent legitime.

Protecția împotriva atacurilor DDoS include folosirea CDN-urilor, filtrarea traficului și planificarea capacității.`
          },
          {
            name: "👤 Man-in-the-Middle",
            content: `Un atac Man-in-the-Middle (MitM) apare când un atacator se interpune secret între două părți care cred că comunică direct între ele.

Atacatorul poate intercepta, citi și modifica comunicarea între cele două părți fără ca acestea să știe.

Tipuri comune de atacuri MitM includ interceptarea Wi-Fi, spoofing-ul ARP și atacurile SSL stripping.

Interceptarea Wi-Fi se întâmplă când atacatorii creează puncte de acces false sau compromit rețele existente.

Spoofing-ul ARP permite atacatorilor să redirecționeze traficul prin sistemul lor.

SSL stripping forțează conexiunile să folosească HTTP în loc de HTTPS securizat.

Protecția include folosirea VPN-urilor, verificarea certificatelor SSL și evitarea rețelelor Wi-Fi publice nesecurizate.`
          }
        ]
      },
      {
        title: "Inginerie socială",
        subsections: [
          {
            name: "🎭 Tehnici de manipulare",
            content: `Ingineria socială este arta manipulării oamenilor pentru a divulga informații confidențiale sau a efectua acțiuni care compromit securitatea.

Atacatorii exploatează emoții umane precum frica, curiozitatea, graba și dorința de a ajuta.

Pretexting implică crearea unui scenariu fabricat pentru a angaja victima și a câștiga încrederea acesteia.

Baiting oferă ceva tentant pentru a stârni curiozitatea sau lăcomia victimei.

Quid pro quo oferă un serviciu sau beneficiu în schimbul informațiilor sau accesului.

Tailgating implică urmărirea unei persoane autorizate într-o zonă restricționată.

Protecția include educarea angajaților, verificarea identității și implementarea politicilor de securitate stricte.`
          },
          {
            name: "📞 Vishing și Smishing",
            content: `Vishing (voice phishing) folosește apeluri telefonice pentru a obține informații sensibile de la victime.

Atacatorii se pot face că sunt de la bănci, companii de asigurări sau agenții guvernamentale.

Smishing (SMS phishing) folosește mesaje text pentru a păcăli victimele să facă clic pe linkuri malițioase sau să divulge informații.

Mesajele de smishing apar adesea ca alerte de securitate urgente sau oferte speciale.

Ambele tehnici exploatează încrederea și urgența pentru a determina victimele să acționeze rapid.

Semnele de avertizare includ cereri neașteptate de informații, presiunea timpului și linkuri suspecte.

Protecția include verificarea independentă a identității apelantului și evitarea făcerii clic pe linkuri din mesaje nesolicitate.`
          }
        ]
      }
    ],
    quiz: [
      {
        title: "Test Atacuri Comune",
        totalPoints: 100,
        questions: [
          {
            question: "Ce înseamnă DDoS?",
            options: [
              "Direct Denial of Service",
              "Distributed Denial of Service",
              "Digital Denial of Service",
              "Dynamic Denial of Service"
            ],
            correctAns: "Distributed Denial of Service"
          },
          {
            question: "Ce este un atac Man-in-the-Middle?",
            options: [
              "Un atac care vizează serverele",
              "Un atac unde atacatorul se interpune între două părți care comunică",
              "Un atac asupra bazelor de date",
              "Un atac de tip malware"
            ],
            correctAns: "Un atac unde atacatorul se interpune între două părți care comunică"
          },
          {
            question: "Ce este vishing-ul?",
            options: [
              "Phishing prin email",
              "Phishing prin mesaje text",
              "Phishing prin apeluri telefonice",
              "Phishing prin rețele sociale"
            ],
            correctAns: "Phishing prin apeluri telefonice"
          },
          {
            question: "Care este scopul principal al ingineriei sociale?",
            options: [
              "Instalarea de malware",
              "Manipularea oamenilor pentru a divulga informații confidențiale",
              "Atacarea rețelelor",
              "Criptarea datelor"
            ],
            correctAns: "Manipularea oamenilor pentru a divulga informații confidențiale"
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Apărare și prevenție",
    description: "Strategii și tehnici pentru protejarea împotriva atacurilor cibernetice",
    banner_image: "/banner4.png",
    achievementBadge: "Apărare și prevenție",
    chapters: [
      {
        title: "Măsuri de securitate",
        subsections: [
          {
            name: "🔒 Autentificarea multi-factor",
            content: `Autentificarea multi-factor (MFA) adaugă un nivel suplimentar de securitate prin solicitarea a două sau mai multe metode de verificare.

Cele trei categorii principale de factori de autentificare sunt: ceva ce știi (parolă), ceva ce ai (telefon) și ceva ce ești (biometrie).

MFA reduce semnificativ riscul de compromitere a conturilor, chiar dacă parola este furată.

Tipuri comune de MFA includ coduri SMS, aplicații de autentificare, chei hardware și biometrie.

Aplicațiile de autentificare precum Google Authenticator sau Authy sunt mai sigure decât SMS-urile.

Cheile hardware oferă cel mai înalt nivel de securitate pentru conturile critice.

Implementarea MFA ar trebui să fie obligatorie pentru toate conturile administrative și cele care accesează date sensibile.`
          },
          {
            name: "🛡️ Firewall-uri și antivirus",
            content: `Un firewall acționează ca o barieră între rețeaua ta de încredere și rețelele nesigure din exterior.

Firewall-urile pot fi hardware, software sau o combinație a ambelor.

Firewall-urile de rețea filtrează traficul la nivelul rețelei, în timp ce firewall-urile de host protejează dispozitive individuale.

Software-ul antivirus detectează, previne și elimină malware-ul de pe sisteme.

Antivirus-ul modern folosește multiple tehnici: scanare bazată pe semnături, analiză comportamentală și învățare automată.

Actualizarea regulată a definițiilor de virus este crucială pentru eficacitatea antivirusului.

Soluțiile de securitate endpoint combină firewall, antivirus și alte tehnologii de protecție.`
          }
        ]
      },
      {
        title: "Politici de securitate",
        subsections: [
          {
            name: "📋 Dezvoltarea politicilor",
            content: `Politicile de securitate stabilesc regulile și procedurile pentru protejarea activelor informaționale ale organizației.

O politică de securitate eficace trebuie să fie clară, concisă și aplicabilă în practică.

Politicile trebuie să acopere toate aspectele securității: fizice, tehnice și administrative.

Componente cheie includ politica parolelor, politica accesului, politica utilizării internetului și politica dispozitivelor mobile.

Politicile trebuie să fie revizuite și actualizate regulat pentru a reflecta noile amenințări și tehnologii.

Formarea și educarea angajaților despre politici este la fel de importantă ca și crearea acestora.

Monitorizarea conformității și aplicarea consecințelor pentru încălcări sunt esențiale pentru eficacitatea politicilor.`
          },
          {
            name: "🎓 Educația utilizatorilor",
            content: `Educația în securitate cibernetică este prima linie de apărare împotriva atacurilor.

Programele de conștientizare trebuie să fie continue, nu evenimente unice.

Subiectele cheie includ recunoașterea phishing-ului, crearea parolelor sigure și raportarea incidentelor.

Simulările de phishing ajută la testarea și îmbunătățirea vigilenței angajaților.

Formarea trebuie adaptată la rolurile și responsabilitățile specifice ale fiecărui angajat.

Folosirea exemplelor din lumea reală și a studiilor de caz face formarea mai relevantă și memorabilă.

Măsurarea eficacității programelor de educație prin teste și metrici este crucială pentru îmbunătățire continuă.`
          }
        ]
      }
    ],
    quiz: [
      {
        title: "Test Apărare și Prevenție",
        totalPoints: 100,
        questions: [
          {
            question: "Ce înseamnă MFA?",
            options: [
              "Multi-Factor Authentication",
              "Multiple File Access",
              "Managed File Authentication",
              "Multi-Function Application"
            ],
            correctAns: "Multi-Factor Authentication"
          },
          {
            question: "Care sunt cele trei categorii principale de factori de autentificare?",
            options: [
              "Hardware, software, firmware",
              "Ceva ce știi, ceva ce ai, ceva ce ești",
              "Local, remote, cloud",
              "Public, private, hybrid"
            ],
            correctAns: "Ceva ce știi, ceva ce ai, ceva ce ești"
          },
          {
            question: "Ce rol are un firewall?",
            options: [
              "Detectează viruși",
              "Criptează datele",
              "Acționează ca o barieră între rețele",
              "Creează backup-uri"
            ],
            correctAns: "Acționează ca o barieră între rețele"
          },
          {
            question: "De ce este importantă educația utilizatorilor în securitate?",
            options: [
              "Pentru a reduce costurile IT",
              "Este prima linie de apărare împotriva atacurilor",
              "Pentru a îmbunătăți performanța sistemelor",
              "Pentru a respecta reglementările"
            ],
            correctAns: "Este prima linie de apărare împotriva atacurilor"
          }
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Cazuri reale",
    description: "Studii de caz ale unor atacuri cibernetice celebre și lecțiile învățate",
    banner_image: "/banner5.png",
    achievementBadge: "Cazuri reale",
    chapters: [
      {
        title: "Atacuri celebre",
        subsections: [
          {
            name: "🏢 Equifax (2017)",
            content: `Atacul asupra Equifax din 2017 a fost una dintre cele mai mari breșe de date din istorie, afectând 147 de milioane de persoane.

Atacatorii au exploatat o vulnerabilitate cunoscută în Apache Struts, un framework web popular.

Vulnerabilitatea fusese deja raportată și avea un patch disponibil, dar Equifax nu îl aplicase la timp.

Datele compromise includeau numere de securitate socială, date de naștere, adrese și, în unele cazuri, numere de permise de conducere.

Atacul a durat aproximativ 76 de zile înainte de a fi detectat.

Costurile totale pentru Equifax au depășit 4 miliarde de dolari, incluzând amenzi, procese și costuri de remediere.

Lecțiile învățate includ importanța gestionării patch-urilor, monitorizării continue și planurilor de răspuns la incidente.`
          },
          {
            name: "🏥 WannaCry (2017)",
            content: `WannaCry a fost un atac ransomware global care a infectat sute de mii de calculatoare în mai mult de 150 de țări.

Atacul a exploatat o vulnerabilitate în Windows care fusese descoperită de NSA și ulterior scăpată de hackeri.

Ransomware-ul cripta fișierele victimelor și cerea plata în Bitcoin pentru decriptare.

Sistemul de sănătate britanic (NHS) a fost grav afectat, cu anularea a mii de programări și operații.

Atacul s-a oprit când un cercetător în securitate a descoperit un "kill switch" în cod.

Multe organizații afectate foloseau versiuni vechi de Windows fără patch-urile de securitate necesare.

Incidentul a evidențiat importanța actualizărilor de securitate și a backup-urilor regulate.`
          }
        ]
      },
      {
        title: "Lecții învățate",
        subsections: [
          {
            name: "📊 Analiza impactului",
            content: `Analiza impactului atacurilor cibernetice revelă costurile reale ale neglijării securității.

Costurile directe includ pierderi financiare, amenzi de reglementare și costuri de remediere.

Costurile indirecte pot include deteriorarea reputației, pierderea clienților și scăderea valorii acțiunilor.

Timpul de recuperare poate varia de la zile la ani, în funcție de severitatea atacului.

Organizațiile mici sunt adesea mai vulnerabile și pot să nu supraviețuiască unui atac major.

Sectoarele critice precum sănătatea și energia pot avea impact asupra siguranței publice.

Investiția în securitate preventivă este întotdeauna mai ieftină decât costurile unui atac reușit.`
          },
          {
            name: "🔄 Îmbunătățiri necesare",
            content: `Atacurile din trecut oferă lecții valoroase pentru îmbunătățirea securității viitoare.

Gestionarea vulnerabilităților trebuie să fie proactivă, cu aplicarea rapidă a patch-urilor.

Planurile de răspuns la incidente trebuie testate și actualizate regulat.

Backup-urile trebuie să fie regulate, testate și stocate offline pentru protecție împotriva ransomware-ului.

Formarea angajaților trebuie să fie continuă și să includă simulări de atacuri.

Monitorizarea și detectarea trebuie îmbunătățite pentru identificarea rapidă a amenințărilor.

Colaborarea între organizații și cu autoritățile poate ajuta la prevenirea și răspunsul la atacuri.`
          }
        ]
      }
    ],
    quiz: [
      {
        title: "Test Cazuri Reale",
        totalPoints: 100,
        questions: [
          {
            question: "Câte persoane au fost afectate de atacul Equifax din 2017?",
            options: [
              "100 de milioane",
              "125 de milioane",
              "147 de milioane",
              "200 de milioane"
            ],
            correctAns: "147 de milioane"
          },
          {
            question: "Ce vulnerabilitate a exploatat atacul asupra Equifax?",
            options: [
              "O vulnerabilitate în Apache Struts",
              "O vulnerabilitate în Windows",
              "O vulnerabilitate în Java",
              "O vulnerabilitate în PHP"
            ],
            correctAns: "O vulnerabilitate în Apache Struts"
          },
          {
            question: "Ce tip de atac a fost WannaCry?",
            options: [
              "Phishing",
              "DDoS",
              "Ransomware",
              "Man-in-the-Middle"
            ],
            correctAns: "Ransomware"
          },
          {
            question: "Cum s-a oprit atacul WannaCry?",
            options: [
              "Prin actualizări de securitate",
              "Prin descoperirea unui kill switch",
              "Prin deconectarea de la internet",
              "Prin plata răscumpărării"
            ],
            correctAns: "Prin descoperirea unui kill switch"
          }
        ]
      }
    ]
  }
];