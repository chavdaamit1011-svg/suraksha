import { connectToDatabase } from './db';
import { User } from './models/User';
import { Guard } from './models/Guard';
import { Tender } from './models/Tender';
import { Incident } from './models/Incident';
import { Asset } from './models/Asset';
import { Lead } from './models/Lead';
import { SupportTicket } from './models/SupportTicket';

export async function seedDatabase() {
  await connectToDatabase();

  // 1. Super Admin User
  const adminEmail = 'chavdaamit1011@gmail.com';
  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    await User.create({
      name: 'Amit Chavda (Super Admin)',
      email: adminEmail,
      phone: '+91 98765 43210',
      password: 'Pass@1234', // Pre-seeded pass
      role: 'superadmin',
      designation: 'Managing Director & Chief Admin',
      company: 'SURAKSHA Security Operations Corp',
      isActive: true,
      plan: 'Enterprise Ultimate',
      paymentMethod: 'Razorpay Corporate Account',
      deviceSessions: [
        {
          deviceId: 'DEV-SUR-001',
          deviceName: 'Windows 11 Workstation (Chrome)',
          ip: '192.168.1.45',
          location: 'Suraksha Command Center, Sector 62',
          lastActive: new Date(),
        },
        {
          deviceId: 'DEV-SUR-002',
          deviceName: 'iPhone 15 Pro (Suraksha Admin App)',
          ip: '103.22.45.12',
          location: 'New Delhi HQ',
          lastActive: new Date(),
        },
      ],
    });
    console.log('Seeded Super Admin: chavdaamit1011@gmail.com');
  }

  // 2. Guards Seed
  const countGuards = await Guard.countDocuments();
  if (countGuards === 0) {
    await Guard.insertMany([
      {
        guardId: 'SUR-G8841',
        name: 'Vikram Singh',
        phone: '+91 98112 00112',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
        status: 'On Duty',
        onlineStatus: 'Online',
        agency: 'Suraksha Main Command',
        assignedSite: 'TechPark Alpha - Tower B',
        currentLocation: { lat: 28.6139, lng: 77.209, address: 'TechPark Sector 62, Noida' },
        assetsAllocated: ['Body Cam 4K #88', 'Long-Range Radio #12', 'Bulletproof Vest V2'],
        badges: ['Govt Certified', 'Fire Safety Specialist', 'VIP Escort'],
        trainingCompleted: true,
        experienceYears: 5,
      },
      {
        guardId: 'SUR-G8842',
        name: 'Rajesh Kumar',
        phone: '+91 98112 00113',
        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300',
        status: 'Active',
        onlineStatus: 'Online',
        agency: 'Suraksha Allied Agency',
        assignedSite: 'Metro Heights Mall',
        currentLocation: { lat: 28.5355, lng: 77.391, address: 'Metro Station Plaza, Gate 3' },
        assetsAllocated: ['Metal Detector Wand', 'Heavy Tactical Flashlight'],
        badges: ['Crowd Control', 'Govt Certified'],
        trainingCompleted: true,
        experienceYears: 4,
      },
      {
        guardId: 'SUR-G8843',
        name: 'Sunil Sharma',
        phone: '+91 98112 00114',
        photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300',
        status: 'On Patrol',
        onlineStatus: 'Online',
        agency: 'Suraksha Main Command',
        assignedSite: 'Apex Industrial Estate',
        currentLocation: { lat: 28.7041, lng: 77.1025, address: 'Perimeter Checkpoint 4, Apex Park' },
        assetsAllocated: ['Patrol GPS Tablet', 'Smart Baton'],
        badges: ['Night Patrol Lead', 'Govt Certified'],
        trainingCompleted: true,
        experienceYears: 7,
      },
      {
        guardId: 'SUR-G8844',
        name: 'Mahesh Verma',
        phone: '+91 98112 00115',
        photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300',
        status: 'Inactive',
        onlineStatus: 'Offline',
        agency: 'Suraksha Allied Agency',
        assignedSite: 'Unassigned',
        currentLocation: { lat: 28.62, lng: 77.21, address: 'Standby Barracks' },
        assetsAllocated: [],
        badges: ['Govt Certified'],
        trainingCompleted: false,
        experienceYears: 1,
      },
    ]);
    console.log('Seeded initial guards roster.');
  }

  // 3. Tenders Seed
  const countTenders = await Tender.countDocuments();
  if (countTenders === 0) {
    await Tender.insertMany([
      {
        tenderId: 'TND-2026-001',
        title: 'Global Tech Park 2-Year Full Security & Access Control Tender',
        clientCompany: 'Global Tech Park Ltd',
        durationYears: 2,
        guardsRequired: 45,
        annualValue: '₹ 1.48 Crore / Year',
        status: 'Active',
        startDate: new Date('2026-01-01'),
        endDate: new Date('2027-12-31'),
      },
      {
        tenderId: 'TND-2026-002',
        title: 'Central Logistics & Warehousing 1-Year Perimeter Guard Tender',
        clientCompany: 'Express Logistics Corp',
        durationYears: 1,
        guardsRequired: 20,
        annualValue: '₹ 62 Lakhs / Year',
        status: 'Active',
        startDate: new Date('2026-03-15'),
        endDate: new Date('2027-03-14'),
      },
    ]);
  }

  // 4. Assets Seed
  const countAssets = await Asset.countDocuments();
  if (countAssets === 0) {
    await Asset.insertMany([
      { assetId: 'AST-BC-101', name: '4K Tactical Body Camera', category: 'Surveillance', status: 'In Use', assignedToGuard: 'Vikram Singh (SUR-G8841)', serialNumber: 'BC4K-9901' },
      { assetId: 'AST-WT-204', name: 'Long Range UHF Walkie Talkie', category: 'Communication', status: 'In Use', assignedToGuard: 'Vikram Singh (SUR-G8841)', serialNumber: 'WT-884' },
      { assetId: 'AST-MD-309', name: 'Handheld Metal Detector Wand', category: 'Tactical Gear', status: 'In Use', assignedToGuard: 'Rajesh Kumar (SUR-G8842)', serialNumber: 'MD-551' },
      { assetId: 'AST-VT-401', name: 'Kevlar Reinforced Tactical Vest', category: 'Armor & Uniform', status: 'Available', assignedToGuard: 'Unassigned', serialNumber: 'VEST-09' },
    ]);
  }

  // 5. Incident Seed
  const countIncidents = await Incident.countDocuments();
  if (countIncidents === 0) {
    await Incident.insertMany([
      {
        incidentId: 'INC-2026-881',
        title: 'Unauthorized Parking Gate Access Attempt',
        site: 'Metro Heights Mall Gate 2',
        severity: 'Medium',
        status: 'Resolved',
        reportedBy: 'Rajesh Kumar (SUR-G8842)',
        description: 'Driver tried forcing entry without valid pass. Guard intervened and registered vehicle details.',
      },
    ]);
  }

  // 6. Lead Seed
  const countLeads = await Lead.countDocuments();
  if (countLeads === 0) {
    await Lead.insertMany([
      {
        leadId: 'LED-2026-101',
        clientName: 'Sunrise Hospitals & Care',
        contactPerson: 'Dr. R. K. Mehta',
        phone: '+91 98990 11223',
        email: 'admin@sunrisehospitals.com',
        source: 'Call',
        leadType: 'B2B Tender',
        status: 'Proposal Sent',
        salesRep: 'Amit Chavda (Sales Lead)',
        notes: 'Requested 15 guards for 24/7 hospital emergency gate coverage.',
      },
    ]);
  }
}
