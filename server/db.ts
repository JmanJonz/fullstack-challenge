import Database from "better-sqlite3";

interface CountResult {
  'COUNT(*)': number;
}

function initializeDatabase() {
  const db = new Database("./database.sqlite", { verbose: console.log });

  // Create organizations table and insert initial data if empty
  db.prepare(
    `
      CREATE TABLE IF NOT EXISTS organizations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `
  ).run();

  const organizationCountResult = db.prepare("SELECT COUNT(*) FROM organizations;").get() as CountResult;
  if (organizationCountResult['COUNT(*)'] === 0) {
    const insertOrganization = db.prepare(
      `
        INSERT INTO organizations (name) VALUES (:name);
      `
    );
    const sponsorCXInfo = insertOrganization.run({ name: "SponsorCX" });
    const techSolutionsInfo = insertOrganization.run({ name: "Tech Solutions Inc." });
    const globalInnovationsInfo = insertOrganization.run({ name: "Global Innovations Ltd." });
    const pioneerMarketingInfo = insertOrganization.run({ name: "Pioneer Marketing Group" });
    const summitSoftwareInfo = insertOrganization.run({ name: "Summit Software Solutions" });
    const coastalFinancialInfo = insertOrganization.run({ name: "Coastal Financial Services" });
    const mountainViewRealEstateInfo = insertOrganization.run({ name: "Mountain View Real Estate" });

    (db as any).organizationsMap = { // Added to the db object for later use
      "SponsorCX": sponsorCXInfo.lastInsertRowid,
      "Tech Solutions Inc.": techSolutionsInfo.lastInsertRowid,
      "Global Innovations Ltd.": globalInnovationsInfo.lastInsertRowid,
      "Pioneer Marketing Group": pioneerMarketingInfo.lastInsertRowid,
      "Summit Software Solutions": summitSoftwareInfo.lastInsertRowid,
      "Coastal Financial Services": coastalFinancialInfo.lastInsertRowid,
      "Mountain View Real Estate": mountainViewRealEstateInfo.lastInsertRowid,
    };
  } else {
    console.log("Organizations table already has data. Skipping initial insertion.");
    const existingOrganizations = db.prepare("SELECT id, name FROM organizations;").all() as { id: number; name: string }[];
    (db as any).organizationsMap = {};
    existingOrganizations.forEach(org => (db as any).organizationsMap[org.name] = org.id);
  }

  // Create accounts table and insert initial data if empty
  db.prepare(
    `
      CREATE TABLE IF NOT EXISTS accounts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        organization_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (organization_id) REFERENCES organizations(id)
      );
    `
  ).run();

  const accountCountResult = db.prepare("SELECT COUNT(*) FROM accounts;").get() as CountResult;
  if (accountCountResult['COUNT(*)'] === 0) {
    const insertAccount = db.prepare(
      `
        INSERT INTO accounts (organization_id, name) VALUES (:organization_id, :name);
      `
    );
    insertAccount.run({ organization_id: (db as any).organizationsMap["SponsorCX"], name: "Utah Jazz" });
    insertAccount.run({ organization_id: (db as any).organizationsMap["SponsorCX"], name: "Real Salt Lake" });
    insertAccount.run({ organization_id: (db as any).organizationsMap["SponsorCX"], name: "Vivint Arena" });
    insertAccount.run({ organization_id: (db as any).organizationsMap["Tech Solutions Inc."], name: "Acme Corp" });
    insertAccount.run({ organization_id: (db as any).organizationsMap["Tech Solutions Inc."], name: "Globex Industries" });
    insertAccount.run({ organization_id: (db as any).organizationsMap["Tech Solutions Inc."], name: "Wayne Enterprises" });
    insertAccount.run({ organization_id: (db as any).organizationsMap["SponsorCX"], name: "Utah Symphony" });
    insertAccount.run({ organization_id: (db as any).organizationsMap["SponsorCX"], name: "Tracy Aviary" });
    insertAccount.run({ organization_id: (db as any).organizationsMap["Summit Software Solutions"], name: "Alpha Technologies" });
    insertAccount.run({ organization_id: (db as any).organizationsMap["Summit Software Solutions"], name: "Beta Corp" });
    insertAccount.run({ organization_id: (db as any).organizationsMap["Coastal Financial Services"], name: "First National Bank" });
    insertAccount.run({ organization_id: (db as any).organizationsMap["Mountain View Real Estate"], name: "Aspen Property Management" });
    insertAccount.run({ organization_id: (db as any).organizationsMap["Mountain View Real Estate"], name: "Vail Resorts" });
    insertAccount.run({ organization_id: (db as any).organizationsMap["Pioneer Marketing Group"], name: "Stellaris Corp" });

    const utahJazzInfo = db.prepare("SELECT id FROM accounts WHERE name = 'Utah Jazz'").get() as { id: number } | undefined;
    const realSaltLakeInfo = db.prepare("SELECT id FROM accounts WHERE name = 'Real Salt Lake'").get() as { id: number } | undefined;
    const vivintArenaInfo = db.prepare("SELECT id FROM accounts WHERE name = 'Vivint Arena'").get() as { id: number } | undefined;
    const acmeCorpInfo = db.prepare("SELECT id FROM accounts WHERE name = 'Acme Corp'").get() as { id: number } | undefined;
    const globexIndustriesInfo = db.prepare("SELECT id FROM accounts WHERE name = 'Globex Industries'").get() as { id: number } | undefined;
    const wayneEnterprisesInfo = db.prepare("SELECT id FROM accounts WHERE name = 'Wayne Enterprises'").get() as { id: number } | undefined;
    const utahSymphonyInfo = db.prepare("SELECT id FROM accounts WHERE name = 'Utah Symphony'").get() as { id: number } | undefined;
    const tracyAviaryInfo = db.prepare("SELECT id FROM accounts WHERE name = 'Tracy Aviary'").get() as { id: number } | undefined;
    const alphaTechInfo = db.prepare("SELECT id FROM accounts WHERE name = 'Alpha Technologies'").get() as { id: number } | undefined;
    const betaCorpInfo = db.prepare("SELECT id FROM accounts WHERE name = 'Beta Corp'").get() as { id: number } | undefined;
    const firstNationalBankInfo = db.prepare("SELECT id FROM accounts WHERE name = 'First National Bank'").get() as { id: number } | undefined;
    const aspenPropertyInfo = db.prepare("SELECT id FROM accounts WHERE name = 'Aspen Property Management'").get() as { id: number } | undefined;
    const vailResortsInfo = db.prepare("SELECT id FROM accounts WHERE name = 'Vail Resorts'").get() as { id: number } | undefined;
    const stellarisCorpInfo = db.prepare("SELECT id FROM accounts WHERE name = 'Stellaris Corp'").get() as { id: number } | undefined;

    (db as any).accountsMap = { // Added to the db object for later use
      "Utah Jazz": utahJazzInfo?.id,
      "Real Salt Lake": realSaltLakeInfo?.id,
      "Vivint Arena": vivintArenaInfo?.id,
      "Acme Corp": acmeCorpInfo?.id,
      "Globex Industries": globexIndustriesInfo?.id,
      "Wayne Enterprises": wayneEnterprisesInfo?.id,
      "Utah Symphony": utahSymphonyInfo?.id,
      "Tracy Aviary": tracyAviaryInfo?.id,
      "Alpha Technologies": alphaTechInfo?.id,
      "Beta Corp": betaCorpInfo?.id,
      "First National Bank": firstNationalBankInfo?.id,
      "Aspen Property Management": aspenPropertyInfo?.id,
      "Vail Resorts": vailResortsInfo?.id,
      "Stellaris Corp": stellarisCorpInfo?.id,
    };
  } else {
    console.log("Accounts table already has data. Skipping initial insertion.");
    const existingAccounts = db.prepare("SELECT id, name FROM accounts;").all() as { id: number; name: string }[];
    (db as any).accountsMap = {};
    existingAccounts.forEach(account => (db as any).accountsMap[account.name] = account.id);
  }

  // Create deals table and insert initial data if empty
  db.prepare(
    `
      CREATE TABLE IF NOT EXISTS deals (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        account_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        start_date DATETIME,
        end_date DATETIME,
        value REAL,
        status TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (account_id) REFERENCES accounts(id)
      );
    `
  ).run();

  const dealCountResult = db.prepare("SELECT COUNT(*) FROM deals;").get() as CountResult;
  if (dealCountResult['COUNT(*)'] === 0) {
    const insertDeal = db.prepare(
      `
        INSERT INTO deals (account_id, name, start_date, end_date, value, status)
        VALUES (:account_id, :name, :start_date, :end_date, :value, :status);
      `
    );
    insertDeal.run({
      account_id: (db as any).accountsMap["Utah Jazz"],
      name: "Jazz Sponsorship 2025-2026",
      start_date: "2025-07-01",
      end_date: "2026-06-30",
      value: 500000.00,
      status: "Active",
    });
    insertDeal.run({
      account_id: (db as any).accountsMap["Real Salt Lake"],
      name: "RSL Jersey Sponsorship 2025",
      start_date: "2025-03-01",
      end_date: "2025-11-30",
      value: 300000.00,
      status: "Active",
    });
    insertDeal.run({
      account_id: (db as any).accountsMap["Vivint Arena"],
      name: "Arena Naming Rights Extension",
      start_date: "2026-01-01",
      end_date: "2030-12-31",
      value: 2000000.00,
      status: "Negotiating",
    });
    insertDeal.run({
      account_id: (db as any).accountsMap["Acme Corp"],
      name: "Acme Product Placement",
      start_date: "2025-05-01",
      end_date: "2025-12-31",
      value: 75000.00,
      status: "Pending",
    });
    insertDeal.run({
      account_id: (db as any).accountsMap["Globex Industries"],
      name: "Globex Event Sponsorship",
      start_date: "2025-09-15",
      end_date: "2025-09-15",
      value: 25000.00,
      status: "Closed Won",
    });
    insertDeal.run({
      account_id: (db as any).accountsMap["Wayne Enterprises"],
      name: "Wayne Tech Partnership Q3 2025",
      start_date: "2025-07-01",
      end_date: "2025-09-30",
      value: 150000.00,
      status: "Active",
    });
    insertDeal.run({
      account_id: (db as any).accountsMap["Utah Symphony"],
      name: "Symphony Season Sponsorship 2025-2026",
      start_date: "2025-09-01",
      end_date: "2026-05-31",
      value: 150000.00,
      status: "Active",
    });
    insertDeal.run({
      account_id: (db as any).accountsMap["Tracy Aviary"],
      name: "Educational Program Sponsorship",
      start_date: "2025-06-01",
      end_date: "2025-12-31",
      value: 40000.00,
      status: "Pending",
    });
    insertDeal.run({
      account_id: (db as any).accountsMap["Alpha Technologies"],
      name: "Software Integration Partnership",
      start_date: "2026-01-15",
      end_date: "2026-12-31",
      value: 600000.00,
      status: "Prospecting",
    });
    insertDeal.run({
      account_id: (db as any).accountsMap["Beta Corp"],
      name: "Joint Marketing Campaign",
      start_date: "2025-08-01",
      end_date: "2025-11-30",
      value: 120000.00,
      status: "Active",
    });
    insertDeal.run({
      account_id: (db as any).accountsMap["First National Bank"],
      name: "Community Outreach Program",
      start_date: "2025-07-01",
      end_date: "2026-06-30",
      value: 180000.00,
      status: "Active",
    });
    insertDeal.run({
      account_id: (db as any).accountsMap["Aspen Property Management"],
      name: "Summer Festival Sponsorship",
      start_date: "2025-06-15",
      end_date: "2025-08-31",
      value: 50000.00,
      status: "Closed Won",
    });
    insertDeal.run({
      account_id: (db as any).accountsMap["Vail Resorts"],
      name: "Winter Season Partnership",
      start_date: "2025-12-01",
      end_date: "2026-04-30",
      value: 350000.00,
      status: "Prospecting",
    });
    insertDeal.run({
      account_id: (db as any).accountsMap["Stellaris Corp"],
      name: "Strategic Alliance Initiative",
      start_date: "2025-10-01",
      end_date: "2026-09-30",
      value: 1200000.00,
      status: "Negotiating",
    });
    insertDeal.run({
      account_id: (db as any).accountsMap["Utah Jazz"], // Example of another deal for an existing account
      name: "Jazz Halftime Show Sponsorship 2025-2026",
      start_date: "2025-07-01",
      end_date: "2026-06-30",
      value: 200000.00,
      status: "Active",
    });
  } else {
    console.log("Deals table already has data. Skipping initial insertion.");
  }

  return db;
}

export default initializeDatabase;