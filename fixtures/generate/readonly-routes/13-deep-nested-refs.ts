import { createRoute, z } from '@hono/zod-openapi'

const AuditUserSchema = z
  .object({
    id: z.uuid().exactOptional(),
    name: z.string().exactOptional(),
    email: z.email().exactOptional(),
  })
  .readonly()
  .openapi('AuditUser')

const TagSchema = z
  .object({ key: z.string(), value: z.string() })
  .openapi({ required: ['key', 'value'] })
  .readonly()
  .openapi('Tag')

const EntityMetadataSchema = z
  .object({
    createdAt: z.iso.datetime().exactOptional(),
    updatedAt: z.iso.datetime().exactOptional(),
    createdBy: AuditUserSchema.exactOptional(),
    updatedBy: AuditUserSchema.exactOptional(),
    version: z.int().exactOptional(),
    tags: z.array(TagSchema).exactOptional(),
  })
  .readonly()
  .openapi('EntityMetadata')

const PhoneNumberSchema = z
  .object({
    countryCode: z.string().regex(/^\+[1-9]\d{0,2}$/),
    number: z.string(),
    extension: z.string().exactOptional(),
  })
  .openapi({ required: ['countryCode', 'number'] })
  .readonly()
  .openapi('PhoneNumber')

const CountrySchema = z
  .object({ code: z.string().regex(/^[A-Z]{2}$/), name: z.string() })
  .openapi({ required: ['code', 'name'] })
  .readonly()
  .openapi('Country')

const GeoCoordinatesSchema = z
  .object({ latitude: z.number().min(-90).max(90), longitude: z.number().min(-180).max(180) })
  .openapi({ required: ['latitude', 'longitude'] })
  .readonly()
  .openapi('GeoCoordinates')

const AddressSchema = z
  .object({
    street: z.string().exactOptional(),
    city: z.string().exactOptional(),
    state: z.string().exactOptional(),
    postalCode: z.string().exactOptional(),
    country: CountrySchema.exactOptional(),
    coordinates: GeoCoordinatesSchema.exactOptional(),
  })
  .readonly()
  .openapi('Address')

const EmergencyContactSchema = z
  .object({
    name: z.string(),
    relationship: z.string(),
    phone: PhoneNumberSchema,
    address: AddressSchema.exactOptional(),
  })
  .openapi({ required: ['name', 'relationship', 'phone'] })
  .readonly()
  .openapi('EmergencyContact')

const PersonalInfoSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.email(),
    phone: PhoneNumberSchema.exactOptional(),
    address: AddressSchema.exactOptional(),
    emergencyContact: EmergencyContactSchema.exactOptional(),
  })
  .openapi({ required: ['firstName', 'lastName', 'email'] })
  .readonly()
  .openapi('PersonalInfo')

const EmploymentStatusSchema = z
  .enum(['active', 'on_leave', 'terminated', 'retired'])
  .readonly()
  .openapi('EmploymentStatus')

const JobLevelSchema = z
  .object({ code: z.string(), name: z.string(), rank: z.int().min(1).max(10) })
  .openapi({ required: ['code', 'name', 'rank'] })
  .readonly()
  .openapi('JobLevel')

const PositionSchema = z
  .object({ title: z.string(), level: JobLevelSchema, department: z.string().exactOptional() })
  .openapi({ required: ['title', 'level'] })
  .readonly()
  .openapi('Position')

const CurrencySchema = z
  .object({ code: z.string().regex(/^[A-Z]{3}$/), symbol: z.string().exactOptional() })
  .openapi({ required: ['code'] })
  .readonly()
  .openapi('Currency')

const MoneySchema = z
  .object({ amount: z.number(), currency: CurrencySchema })
  .openapi({ required: ['amount', 'currency'] })
  .readonly()
  .openapi('Money')

const DurationSchema = z
  .object({ value: z.int(), unit: z.enum(['days', 'weeks', 'months', 'years']) })
  .openapi({ required: ['value', 'unit'] })
  .readonly()
  .openapi('Duration')

const VestingScheduleSchema = z
  .object({
    cliff: DurationSchema.exactOptional(),
    totalPeriod: DurationSchema.exactOptional(),
    frequency: z.enum(['monthly', 'quarterly', 'annually']).exactOptional(),
  })
  .readonly()
  .openapi('VestingSchedule')

const EquityGrantSchema = z
  .object({
    shares: z.int().exactOptional(),
    vestingSchedule: VestingScheduleSchema.exactOptional(),
    grantDate: z.iso.date().exactOptional(),
  })
  .readonly()
  .openapi('EquityGrant')

const SocialMediaLinkSchema = z
  .object({ platform: z.enum(['linkedin', 'twitter', 'facebook', 'instagram']), url: z.url() })
  .openapi({ required: ['platform', 'url'] })
  .readonly()
  .openapi('SocialMediaLink')

const ContactInfoSchema = z
  .object({
    email: z.email().exactOptional(),
    phone: PhoneNumberSchema.exactOptional(),
    website: z.url().exactOptional(),
    socialMedia: z.array(SocialMediaLinkSchema).exactOptional(),
  })
  .readonly()
  .openapi('ContactInfo')

const BenefitProviderSchema = z
  .object({ name: z.string(), contact: ContactInfoSchema.exactOptional() })
  .openapi({ required: ['name'] })
  .readonly()
  .openapi('BenefitProvider')

const CoverageSchema = z
  .object({
    level: z.enum(['individual', 'family']).exactOptional(),
    deductible: MoneySchema.exactOptional(),
    maxBenefit: MoneySchema.exactOptional(),
  })
  .readonly()
  .openapi('Coverage')

const BenefitSchema = z
  .object({
    type: z.enum(['health', 'dental', 'vision', 'life', 'retirement']),
    provider: BenefitProviderSchema,
    coverage: CoverageSchema.exactOptional(),
  })
  .openapi({ required: ['type', 'provider'] })
  .readonly()
  .openapi('Benefit')

const CompensationSchema = z
  .object({
    salary: MoneySchema.exactOptional(),
    bonus: MoneySchema.exactOptional(),
    equity: EquityGrantSchema.exactOptional(),
    benefits: z.array(BenefitSchema).exactOptional(),
  })
  .readonly()
  .openapi('Compensation')

const EmploymentInfoSchema = z
  .object({
    startDate: z.iso.date(),
    endDate: z.iso.date().exactOptional(),
    status: EmploymentStatusSchema,
    position: PositionSchema,
    compensation: CompensationSchema.exactOptional(),
  })
  .openapi({ required: ['startDate', 'status', 'position'] })
  .readonly()
  .openapi('EmploymentInfo')

const ProficiencyLevelSchema = z
  .enum(['beginner', 'intermediate', 'advanced', 'expert'])
  .readonly()
  .openapi('ProficiencyLevel')

const SkillSchema = z
  .object({
    name: z.string(),
    proficiency: ProficiencyLevelSchema,
    yearsOfExperience: z.number().exactOptional(),
  })
  .openapi({ required: ['name', 'proficiency'] })
  .readonly()
  .openapi('Skill')

const CertificationIssuerSchema = z
  .object({ name: z.string(), website: z.url().exactOptional() })
  .openapi({ required: ['name'] })
  .readonly()
  .openapi('CertificationIssuer')

const CertificationSchema = z
  .object({
    name: z.string(),
    issuer: CertificationIssuerSchema,
    issuedDate: z.iso.date().exactOptional(),
    expiryDate: z.iso.date().exactOptional(),
    credentialId: z.string().exactOptional(),
  })
  .openapi({ required: ['name', 'issuer'] })
  .readonly()
  .openapi('Certification')

const EmployeeSchema = z
  .object({
    id: z.uuid(),
    personalInfo: PersonalInfoSchema,
    employmentInfo: EmploymentInfoSchema,
    skills: z.array(SkillSchema).exactOptional(),
    certifications: z.array(CertificationSchema).exactOptional(),
  })
  .openapi({ required: ['id', 'personalInfo', 'employmentInfo'] })
  .readonly()
  .openapi('Employee')

const PermissionSchema = z
  .object({ resource: z.string(), actions: z.array(z.enum(['read', 'write', 'delete', 'admin'])) })
  .openapi({ required: ['resource', 'actions'] })
  .readonly()
  .openapi('Permission')

const TeamRoleSchema = z
  .object({ name: z.string(), permissions: z.array(PermissionSchema) })
  .openapi({ required: ['name', 'permissions'] })
  .readonly()
  .openapi('TeamRole')

const AllocationSchema = z
  .object({
    percentage: z.int().min(0).max(100),
    effectiveFrom: z.iso.date().exactOptional(),
    effectiveTo: z.iso.date().exactOptional(),
  })
  .openapi({ required: ['percentage'] })
  .readonly()
  .openapi('Allocation')

const TeamMemberSchema = z
  .object({
    employee: EmployeeSchema,
    role: TeamRoleSchema,
    joinedAt: z.iso.datetime().exactOptional(),
    allocation: AllocationSchema.exactOptional(),
  })
  .openapi({ required: ['employee', 'role'] })
  .readonly()
  .openapi('TeamMember')

const ProjectStatusSchema = z
  .enum(['planning', 'in_progress', 'on_hold', 'completed', 'cancelled'])
  .readonly()
  .openapi('ProjectStatus')

const BudgetSchema = z
  .object({
    allocated: MoneySchema.exactOptional(),
    spent: MoneySchema.exactOptional(),
    remaining: MoneySchema.exactOptional(),
  })
  .readonly()
  .openapi('Budget')

const MilestoneSchema = z
  .object({
    name: z.string(),
    dueDate: z.iso.date(),
    status: z.enum(['pending', 'completed', 'overdue']).exactOptional(),
  })
  .openapi({ required: ['name', 'dueDate'] })
  .readonly()
  .openapi('Milestone')

const TimelineSchema = z
  .object({
    startDate: z.iso.date().exactOptional(),
    endDate: z.iso.date().exactOptional(),
    milestones: z.array(MilestoneSchema).exactOptional(),
  })
  .readonly()
  .openapi('Timeline')

const StakeholderSchema = z
  .object({
    employee: EmployeeSchema,
    role: z.enum(['sponsor', 'owner', 'contributor', 'reviewer']),
  })
  .openapi({ required: ['employee', 'role'] })
  .readonly()
  .openapi('Stakeholder')

const ProjectSchema = z
  .object({
    id: z.uuid(),
    name: z.string(),
    status: ProjectStatusSchema,
    budget: BudgetSchema.exactOptional(),
    timeline: TimelineSchema.exactOptional(),
    stakeholders: z.array(StakeholderSchema).exactOptional(),
  })
  .openapi({ required: ['id', 'name', 'status'] })
  .readonly()
  .openapi('Project')

const TeamSchema = z
  .object({
    id: z.uuid(),
    name: z.string(),
    metadata: EntityMetadataSchema.exactOptional(),
    members: z.array(TeamMemberSchema),
    lead: EmployeeSchema.exactOptional(),
    projects: z.array(ProjectSchema).exactOptional(),
  })
  .openapi({ required: ['id', 'name', 'members'] })
  .readonly()
  .openapi('Team')

const DepartmentSchema = z
  .object({
    id: z.uuid(),
    name: z.string(),
    metadata: EntityMetadataSchema.exactOptional(),
    teams: z.array(TeamSchema),
    manager: EmployeeSchema.exactOptional(),
    budget: BudgetSchema.exactOptional(),
  })
  .openapi({ required: ['id', 'name', 'teams'] })
  .readonly()
  .openapi('Department')

const OrganizationSchema = z
  .object({
    id: z.uuid(),
    name: z.string(),
    metadata: EntityMetadataSchema.exactOptional(),
    departments: z.array(DepartmentSchema),
    headquarters: AddressSchema.exactOptional(),
    contact: ContactInfoSchema.exactOptional(),
  })
  .openapi({ required: ['id', 'name', 'departments'] })
  .readonly()
  .openapi('Organization')

const OrganizationStatisticsSchema = z
  .object({
    totalEmployees: z.int().exactOptional(),
    totalDepartments: z.int().exactOptional(),
    totalTeams: z.int().exactOptional(),
    totalProjects: z.int().exactOptional(),
    budgetSummary: BudgetSchema.exactOptional(),
  })
  .readonly()
  .openapi('OrganizationStatistics')

const OrganizationSummarySchema = z
  .object({ organization: OrganizationSchema, statistics: OrganizationStatisticsSchema })
  .openapi({ required: ['organization', 'statistics'] })
  .readonly()
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
  })
  .readonly()

const DeptIdPathParamsSchema = z
  .uuid()
  .openapi({
    param: {
      name: 'deptId',
      in: 'path',
      required: true,
      schema: { type: 'string', format: 'uuid' },
    },
  })
  .readonly()

const TeamIdPathParamsSchema = z
  .uuid()
  .openapi({
    param: {
      name: 'teamId',
      in: 'path',
      required: true,
      schema: { type: 'string', format: 'uuid' },
    },
  })
  .readonly()

const AddTeamMemberRequestBody = {
  content: {
    'application/json': {
      schema: z
        .object({
          employeeId: z.uuid(),
          role: TeamRoleSchema,
          allocation: AllocationSchema.exactOptional(),
        })
        .openapi({ required: ['employeeId', 'role'] }),
    },
  },
  required: true,
} as const

const NotFoundResponse = {
  description: 'Resource not found',
  content: {
    'application/json': {
      schema: z.object({ error: z.string().exactOptional(), path: z.string().exactOptional() }),
    },
  },
} as const

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
      content: { 'application/json': { schema: z.array(TeamMemberSchema) } },
    },
    404: NotFoundResponse,
  },
} as const)

export const postOrganizationsOrgIdDepartmentsDeptIdTeamsTeamIdMembersRoute = createRoute({
  method: 'post',
  path: '/organizations/{orgId}/departments/{deptId}/teams/{teamId}/members',
  operationId: 'addTeamMember',
  request: {
    params: z.object({
      orgId: OrgIdPathParamsSchema,
      deptId: DeptIdPathParamsSchema,
      teamId: TeamIdPathParamsSchema,
    }),
    body: AddTeamMemberRequestBody,
  },
  responses: {
    201: {
      description: 'Member added',
      content: { 'application/json': { schema: TeamMemberSchema } },
    },
  },
} as const)

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
} as const)
