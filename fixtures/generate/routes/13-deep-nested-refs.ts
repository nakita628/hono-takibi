import { createRoute, z } from '@hono/zod-openapi'

const AuditUserSchema = z
  .object({
    id: z.uuid().optional().openapi({ type: 'string', format: 'uuid' }),
    name: z.string().optional().openapi({ type: 'string' }),
    email: z.email().optional().openapi({ type: 'string', format: 'email' }),
  })
  .openapi({
    type: 'object',
    properties: {
      id: { type: 'string', format: 'uuid' },
      name: { type: 'string' },
      email: { type: 'string', format: 'email' },
    },
  })
  .openapi('AuditUser')

const TagSchema = z
  .object({
    key: z.string().openapi({ type: 'string' }),
    value: z.string().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    required: ['key', 'value'],
    properties: { key: { type: 'string' }, value: { type: 'string' } },
  })
  .openapi('Tag')

const EntityMetadataSchema = z
  .object({
    createdAt: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
    updatedAt: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
    createdBy: AuditUserSchema.optional(),
    updatedBy: AuditUserSchema.optional(),
    version: z.int().optional().openapi({ type: 'integer' }),
    tags: z
      .array(TagSchema)
      .optional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/Tag' } }),
  })
  .openapi({
    type: 'object',
    properties: {
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
      createdBy: { $ref: '#/components/schemas/AuditUser' },
      updatedBy: { $ref: '#/components/schemas/AuditUser' },
      version: { type: 'integer' },
      tags: { type: 'array', items: { $ref: '#/components/schemas/Tag' } },
    },
  })
  .openapi('EntityMetadata')

const PhoneNumberSchema = z
  .object({
    countryCode: z
      .string()
      .regex(/^\+[1-9]\d{0,2}$/)
      .openapi({ type: 'string', pattern: '^\\+[1-9]\\d{0,2}$' }),
    number: z.string().openapi({ type: 'string' }),
    extension: z.string().optional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    required: ['countryCode', 'number'],
    properties: {
      countryCode: { type: 'string', pattern: '^\\+[1-9]\\d{0,2}$' },
      number: { type: 'string' },
      extension: { type: 'string' },
    },
  })
  .openapi('PhoneNumber')

const CountrySchema = z
  .object({
    code: z
      .string()
      .regex(/^[A-Z]{2}$/)
      .openapi({ type: 'string', pattern: '^[A-Z]{2}$' }),
    name: z.string().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    required: ['code', 'name'],
    properties: { code: { type: 'string', pattern: '^[A-Z]{2}$' }, name: { type: 'string' } },
  })
  .openapi('Country')

const GeoCoordinatesSchema = z
  .object({
    latitude: z
      .number()
      .min(-90)
      .max(90)
      .openapi({ type: 'number', format: 'double', minimum: -90, maximum: 90 }),
    longitude: z
      .number()
      .min(-180)
      .max(180)
      .openapi({ type: 'number', format: 'double', minimum: -180, maximum: 180 }),
  })
  .openapi({
    type: 'object',
    required: ['latitude', 'longitude'],
    properties: {
      latitude: { type: 'number', format: 'double', minimum: -90, maximum: 90 },
      longitude: { type: 'number', format: 'double', minimum: -180, maximum: 180 },
    },
  })
  .openapi('GeoCoordinates')

const AddressSchema = z
  .object({
    street: z.string().optional().openapi({ type: 'string' }),
    city: z.string().optional().openapi({ type: 'string' }),
    state: z.string().optional().openapi({ type: 'string' }),
    postalCode: z.string().optional().openapi({ type: 'string' }),
    country: CountrySchema.optional(),
    coordinates: GeoCoordinatesSchema.optional(),
  })
  .openapi({
    type: 'object',
    properties: {
      street: { type: 'string' },
      city: { type: 'string' },
      state: { type: 'string' },
      postalCode: { type: 'string' },
      country: { $ref: '#/components/schemas/Country' },
      coordinates: { $ref: '#/components/schemas/GeoCoordinates' },
    },
  })
  .openapi('Address')

const EmergencyContactSchema = z
  .object({
    name: z.string().openapi({ type: 'string' }),
    relationship: z.string().openapi({ type: 'string' }),
    phone: PhoneNumberSchema,
    address: AddressSchema.optional(),
  })
  .openapi({
    type: 'object',
    required: ['name', 'relationship', 'phone'],
    properties: {
      name: { type: 'string' },
      relationship: { type: 'string' },
      phone: { $ref: '#/components/schemas/PhoneNumber' },
      address: { $ref: '#/components/schemas/Address' },
    },
  })
  .openapi('EmergencyContact')

const PersonalInfoSchema = z
  .object({
    firstName: z.string().openapi({ type: 'string' }),
    lastName: z.string().openapi({ type: 'string' }),
    email: z.email().openapi({ type: 'string', format: 'email' }),
    phone: PhoneNumberSchema.optional(),
    address: AddressSchema.optional(),
    emergencyContact: EmergencyContactSchema.optional(),
  })
  .openapi({
    type: 'object',
    required: ['firstName', 'lastName', 'email'],
    properties: {
      firstName: { type: 'string' },
      lastName: { type: 'string' },
      email: { type: 'string', format: 'email' },
      phone: { $ref: '#/components/schemas/PhoneNumber' },
      address: { $ref: '#/components/schemas/Address' },
      emergencyContact: { $ref: '#/components/schemas/EmergencyContact' },
    },
  })
  .openapi('PersonalInfo')

const EmploymentStatusSchema = z
  .enum(['active', 'on_leave', 'terminated', 'retired'])
  .openapi({ type: 'string', enum: ['active', 'on_leave', 'terminated', 'retired'] })
  .openapi('EmploymentStatus')

const JobLevelSchema = z
  .object({
    code: z.string().openapi({ type: 'string' }),
    name: z.string().openapi({ type: 'string' }),
    rank: z.int().min(1).max(10).openapi({ type: 'integer', minimum: 1, maximum: 10 }),
  })
  .openapi({
    type: 'object',
    required: ['code', 'name', 'rank'],
    properties: {
      code: { type: 'string' },
      name: { type: 'string' },
      rank: { type: 'integer', minimum: 1, maximum: 10 },
    },
  })
  .openapi('JobLevel')

const PositionSchema = z
  .object({
    title: z.string().openapi({ type: 'string' }),
    level: JobLevelSchema,
    department: z.string().optional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    required: ['title', 'level'],
    properties: {
      title: { type: 'string' },
      level: { $ref: '#/components/schemas/JobLevel' },
      department: { type: 'string' },
    },
  })
  .openapi('Position')

const CurrencySchema = z
  .object({
    code: z
      .string()
      .regex(/^[A-Z]{3}$/)
      .openapi({ type: 'string', pattern: '^[A-Z]{3}$' }),
    symbol: z.string().optional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    required: ['code'],
    properties: { code: { type: 'string', pattern: '^[A-Z]{3}$' }, symbol: { type: 'string' } },
  })
  .openapi('Currency')

const MoneySchema = z
  .object({
    amount: z.number().openapi({ type: 'number', format: 'double' }),
    currency: CurrencySchema,
  })
  .openapi({
    type: 'object',
    required: ['amount', 'currency'],
    properties: {
      amount: { type: 'number', format: 'double' },
      currency: { $ref: '#/components/schemas/Currency' },
    },
  })
  .openapi('Money')

const DurationSchema = z
  .object({
    value: z.int().openapi({ type: 'integer' }),
    unit: z
      .enum(['days', 'weeks', 'months', 'years'])
      .openapi({ type: 'string', enum: ['days', 'weeks', 'months', 'years'] }),
  })
  .openapi({
    type: 'object',
    required: ['value', 'unit'],
    properties: {
      value: { type: 'integer' },
      unit: { type: 'string', enum: ['days', 'weeks', 'months', 'years'] },
    },
  })
  .openapi('Duration')

const VestingScheduleSchema = z
  .object({
    cliff: DurationSchema.optional(),
    totalPeriod: DurationSchema.optional(),
    frequency: z
      .enum(['monthly', 'quarterly', 'annually'])
      .optional()
      .openapi({ type: 'string', enum: ['monthly', 'quarterly', 'annually'] }),
  })
  .openapi({
    type: 'object',
    properties: {
      cliff: { $ref: '#/components/schemas/Duration' },
      totalPeriod: { $ref: '#/components/schemas/Duration' },
      frequency: { type: 'string', enum: ['monthly', 'quarterly', 'annually'] },
    },
  })
  .openapi('VestingSchedule')

const EquityGrantSchema = z
  .object({
    shares: z.int().optional().openapi({ type: 'integer' }),
    vestingSchedule: VestingScheduleSchema.optional(),
    grantDate: z.iso.date().optional().openapi({ type: 'string', format: 'date' }),
  })
  .openapi({
    type: 'object',
    properties: {
      shares: { type: 'integer' },
      vestingSchedule: { $ref: '#/components/schemas/VestingSchedule' },
      grantDate: { type: 'string', format: 'date' },
    },
  })
  .openapi('EquityGrant')

const SocialMediaLinkSchema = z
  .object({
    platform: z
      .enum(['linkedin', 'twitter', 'facebook', 'instagram'])
      .openapi({ type: 'string', enum: ['linkedin', 'twitter', 'facebook', 'instagram'] }),
    url: z.url().openapi({ type: 'string', format: 'uri' }),
  })
  .openapi({
    type: 'object',
    required: ['platform', 'url'],
    properties: {
      platform: { type: 'string', enum: ['linkedin', 'twitter', 'facebook', 'instagram'] },
      url: { type: 'string', format: 'uri' },
    },
  })
  .openapi('SocialMediaLink')

const ContactInfoSchema = z
  .object({
    email: z.email().optional().openapi({ type: 'string', format: 'email' }),
    phone: PhoneNumberSchema.optional(),
    website: z.url().optional().openapi({ type: 'string', format: 'uri' }),
    socialMedia: z
      .array(SocialMediaLinkSchema)
      .optional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/SocialMediaLink' } }),
  })
  .openapi({
    type: 'object',
    properties: {
      email: { type: 'string', format: 'email' },
      phone: { $ref: '#/components/schemas/PhoneNumber' },
      website: { type: 'string', format: 'uri' },
      socialMedia: { type: 'array', items: { $ref: '#/components/schemas/SocialMediaLink' } },
    },
  })
  .openapi('ContactInfo')

const BenefitProviderSchema = z
  .object({ name: z.string().openapi({ type: 'string' }), contact: ContactInfoSchema.optional() })
  .openapi({
    type: 'object',
    required: ['name'],
    properties: { name: { type: 'string' }, contact: { $ref: '#/components/schemas/ContactInfo' } },
  })
  .openapi('BenefitProvider')

const CoverageSchema = z
  .object({
    level: z
      .enum(['individual', 'family'])
      .optional()
      .openapi({ type: 'string', enum: ['individual', 'family'] }),
    deductible: MoneySchema.optional(),
    maxBenefit: MoneySchema.optional(),
  })
  .openapi({
    type: 'object',
    properties: {
      level: { type: 'string', enum: ['individual', 'family'] },
      deductible: { $ref: '#/components/schemas/Money' },
      maxBenefit: { $ref: '#/components/schemas/Money' },
    },
  })
  .openapi('Coverage')

const BenefitSchema = z
  .object({
    type: z
      .enum(['health', 'dental', 'vision', 'life', 'retirement'])
      .openapi({ type: 'string', enum: ['health', 'dental', 'vision', 'life', 'retirement'] }),
    provider: BenefitProviderSchema,
    coverage: CoverageSchema.optional(),
  })
  .openapi({
    type: 'object',
    required: ['type', 'provider'],
    properties: {
      type: { type: 'string', enum: ['health', 'dental', 'vision', 'life', 'retirement'] },
      provider: { $ref: '#/components/schemas/BenefitProvider' },
      coverage: { $ref: '#/components/schemas/Coverage' },
    },
  })
  .openapi('Benefit')

const CompensationSchema = z
  .object({
    salary: MoneySchema.optional(),
    bonus: MoneySchema.optional(),
    equity: EquityGrantSchema.optional(),
    benefits: z
      .array(BenefitSchema)
      .optional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/Benefit' } }),
  })
  .openapi({
    type: 'object',
    properties: {
      salary: { $ref: '#/components/schemas/Money' },
      bonus: { $ref: '#/components/schemas/Money' },
      equity: { $ref: '#/components/schemas/EquityGrant' },
      benefits: { type: 'array', items: { $ref: '#/components/schemas/Benefit' } },
    },
  })
  .openapi('Compensation')

const EmploymentInfoSchema = z
  .object({
    startDate: z.iso.date().openapi({ type: 'string', format: 'date' }),
    endDate: z.iso.date().optional().openapi({ type: 'string', format: 'date' }),
    status: EmploymentStatusSchema,
    position: PositionSchema,
    compensation: CompensationSchema.optional(),
  })
  .openapi({
    type: 'object',
    required: ['startDate', 'status', 'position'],
    properties: {
      startDate: { type: 'string', format: 'date' },
      endDate: { type: 'string', format: 'date' },
      status: { $ref: '#/components/schemas/EmploymentStatus' },
      position: { $ref: '#/components/schemas/Position' },
      compensation: { $ref: '#/components/schemas/Compensation' },
    },
  })
  .openapi('EmploymentInfo')

const ProficiencyLevelSchema = z
  .enum(['beginner', 'intermediate', 'advanced', 'expert'])
  .openapi({ type: 'string', enum: ['beginner', 'intermediate', 'advanced', 'expert'] })
  .openapi('ProficiencyLevel')

const SkillSchema = z
  .object({
    name: z.string().openapi({ type: 'string' }),
    proficiency: ProficiencyLevelSchema,
    yearsOfExperience: z.number().optional().openapi({ type: 'number' }),
  })
  .openapi({
    type: 'object',
    required: ['name', 'proficiency'],
    properties: {
      name: { type: 'string' },
      proficiency: { $ref: '#/components/schemas/ProficiencyLevel' },
      yearsOfExperience: { type: 'number' },
    },
  })
  .openapi('Skill')

const CertificationIssuerSchema = z
  .object({
    name: z.string().openapi({ type: 'string' }),
    website: z.url().optional().openapi({ type: 'string', format: 'uri' }),
  })
  .openapi({
    type: 'object',
    required: ['name'],
    properties: { name: { type: 'string' }, website: { type: 'string', format: 'uri' } },
  })
  .openapi('CertificationIssuer')

const CertificationSchema = z
  .object({
    name: z.string().openapi({ type: 'string' }),
    issuer: CertificationIssuerSchema,
    issuedDate: z.iso.date().optional().openapi({ type: 'string', format: 'date' }),
    expiryDate: z.iso.date().optional().openapi({ type: 'string', format: 'date' }),
    credentialId: z.string().optional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    required: ['name', 'issuer'],
    properties: {
      name: { type: 'string' },
      issuer: { $ref: '#/components/schemas/CertificationIssuer' },
      issuedDate: { type: 'string', format: 'date' },
      expiryDate: { type: 'string', format: 'date' },
      credentialId: { type: 'string' },
    },
  })
  .openapi('Certification')

const EmployeeSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    personalInfo: PersonalInfoSchema,
    employmentInfo: EmploymentInfoSchema,
    skills: z
      .array(SkillSchema)
      .optional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/Skill' } }),
    certifications: z
      .array(CertificationSchema)
      .optional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/Certification' } }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'personalInfo', 'employmentInfo'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      personalInfo: { $ref: '#/components/schemas/PersonalInfo' },
      employmentInfo: { $ref: '#/components/schemas/EmploymentInfo' },
      skills: { type: 'array', items: { $ref: '#/components/schemas/Skill' } },
      certifications: { type: 'array', items: { $ref: '#/components/schemas/Certification' } },
    },
  })
  .openapi('Employee')

const PermissionSchema = z
  .object({
    resource: z.string().openapi({ type: 'string' }),
    actions: z
      .array(
        z
          .enum(['read', 'write', 'delete', 'admin'])
          .openapi({ type: 'string', enum: ['read', 'write', 'delete', 'admin'] }),
      )
      .openapi({
        type: 'array',
        items: { type: 'string', enum: ['read', 'write', 'delete', 'admin'] },
      }),
  })
  .openapi({
    type: 'object',
    required: ['resource', 'actions'],
    properties: {
      resource: { type: 'string' },
      actions: {
        type: 'array',
        items: { type: 'string', enum: ['read', 'write', 'delete', 'admin'] },
      },
    },
  })
  .openapi('Permission')

const TeamRoleSchema = z
  .object({
    name: z.string().openapi({ type: 'string' }),
    permissions: z
      .array(PermissionSchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/Permission' } }),
  })
  .openapi({
    type: 'object',
    required: ['name', 'permissions'],
    properties: {
      name: { type: 'string' },
      permissions: { type: 'array', items: { $ref: '#/components/schemas/Permission' } },
    },
  })
  .openapi('TeamRole')

const AllocationSchema = z
  .object({
    percentage: z.int().min(0).max(100).openapi({ type: 'integer', minimum: 0, maximum: 100 }),
    effectiveFrom: z.iso.date().optional().openapi({ type: 'string', format: 'date' }),
    effectiveTo: z.iso.date().optional().openapi({ type: 'string', format: 'date' }),
  })
  .openapi({
    type: 'object',
    required: ['percentage'],
    properties: {
      percentage: { type: 'integer', minimum: 0, maximum: 100 },
      effectiveFrom: { type: 'string', format: 'date' },
      effectiveTo: { type: 'string', format: 'date' },
    },
  })
  .openapi('Allocation')

const TeamMemberSchema = z
  .object({
    employee: EmployeeSchema,
    role: TeamRoleSchema,
    joinedAt: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
    allocation: AllocationSchema.optional(),
  })
  .openapi({
    type: 'object',
    required: ['employee', 'role'],
    properties: {
      employee: { $ref: '#/components/schemas/Employee' },
      role: { $ref: '#/components/schemas/TeamRole' },
      joinedAt: { type: 'string', format: 'date-time' },
      allocation: { $ref: '#/components/schemas/Allocation' },
    },
  })
  .openapi('TeamMember')

const ProjectStatusSchema = z
  .enum(['planning', 'in_progress', 'on_hold', 'completed', 'cancelled'])
  .openapi({
    type: 'string',
    enum: ['planning', 'in_progress', 'on_hold', 'completed', 'cancelled'],
  })
  .openapi('ProjectStatus')

const BudgetSchema = z
  .object({
    allocated: MoneySchema.optional(),
    spent: MoneySchema.optional(),
    remaining: MoneySchema.optional(),
  })
  .openapi({
    type: 'object',
    properties: {
      allocated: { $ref: '#/components/schemas/Money' },
      spent: { $ref: '#/components/schemas/Money' },
      remaining: { $ref: '#/components/schemas/Money' },
    },
  })
  .openapi('Budget')

const MilestoneSchema = z
  .object({
    name: z.string().openapi({ type: 'string' }),
    dueDate: z.iso.date().openapi({ type: 'string', format: 'date' }),
    status: z
      .enum(['pending', 'completed', 'overdue'])
      .optional()
      .openapi({ type: 'string', enum: ['pending', 'completed', 'overdue'] }),
  })
  .openapi({
    type: 'object',
    required: ['name', 'dueDate'],
    properties: {
      name: { type: 'string' },
      dueDate: { type: 'string', format: 'date' },
      status: { type: 'string', enum: ['pending', 'completed', 'overdue'] },
    },
  })
  .openapi('Milestone')

const TimelineSchema = z
  .object({
    startDate: z.iso.date().optional().openapi({ type: 'string', format: 'date' }),
    endDate: z.iso.date().optional().openapi({ type: 'string', format: 'date' }),
    milestones: z
      .array(MilestoneSchema)
      .optional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/Milestone' } }),
  })
  .openapi({
    type: 'object',
    properties: {
      startDate: { type: 'string', format: 'date' },
      endDate: { type: 'string', format: 'date' },
      milestones: { type: 'array', items: { $ref: '#/components/schemas/Milestone' } },
    },
  })
  .openapi('Timeline')

const StakeholderSchema = z
  .object({
    employee: EmployeeSchema,
    role: z
      .enum(['sponsor', 'owner', 'contributor', 'reviewer'])
      .openapi({ type: 'string', enum: ['sponsor', 'owner', 'contributor', 'reviewer'] }),
  })
  .openapi({
    type: 'object',
    required: ['employee', 'role'],
    properties: {
      employee: { $ref: '#/components/schemas/Employee' },
      role: { type: 'string', enum: ['sponsor', 'owner', 'contributor', 'reviewer'] },
    },
  })
  .openapi('Stakeholder')

const ProjectSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    name: z.string().openapi({ type: 'string' }),
    status: ProjectStatusSchema,
    budget: BudgetSchema.optional(),
    timeline: TimelineSchema.optional(),
    stakeholders: z
      .array(StakeholderSchema)
      .optional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/Stakeholder' } }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'name', 'status'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      name: { type: 'string' },
      status: { $ref: '#/components/schemas/ProjectStatus' },
      budget: { $ref: '#/components/schemas/Budget' },
      timeline: { $ref: '#/components/schemas/Timeline' },
      stakeholders: { type: 'array', items: { $ref: '#/components/schemas/Stakeholder' } },
    },
  })
  .openapi('Project')

const TeamSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    name: z.string().openapi({ type: 'string' }),
    metadata: EntityMetadataSchema.optional(),
    members: z
      .array(TeamMemberSchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/TeamMember' } }),
    lead: EmployeeSchema.optional(),
    projects: z
      .array(ProjectSchema)
      .optional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/Project' } }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'name', 'members'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      name: { type: 'string' },
      metadata: { $ref: '#/components/schemas/EntityMetadata' },
      members: { type: 'array', items: { $ref: '#/components/schemas/TeamMember' } },
      lead: { $ref: '#/components/schemas/Employee' },
      projects: { type: 'array', items: { $ref: '#/components/schemas/Project' } },
    },
  })
  .openapi('Team')

const DepartmentSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    name: z.string().openapi({ type: 'string' }),
    metadata: EntityMetadataSchema.optional(),
    teams: z
      .array(TeamSchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/Team' } }),
    manager: EmployeeSchema.optional(),
    budget: BudgetSchema.optional(),
  })
  .openapi({
    type: 'object',
    required: ['id', 'name', 'teams'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      name: { type: 'string' },
      metadata: { $ref: '#/components/schemas/EntityMetadata' },
      teams: { type: 'array', items: { $ref: '#/components/schemas/Team' } },
      manager: { $ref: '#/components/schemas/Employee' },
      budget: { $ref: '#/components/schemas/Budget' },
    },
  })
  .openapi('Department')

const OrganizationSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    name: z.string().openapi({ type: 'string' }),
    metadata: EntityMetadataSchema.optional(),
    departments: z
      .array(DepartmentSchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/Department' } }),
    headquarters: AddressSchema.optional(),
    contact: ContactInfoSchema.optional(),
  })
  .openapi({
    type: 'object',
    required: ['id', 'name', 'departments'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      name: { type: 'string' },
      metadata: { $ref: '#/components/schemas/EntityMetadata' },
      departments: { type: 'array', items: { $ref: '#/components/schemas/Department' } },
      headquarters: { $ref: '#/components/schemas/Address' },
      contact: { $ref: '#/components/schemas/ContactInfo' },
    },
  })
  .openapi('Organization')

const OrganizationStatisticsSchema = z
  .object({
    totalEmployees: z.int().optional().openapi({ type: 'integer' }),
    totalDepartments: z.int().optional().openapi({ type: 'integer' }),
    totalTeams: z.int().optional().openapi({ type: 'integer' }),
    totalProjects: z.int().optional().openapi({ type: 'integer' }),
    budgetSummary: BudgetSchema.optional(),
  })
  .openapi({
    type: 'object',
    properties: {
      totalEmployees: { type: 'integer' },
      totalDepartments: { type: 'integer' },
      totalTeams: { type: 'integer' },
      totalProjects: { type: 'integer' },
      budgetSummary: { $ref: '#/components/schemas/Budget' },
    },
  })
  .openapi('OrganizationStatistics')

const OrganizationSummarySchema = z
  .object({ organization: OrganizationSchema, statistics: OrganizationStatisticsSchema })
  .openapi({
    type: 'object',
    required: ['organization', 'statistics'],
    properties: {
      organization: { $ref: '#/components/schemas/Organization' },
      statistics: { $ref: '#/components/schemas/OrganizationStatistics' },
    },
  })
  .openapi('OrganizationSummary')

const OrgIdPathParamsSchema = z
  .uuid()
  .openapi({
    param: {
      name: 'orgId',
      in: 'path',
      required: true,
      schema: { type: 'string', format: 'uuid' },
    },
    type: 'string',
    format: 'uuid',
  })

const DeptIdPathParamsSchema = z
  .uuid()
  .openapi({
    param: {
      name: 'deptId',
      in: 'path',
      required: true,
      schema: { type: 'string', format: 'uuid' },
    },
    type: 'string',
    format: 'uuid',
  })

const TeamIdPathParamsSchema = z
  .uuid()
  .openapi({
    param: {
      name: 'teamId',
      in: 'path',
      required: true,
      schema: { type: 'string', format: 'uuid' },
    },
    type: 'string',
    format: 'uuid',
  })

const AddTeamMemberRequestBody = {
  content: {
    'application/json': {
      schema: z
        .object({
          employeeId: z.uuid().openapi({ type: 'string', format: 'uuid' }),
          role: TeamRoleSchema,
          allocation: AllocationSchema.optional(),
        })
        .openapi({
          type: 'object',
          required: ['employeeId', 'role'],
          properties: {
            employeeId: { type: 'string', format: 'uuid' },
            role: { $ref: '#/components/schemas/TeamRole' },
            allocation: { $ref: '#/components/schemas/Allocation' },
          },
        }),
    },
  },
  required: true,
}

const NotFoundResponse = {
  description: 'Resource not found',
  content: {
    'application/json': {
      schema: z
        .object({
          error: z.string().optional().openapi({ type: 'string' }),
          path: z.string().optional().openapi({ type: 'string' }),
        })
        .openapi({
          type: 'object',
          properties: { error: { type: 'string' }, path: { type: 'string' } },
        }),
    },
  },
}

export const getOrganizationsOrgIdDepartmentsDeptIdTeamsTeamIdMembersRoute = createRoute({
  method: 'get',
  path: '/organizations/{orgId}/departments/{deptId}/teams/{teamId}/members',
  operationId: 'getTeamMembers',
  request: {
    params: z.object({
      orgId: OrgIdPathParamsSchema,
      deptId: DeptIdPathParamsSchema,
      teamId: TeamIdPathParamsSchema,
    }),
  },
  responses: {
    200: {
      description: 'Team members',
      content: {
        'application/json': {
          schema: z
            .array(TeamMemberSchema)
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/TeamMember' } }),
        },
      },
    },
    404: NotFoundResponse,
  },
})

export const postOrganizationsOrgIdDepartmentsDeptIdTeamsTeamIdMembersRoute = createRoute({
  method: 'post',
  path: '/organizations/{orgId}/departments/{deptId}/teams/{teamId}/members',
  operationId: 'addTeamMember',
  request: {
    body: AddTeamMemberRequestBody,
    params: z.object({
      orgId: OrgIdPathParamsSchema,
      deptId: DeptIdPathParamsSchema,
      teamId: TeamIdPathParamsSchema,
    }),
  },
  responses: {
    201: {
      description: 'Member added',
      content: { 'application/json': { schema: TeamMemberSchema } },
    },
  },
})

export const getReportsOrganizationSummaryRoute = createRoute({
  method: 'get',
  path: '/reports/organization-summary',
  operationId: 'getOrganizationSummary',
  responses: {
    200: {
      description: 'Full organization summary with deep nesting',
      content: { 'application/json': { schema: OrganizationSummarySchema } },
    },
  },
})
