require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding started...");

  // Clear existing data
  await prisma.fieldUpdate.deleteMany({});
  await prisma.field.deleteMany({});
  await prisma.user.deleteMany({});

  // Hash passwords
  const adminPassword = await bcrypt.hash("AdminSmart123!", 10);
  const agentPassword = await bcrypt.hash("AgentSmart123!", 10);

  // Create Admin
  const admin = await prisma.user.create({
    data: {
      email: "smartseason@gmail.com",
      password: adminPassword,
      name: "SmartSeason Admin",
      role: "ADMIN",
    },
  });

  // Create Agent
  const agent = await prisma.user.create({
    data: {
      email: "agent@gmail.com",
      password: agentPassword,
      name: "Field Agent One",
      role: "AGENT",
    },
  });

  // Create Fields
  const fields = [
    {
      name: "North Valley Field",
      cropType: "Maize",
      plantingDate: new Date(Date.now() - 100 * 24 * 60 * 60 * 1000), // 100 days ago (Growing + >90 days = AT RISK)
      stage: "GROWING",
      assignedAgentId: agent.id,
    },
    {
      name: "East Slope",
      cropType: "Wheat",
      plantingDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago (Active)
      stage: "GROWING",
      assignedAgentId: agent.id,
    },
    {
      name: "River Side",
      cropType: "Soybeans",
      plantingDate: new Date(Date.now() - 130 * 24 * 60 * 60 * 1000), // 130 days ago (Ready + >120 days = AT RISK)
      stage: "READY",
      assignedAgentId: agent.id,
    },
    {
      name: "South Plateau",
      cropType: "Barley",
      plantingDate: new Date(Date.now() - 140 * 24 * 60 * 60 * 1000), // 140 days ago (Completed)
      stage: "HARVESTED",
      assignedAgentId: agent.id,
    },
    {
      name: "New Plot",
      cropType: "Corn",
      plantingDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago (Active)
      stage: "PLANTED",
      assignedAgentId: agent.id,
    }
  ];

  for (const fieldData of fields) {
    const field = await prisma.field.create({
      data: fieldData,
    });

    // Add an initial update
    await prisma.fieldUpdate.create({
      data: {
        fieldId: field.id,
        authorId: agent.id,
        note: `Initial planting/observation for ${field.name}`,
        stageAtUpdate: field.stage,
        createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), // 20 days ago 
      },
    });
  }

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
