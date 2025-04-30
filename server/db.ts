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
    const OrgOrgIncIncInfo = insertOrganization.run({ name: "OrgOrgIncInc" });
    const techSolutionsInfo = insertOrganization.run({ name: "Tech Solutions Inc." });
    const globalInnovationsInfo = insertOrganization.run({ name: "Global Innovations Ltd." });
    const pioneerMarketingInfo = insertOrganization.run({ name: "Pioneer Marketing Group" });
    const summitSoftwareInfo = insertOrganization.run({ name: "Summit Software Solutions" });
    const coastalFinancialInfo = insertOrganization.run({ name: "Coastal Financial Services" });
    const mountainViewRealEstateInfo = insertOrganization.run({ name: "Mountain View Real Estate" });

    (db as any).organizationsMap = { // Added to the db object for later use
      "OrgOrgIncInc": OrgOrgIncIncInfo.lastInsertRowid,
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
    const utahJazzInfo = insertAccount.run({ organization_id: (db as any).organizationsMap["OrgOrgIncInc"], name: "Utah Jazz" });
    const realSaltLakeInfo = insertAccount.run({ organization_id: (db as any).organizationsMap["OrgOrgIncInc"], name: "Real Salt Lake" });
    const vivintArenaInfo = insertAccount.run({ organization_id: (db as any).organizationsMap["OrgOrgIncInc"], name: "Vivint Arena" });
    const acmeCorpInfo = insertAccount.run({ organization_id: (db as any).organizationsMap["Tech Solutions Inc."], name: "Acme Corp" });
    const globexIndustriesInfo = insertAccount.run({ organization_id: (db as any).organizationsMap["Tech Solutions Inc."], name: "Globex Industries" });
    const wayneEnterprisesInfo = insertAccount.run({ organization_id: (db as any).organizationsMap["Tech Solutions Inc."], name: "Wayne Enterprises" });
    const utahSymphonyInfo = insertAccount.run({ organization_id: (db as any).organizationsMap["OrgOrgIncInc"], name: "Utah Symphony" });
    const tracyAviaryInfo = insertAccount.run({ organization_id: (db as any).organizationsMap["OrgOrgIncInc"], name: "Tracy Aviary" });
    const alphaTechInfo = insertAccount.run({ organization_id: (db as any).organizationsMap["Summit Software Solutions"], name: "Alpha Technologies" });
    const betaCorpInfo = insertAccount.run({ organization_id: (db as any).organizationsMap["Summit Software Solutions"], name: "Beta Corp" });
    const firstNationalBankInfo = insertAccount.run({ organization_id: (db as any).organizationsMap["Coastal Financial Services"], name: "First National Bank" });
    const aspenPropertyInfo = insertAccount.run({ organization_id: (db as any).organizationsMap["Mountain View Real Estate"], name: "Aspen Property Management" });
    const vailResortsInfo = insertAccount.run({ organization_id: (db as any).organizationsMap["Mountain View Real Estate"], name: "Vail Resorts" });
    const stellarisCorpInfo = insertAccount.run({ organization_id: (db as any).organizationsMap["Pioneer Marketing Group"], name: "Stellaris Corp" });

    (db as any).accountsMap = { // Added to the db object for later use
      "Utah Jazz": utahJazzInfo.lastInsertRowid,
      "Real Salt Lake": realSaltLakeInfo.lastInsertRowid,
      "Vivint Arena": vivintArenaInfo.lastInsertRowid,
      "Acme Corp": acmeCorpInfo.lastInsertRowid,
      "Globex Industries": globexIndustriesInfo.lastInsertRowid,
      "Wayne Enterprises": wayneEnterprisesInfo.lastInsertRowid,
      "Utah Symphony": utahSymphonyInfo.lastInsertRowid,
      "Tracy Aviary": tracyAviaryInfo.lastInsertRowid,
      "Alpha Technologies": alphaTechInfo.lastInsertRowid,
      "Beta Corp": betaCorpInfo.lastInsertRowid,
      "First National Bank": firstNationalBankInfo.lastInsertRowid,
      "Aspen Property Management": aspenPropertyInfo.lastInsertRowid,
      "Vail Resorts": vailResortsInfo.lastInsertRowid,
      "Stellaris Corp": stellarisCorpInfo.lastInsertRowid,
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
      status: "Build Proposal",
    });
    insertDeal.run({
      account_id: (db as any).accountsMap["Real Salt Lake"],
      name: "RSL Jersey Sponsorship 2025",
      start_date: "2025-03-01",
      end_date: "2025-11-30",
      value: 300000.00,
      status: "Build Proposal",
    });
    insertDeal.run({
      account_id: (db as any).accountsMap["Vivint Arena"],
      name: "Arena Naming Rights Extension",
      start_date: "2026-01-01",
      end_date: "2030-12-31",
      value: 2000000.00,
      status: "Pitch Proposal",
    });
    insertDeal.run({
      account_id: (db as any).accountsMap["Acme Corp"],
      name: "Acme Product Placement",
      start_date: "2025-05-01",
      end_date: "2025-12-31",
      value: 75000.00,
      status: "Negotiation",
    });
    insertDeal.run({
      account_id: (db as any).accountsMap["Globex Industries"],
      name: "Globex Event Sponsorship",
      start_date: "2025-09-15",
      end_date: "2025-09-15",
      value: 25000.00,
      status: "Negotiation",
    });
    insertDeal.run({
      account_id: (db as any).accountsMap["Wayne Enterprises"],
      name: "Wayne Tech Partnership Q3 2025",
      start_date: "2025-07-01",
      end_date: "2025-09-30",
      value: 150000.00,
      status: "Build Proposal",
    });
    insertDeal.run({
      account_id: (db as any).accountsMap["Utah Symphony"],
      name: "Symphony Season Sponsorship 2025-2026",
      start_date: "2025-09-01",
      end_date: "2026-05-31",
      value: 150000.00,
      status: "Build Proposal",
    });
    insertDeal.run({
      account_id: (db as any).accountsMap["Tracy Aviary"],
      name: "Educational Program Sponsorship",
      start_date: "2025-06-01",
      end_date: "2025-12-31",
      value: 40000.00,
      status: "Negotiation",
    });
    insertDeal.run({
      account_id: (db as any).accountsMap["Alpha Technologies"],
      name: "Software Integration Partnership",
      start_date: "2026-01-15",
      end_date: "2026-12-31",
      value: 600000.00,
      status: "Negotiation",
    });
    insertDeal.run({
      account_id: (db as any).accountsMap["Beta Corp"],
      name: "Joint Marketing Campaign",
      start_date: "2025-08-01",
      end_date: "2025-11-30",
      value: 120000.00,
      status: "Build Proposal",
    });
    insertDeal.run({
      account_id: (db as any).accountsMap["First National Bank"],
      name: "Community Outreach Program",
      start_date: "2025-07-01",
      end_date: "2026-06-30",
      value: 180000.00,
      status: "Build Proposal",
    });
    insertDeal.run({
      account_id: (db as any).accountsMap["Aspen Property Management"],
      name: "Summer Festival Sponsorship",
      start_date: "2025-06-15",
      end_date: "2025-08-31",
      value: 50000.00,
      status: "Negotiation",
    });
    insertDeal.run({
      account_id: (db as any).accountsMap["Vail Resorts"],
      name: "Winter Season Partnership",
      start_date: "2025-12-01",
      end_date: "2026-04-30",
      value: 350000.00,
      status: "Negotiation",
    });
    insertDeal.run({
      account_id: (db as any).accountsMap["Stellaris Corp"],
      name: "Strategic Alliance Initiative",
      start_date: "2025-10-01",
      end_date: "2026-09-30",
      value: 1200000.00,
      status: "Pitch Proposal",
    });
    insertDeal.run({
      account_id: (db as any).accountsMap["Utah Jazz"], // Example of another deal for an existing account
      name: "Jazz Halftime Show Sponsorship 2025-2026",
      start_date: "2025-07-01",
      end_date: "2026-06-30",
      value: 200000.00,
      status: "Build Proposal",
    });
  } else {
    console.log("Deals table already has data. Skipping initial insertion.");
  }

  return db;
}

export default initializeDatabase;