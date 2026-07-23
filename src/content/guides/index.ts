export interface GuideFaq {
  question: string;
  answer: string;
}

export interface GuideSection {
  heading: string;
  content: string;
}

export interface GuideData {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  heroSubtitle: string;
  /**
   * Optional above-the-fold CTA. Use on guides that rank for transactional
   * queries (e.g. "cage code lookup") so the searcher hits the tool/action
   * immediately instead of scrolling past educational copy — improves CTR
   * and on-page conversion. Omit on purely informational guides.
   */
  heroCta?: {
    label: string; // small kicker above the button, e.g. "Need to look one up right now?"
    buttonText: string;
    buttonHref: string;
    external?: boolean; // open in a new tab (set for off-site destinations like the SBA map)
  };
  /**
   * Embed a live tool widget directly under the hero. Stronger than heroCta:
   * the searcher's task is completable on the page itself (GSC shows these
   * guides rank for tool-intent queries, so the tool must BE the page).
   * When set, the heroCta button is not rendered.
   */
  embedTool?: 'cage-lookup';
  sections: GuideSection[];
  faqs: GuideFaq[];
  cta: {
    heading: string;
    description: string;
    buttonText: string;
    buttonHref: string;
  };
  relatedGuides: string[];
  relatedJobs?: string[]; // Job category slugs for internal linking
  publishedDate: string;
  updatedDate?: string;
}

// Map guides to relevant job categories for internal linking
export const GUIDE_JOB_MAPPING: Record<string, string[]> = {
  'proposal-writing': ['proposal-manager', 'proposal-coordinator', 'pricing-analyst'],
  'how-to-bid-on-government-contracts': ['bd-manager', 'capture-manager', 'proposal-manager', 'bd-consultant'],
  'finding-government-contracts': ['bd-manager', 'capture-manager', 'bd-consultant'],
  'federal-market-research': ['capture-manager', 'bd-manager', 'pricing-analyst'],
  'capability-statement': ['bd-manager', 'proposal-coordinator', 'capture-manager'],
  'subcontracting-and-teaming': ['bd-manager', 'capture-manager', 'contracts-administrator'],
  'government-contracting-for-beginners': ['bd-manager', 'proposal-coordinator', 'contracts-administrator'],
  'gsa-schedule': ['contracts-administrator', 'bd-manager', 'pricing-analyst'],
  'sam-gov-registration': ['contracts-administrator', 'bd-manager'],
  'cage-code': ['contracts-administrator'],
  'naics-codes': ['bd-manager', 'capture-manager', 'contracts-administrator'],
  'sba-certifications': ['bd-manager', 'capture-manager'],
  '8a-certification': ['bd-manager', 'capture-manager'],
  'ai-government-contracting': ['proposal-manager', 'capture-manager', 'bd-consultant'],
  'rfp-response': ['proposal-manager', 'proposal-coordinator', 'capture-manager', 'pricing-analyst'],
  'cmmc-certification': ['contracts-administrator', 'bd-manager', 'capture-manager'],
  'contract-vehicles': ['bd-manager', 'capture-manager', 'contracts-administrator', 'proposal-manager'],
  'sources-sought': ['bd-manager', 'capture-manager', 'proposal-coordinator'],
  'oasis-plus': ['bd-manager', 'capture-manager', 'contracts-administrator', 'proposal-manager'],
  'past-performance': ['proposal-manager', 'capture-manager', 'bd-manager', 'proposal-coordinator'],
  'teaming-agreements': ['bd-manager', 'capture-manager', 'contracts-administrator'],
  'sole-source': ['bd-manager', 'capture-manager', 'contracts-administrator'],
  'cpars': ['contracts-administrator', 'proposal-manager', 'capture-manager'],
  'set-asides': ['bd-manager', 'capture-manager', 'proposal-coordinator', 'contracts-administrator'],
  'gsa-advantage': ['bd-manager', 'contracts-administrator', 'capture-manager'],
  'simplified-acquisition': ['bd-manager', 'capture-manager', 'proposal-coordinator', 'contracts-administrator'],
  'cost-proposals': ['pricing-analyst', 'proposal-manager', 'capture-manager', 'proposal-coordinator'],
  'contract-modifications': ['contracts-administrator', 'proposal-manager', 'capture-manager'],
  'bid-no-bid': ['bd-manager', 'capture-manager', 'proposal-manager', 'bd-consultant'],
  'mentor-protege-program': ['bd-manager', 'capture-manager', 'contracts-administrator'],
  'joint-venture-requirements': ['bd-manager', 'capture-manager', 'contracts-administrator'],
  'sba-size-standards': ['bd-manager', 'contracts-administrator', 'capture-manager'],
  'capture-management': ['capture-manager', 'bd-manager', 'proposal-manager', 'bd-consultant'],
  'firm-fixed-price-contracts': ['pricing-analyst', 'proposal-manager', 'contracts-administrator', 'capture-manager'],
  'cost-plus-contracts': ['pricing-analyst', 'proposal-manager', 'contracts-administrator', 'capture-manager'],
  'time-and-materials-contracts': ['pricing-analyst', 'proposal-manager', 'contracts-administrator'],
  'idiq-contracts': ['bd-manager', 'capture-manager', 'contracts-administrator', 'proposal-manager'],
  'bpa-agreements': ['bd-manager', 'contracts-administrator', 'capture-manager'],
  'far-overview': ['contracts-administrator', 'proposal-manager', 'pricing-analyst'],
  'dcaa-audits': ['pricing-analyst', 'contracts-administrator'],
  'indirect-rates': ['pricing-analyst', 'contracts-administrator', 'proposal-manager'],
  'rate-development': ['pricing-analyst', 'proposal-manager', 'contracts-administrator'],
  'cost-accounting-standards': ['contracts-administrator', 'pricing-analyst'],
  'unallowable-costs': ['contracts-administrator', 'pricing-analyst'],
  'fringe-benefit-calculations': ['pricing-analyst', 'contracts-administrator'],
  'gao-protests': ['contracts-administrator', 'proposal-manager', 'capture-manager'],
  'debriefings': ['proposal-manager', 'capture-manager', 'bd-manager'],
  'service-contract-act': ['pricing-analyst', 'contracts-administrator', 'proposal-manager'],
  'organizational-conflicts-interest': ['contracts-administrator', 'capture-manager', 'bd-manager'],
  'contract-closeout': ['contracts-administrator'],
  'subcontracting-plan': ['contracts-administrator', 'bd-manager', 'capture-manager'],
  'security-clearances': ['bd-manager', 'capture-manager', 'contracts-administrator'],
  'proposal-compliance-matrix': ['proposal-manager', 'proposal-coordinator', 'capture-manager'],
  'price-to-win': ['pricing-analyst', 'capture-manager', 'proposal-manager', 'bd-manager'],
  'competitive-analysis': ['capture-manager', 'bd-manager', 'proposal-manager', 'bd-consultant'],
  'government-proposal-reviews': ['proposal-manager', 'proposal-coordinator', 'capture-manager'],
  'oral-presentations': ['proposal-manager', 'capture-manager', 'bd-manager'],
  'key-personnel': ['proposal-manager', 'capture-manager', 'contracts-administrator'],
  'labor-categories': ['pricing-analyst', 'proposal-manager', 'contracts-administrator'],
  'technical-evaluation': ['proposal-manager', 'proposal-coordinator', 'capture-manager'],
  'incumbent-capture': ['capture-manager', 'bd-manager', 'capture-director', 'bd-consultant'],
  'small-business-teaming': ['bd-manager', 'capture-manager', 'contracts-administrator'],
  'contract-financing': ['contracts-administrator', 'pricing-analyst', 'bd-manager'],
  'contract-types-comparison': ['pricing-analyst', 'proposal-manager', 'contracts-administrator', 'capture-manager'],
  'task-order-management': ['contracts-administrator', 'capture-manager', 'proposal-manager'],
  'option-years': ['contracts-administrator', 'capture-manager', 'pricing-analyst'],
  'invoice-processing': ['contracts-administrator', 'pricing-analyst'],
  'quality-assurance': ['contracts-administrator', 'proposal-manager'],
  'federal-supply-schedules': ['bd-manager', 'contracts-administrator', 'capture-manager'],
  'government-contract-law': ['contracts-administrator', 'proposal-manager', 'capture-manager'],
  'performance-work-statement': ['proposal-manager', 'proposal-coordinator', 'capture-manager', 'contracts-administrator'],
  'undefinitized-contract-actions': ['contracts-administrator', 'pricing-analyst', 'capture-manager'],
  'stop-work-orders': ['contracts-administrator', 'capture-manager', 'proposal-manager'],
  'contract-data-rights': ['contracts-administrator', 'proposal-manager', 'capture-manager'],
  'compliance-program': ['contracts-administrator', 'bd-manager', 'capture-manager'],
  'request-for-information': ['capture-manager', 'bd-manager', 'proposal-coordinator'],
  'sdvosb-certification': ['bd-manager', 'contracts-administrator', 'capture-manager'],
  'construction-contracting': ['bd-manager', 'capture-manager', 'contracts-administrator', 'pricing-analyst'],
  'it-contracting': ['bd-manager', 'capture-manager', 'proposal-manager', 'contracts-administrator'],
  'sbir-sttr': ['bd-manager', 'capture-manager', 'proposal-manager'],
  'agency-budgets': ['capture-manager', 'bd-manager', 'bd-consultant'],
  'contract-exit-strategy': ['contracts-administrator', 'capture-manager', 'bd-manager'],
  'government-furnished-property': ['contracts-administrator', 'capture-manager'],
  'pre-award-survey': ['contracts-administrator', 'bd-manager', 'capture-manager'],
  'business-development-plan': ['bd-manager', 'capture-manager', 'bd-consultant', 'vp-business-development'],
  'recompete-strategy': ['capture-manager', 'bd-manager', 'proposal-manager', 'capture-director'],
  'contract-disputes': ['contracts-administrator', 'proposal-manager', 'capture-manager', 'bd-manager'],
  'terminations': ['contracts-administrator', 'proposal-manager', 'capture-manager'],
  'change-orders': ['contracts-administrator', 'proposal-manager', 'pricing-analyst', 'capture-manager'],
  'consent-to-subcontract': ['contracts-administrator', 'bd-manager', 'capture-manager'],
  'customer-relationship-building': ['bd-manager', 'capture-manager', 'bd-consultant', 'vp-business-development'],
  'market-positioning': ['bd-manager', 'capture-manager', 'bd-consultant', 'vp-business-development'],
  'pipeline-management': ['bd-manager', 'capture-manager', 'bd-consultant', 'vp-business-development', 'capture-director'],
  'teaming-partner-selection': ['bd-manager', 'capture-manager', 'contracts-administrator', 'bd-consultant'],
  'proposal-team-building': ['proposal-manager', 'capture-manager', 'proposal-coordinator', 'bd-manager'],
  'win-themes': ['capture-manager', 'proposal-manager', 'bd-manager', 'proposal-coordinator'],
  'proposal-graphics': ['proposal-manager', 'proposal-coordinator', 'capture-manager'],
  'executive-summary': ['proposal-manager', 'capture-manager', 'bd-manager', 'proposal-coordinator'],
  'edwosb-certification': ['bd-manager', 'capture-manager', 'contracts-administrator'],
  'ability-one-program': ['bd-manager', 'contracts-administrator', 'capture-manager'],
  'veteran-business-guide': ['bd-manager', 'capture-manager', 'contracts-administrator'],
  'indian-incentive-program': ['bd-manager', 'capture-manager', 'contracts-administrator'],
  'sdb-certification': ['bd-manager', 'capture-manager', 'contracts-administrator'],
  'cybersecurity-requirements': ['contracts-administrator', 'bd-manager', 'capture-manager', 'proposal-manager'],
  'export-controls': ['contracts-administrator', 'bd-manager', 'capture-manager'],
  'conflict-minerals': ['contracts-administrator', 'bd-manager', 'capture-manager'],
  'counterfeit-parts': ['contracts-administrator', 'bd-manager', 'quality-assurance'],
  'ethics-compliance': ['contracts-administrator', 'bd-manager', 'capture-manager', 'proposal-manager'],
  'kick-off-meetings': ['contracts-administrator', 'proposal-manager', 'capture-manager', 'bd-manager'],
  'status-reporting': ['contracts-administrator', 'proposal-manager', 'capture-manager'],
  'earned-value-management': ['contracts-administrator', 'proposal-manager', 'pricing-analyst', 'capture-manager'],
  'contract-surveillance': ['contracts-administrator', 'proposal-manager', 'capture-manager'],
  'deliverables-management': ['contracts-administrator', 'proposal-manager', 'proposal-coordinator', 'capture-manager'],
  'ghosting-competitors': ['proposal-manager', 'capture-manager', 'bd-manager', 'proposal-coordinator'],
  'black-hat-reviews': ['proposal-manager', 'capture-manager', 'proposal-coordinator'],
  'gate-reviews': ['bd-manager', 'capture-manager', 'capture-director', 'vp-business-development'],
  'proposal-orals-prep': ['proposal-manager', 'capture-manager', 'bd-manager', 'proposal-coordinator'],
  'capture-plans': ['capture-manager', 'bd-manager', 'capture-director', 'bd-consultant'],
  'novation-agreements': ['contracts-administrator', 'bd-manager', 'capture-manager'],
  'ratification': ['contracts-administrator', 'proposal-manager', 'capture-manager'],
  'award-fee-contracts': ['pricing-analyst', 'proposal-manager', 'contracts-administrator', 'capture-manager'],
  'letter-contracts': ['contracts-administrator', 'pricing-analyst', 'capture-manager'],
  'agency-level-protests': ['contracts-administrator', 'proposal-manager', 'capture-manager', 'bd-manager'],
  'technical-volume': ['proposal-manager', 'proposal-coordinator', 'capture-manager', 'pricing-analyst'],
  'management-volume': ['proposal-manager', 'proposal-coordinator', 'capture-manager'],
  'past-performance-volume': ['proposal-manager', 'capture-manager', 'proposal-coordinator'],
  'small-business-participation': ['contracts-administrator', 'bd-manager', 'capture-manager', 'proposal-manager'],
  'pricing-volume': ['pricing-analyst', 'proposal-manager', 'contracts-administrator', 'capture-manager'],
  'gsa-mas-guide': ['bd-manager', 'contracts-administrator', 'capture-manager', 'proposal-manager'],
  'sewp-contracts': ['bd-manager', 'capture-manager', 'contracts-administrator', 'proposal-manager'],
  'alliant-gwac': ['bd-manager', 'capture-manager', 'proposal-manager', 'contracts-administrator'],
  'cio-sp4': ['bd-manager', 'capture-manager', 'proposal-manager', 'contracts-administrator'],
  'schedule-ordering': ['bd-manager', 'contracts-administrator', 'capture-manager', 'proposal-coordinator'],
  'contract-specialist-career': ['contracts-administrator', 'proposal-manager', 'capture-manager', 'bd-manager'],
  'proposal-manager-career': ['proposal-manager', 'proposal-coordinator', 'capture-manager', 'bd-manager'],
  'capture-manager-career': ['capture-manager', 'bd-manager', 'capture-director', 'vp-business-development'],
  'healthcare-contracting': ['bd-manager', 'capture-manager', 'contracts-administrator', 'proposal-manager'],
  'professional-services': ['bd-manager', 'capture-manager', 'proposal-manager', 'contracts-administrator'],
};

// Import all guides
import { guide as governmentContractingForBeginners } from './government-contracting-for-beginners';
import { guide as samGovRegistration } from './sam-gov-registration';
import { guide as capabilityStatement } from './capability-statement';
import { guide as sbaCertifications } from './sba-certifications';
import { guide as findingGovernmentContracts } from './finding-government-contracts';
import { guide as proposalWriting } from './proposal-writing';
import { guide as subcontractingAndTeaming } from './subcontracting-and-teaming';
import { guide as federalMarketResearch } from './federal-market-research';
import { guide as cageCode } from './cage-code';
import { guide as vosbCertification } from './vosb-certification';
import { guide as hubzoneCertification } from './hubzone-certification';
import { guide as aiGovernmentContracting } from './ai-government-contracting';
import { guide as eightACertification } from './8a-certification';
import { guide as wosbCertification } from './wosb-certification';
import { guide as gsaSchedule } from './gsa-schedule';
import { guide as naicsCodes } from './naics-codes';
import { guide as rfpResponse } from './rfp-response';
import { guide as cmmcCertification } from './cmmc-certification';
import { guide as contractVehicles } from './contract-vehicles';
import { guide as sourcesSought } from './sources-sought';
import { guide as oasisPlus } from './oasis-plus';
import { guide as pastPerformance } from './past-performance';
import { guide as teamingAgreements } from './teaming-agreements';
import { guide as soleSource } from './sole-source';
import { guide as cpars } from './cpars';
import { guide as setAsides } from './set-asides';
import { guide as gsaAdvantage } from './gsa-advantage';
import { guide as simplifiedAcquisition } from './simplified-acquisition';
import { guide as costProposals } from './cost-proposals';
import { guide as contractModifications } from './contract-modifications';
import { guide as bidNoBid } from './bid-no-bid';
import { guide as mentorProtegeProgram } from './mentor-protege-program';
import { guide as jointVentureRequirements } from './joint-venture-requirements';
import { guide as sbaSizeStandards } from './sba-size-standards';
import { guide as captureManagement } from './capture-management';
import { guide as firmFixedPriceContracts } from './firm-fixed-price-contracts';
import { guide as costPlusContracts } from './cost-plus-contracts';
import { guide as timeAndMaterialsContracts } from './time-and-materials-contracts';
import { guide as idiqContracts } from './idiq-contracts';
import { guide as bpaAgreements } from './bpa-agreements';
import { guide as farOverview } from './far-overview';
import { guide as dcaaAudits } from './dcaa-audits';
import { guide as indirectRates } from './indirect-rates';
import { guide as gaoProtests } from './gao-protests';
import { guide as debriefings } from './debriefings';
import { guide as serviceContractAct } from './service-contract-act';
import { guide as organizationalConflictsInterest } from './organizational-conflicts-interest';
import { guide as contractCloseout } from './contract-closeout';
import { guide as subcontractingPlan } from './subcontracting-plan';
import { guide as securityClearances } from './security-clearances';
import { guide as proposalComplianceMatrix } from './proposal-compliance-matrix';
import { guide as priceToWin } from './price-to-win';
import { guide as competitiveAnalysis } from './competitive-analysis';
import { guide as governmentProposalReviews } from './government-proposal-reviews';
import { guide as oralPresentations } from './oral-presentations';
import { guide as keyPersonnel } from './key-personnel';
import { guide as laborCategories } from './labor-categories';
import { guide as technicalEvaluation } from './technical-evaluation';
import { guide as incumbentCapture } from './incumbent-capture';
import { guide as smallBusinessTeaming } from './small-business-teaming';
import { guide as contractFinancing } from './contract-financing';
import { guide as contractTypesComparison } from './contract-types-comparison';
import { guide as taskOrderManagement } from './task-order-management';
import { guide as optionYears } from './option-years';
import { guide as invoiceProcessing } from './invoice-processing';
import { guide as qualityAssurance } from './quality-assurance';
import { guide as federalSupplySchedules } from './federal-supply-schedules';
import { guide as governmentContractLaw } from './government-contract-law';
import { guide as performanceWorkStatement } from './performance-work-statement';
import { guide as undefinitizedContractActions } from './undefinitized-contract-actions';
import { guide as stopWorkOrders } from './stop-work-orders';
import { guide as contractDataRights } from './contract-data-rights';
import { guide as complianceProgram } from './compliance-program';
import { guide as requestForInformation } from './request-for-information';
import { guide as sdvosbCertification } from './sdvosb-certification';
import { guide as constructionContracting } from './construction-contracting';
import { guide as itContracting } from './it-contracting';
import { guide as sbirSttr } from './sbir-sttr';
import { guide as agencyBudgets } from './agency-budgets';
import { guide as contractExitStrategy } from './contract-exit-strategy';
import { guide as governmentFurnishedProperty } from './government-furnished-property';
import { guide as preAwardSurvey } from './pre-award-survey';
import { guide as businessDevelopmentPlan } from './business-development-plan';
import { guide as recompeteStrategy } from './recompete-strategy';
import { guide as proposalTeamBuilding } from './proposal-team-building';
import { guide as winThemes } from './win-themes';
import { guide as proposalGraphics } from './proposal-graphics';
import { guide as executiveSummary } from './executive-summary';
import { guide as contractDisputes } from './contract-disputes';
import { guide as terminations } from './terminations';
import { guide as changeOrders } from './change-orders';
import { guide as consentToSubcontract } from './consent-to-subcontract';
import { guide as customerRelationshipBuilding } from './customer-relationship-building';
import { guide as marketPositioning } from './market-positioning';
import { guide as pipelineManagement } from './pipeline-management';
import { guide as teamingPartnerSelection } from './teaming-partner-selection';
import { guide as rateDevelopment } from './rate-development';
import { guide as costAccountingStandards } from './cost-accounting-standards';
import { guide as unallowableCosts } from './unallowable-costs';
import { guide as fringeBenefitCalculations } from './fringe-benefit-calculations';
import { guide as edwosbCertification } from './edwosb-certification';
import { guide as abilityOneProgram } from './ability-one-program';
import { guide as veteranBusinessGuide } from './veteran-business-guide';
import { guide as indianIncentiveProgram } from './indian-incentive-program';
import { guide as sdbCertification } from './sdb-certification';
import { guide as cybersecurityRequirements } from './cybersecurity-requirements';
import { guide as exportControls } from './export-controls';
import { guide as conflictMinerals } from './conflict-minerals';
import { guide as counterfeitParts } from './counterfeit-parts';
import { guide as ethicsCompliance } from './ethics-compliance';
import { guide as kickOffMeetings } from './kick-off-meetings';
import { guide as statusReporting } from './status-reporting';
import { guide as earnedValueManagement } from './earned-value-management';
import { guide as contractSurveillance } from './contract-surveillance';
import { guide as deliverablesManagement } from './deliverables-management';
import { guide as ghostingCompetitors } from './ghosting-competitors';
import { guide as blackHatReviews } from './black-hat-reviews';
import { guide as gateReviews } from './gate-reviews';
import { guide as proposalOralsPrep } from './proposal-orals-prep';
import { guide as capturePlans } from './capture-plans';
import { guide as novationAgreements } from './novation-agreements';
import { guide as ratification } from './ratification';
import { guide as awardFeeContracts } from './award-fee-contracts';
import { guide as letterContracts } from './letter-contracts';
import { guide as agencyLevelProtests } from './agency-level-protests';
import { guide as technicalVolume } from './technical-volume';
import { guide as managementVolume } from './management-volume';
import { guide as pastPerformanceVolume } from './past-performance-volume';
import { guide as smallBusinessParticipation } from './small-business-participation';
import { guide as pricingVolume } from './pricing-volume';
import { guide as gsaMasGuide } from './gsa-mas-guide';
import { guide as sewpContracts } from './sewp-contracts';
import { guide as alliantGwac } from './alliant-gwac';
import { guide as cioSp4 } from './cio-sp4';
import { guide as scheduleOrdering } from './schedule-ordering';
import { guide as contractSpecialistCareer } from './contract-specialist-career';
import { guide as proposalManagerCareer } from './proposal-manager-career';
import { guide as captureManagerCareer } from './capture-manager-career';
import { guide as healthcareContracting } from './healthcare-contracting';
import { guide as professionalServices } from './professional-services';
import { guide as howToBidOnGovernmentContracts } from './how-to-bid-on-government-contracts';

export const allGuides: GuideData[] = [
  governmentContractingForBeginners,
  samGovRegistration,
  cageCode,
  capabilityStatement,
  sbaCertifications,
  eightACertification,
  vosbCertification,
  hubzoneCertification,
  wosbCertification,
  findingGovernmentContracts,
  proposalWriting,
  subcontractingAndTeaming,
  federalMarketResearch,
  gsaSchedule,
  naicsCodes,
  aiGovernmentContracting,
  rfpResponse,
  cmmcCertification,
  contractVehicles,
  sourcesSought,
  oasisPlus,
  pastPerformance,
  teamingAgreements,
  soleSource,
  cpars,
  setAsides,
  gsaAdvantage,
  simplifiedAcquisition,
  costProposals,
  contractModifications,
  bidNoBid,
  mentorProtegeProgram,
  jointVentureRequirements,
  sbaSizeStandards,
  captureManagement,
  firmFixedPriceContracts,
  costPlusContracts,
  timeAndMaterialsContracts,
  idiqContracts,
  bpaAgreements,
  farOverview,
  dcaaAudits,
  indirectRates,
  rateDevelopment,
  costAccountingStandards,
  unallowableCosts,
  fringeBenefitCalculations,
  gaoProtests,
  debriefings,
  serviceContractAct,
  organizationalConflictsInterest,
  contractCloseout,
  subcontractingPlan,
  securityClearances,
  proposalComplianceMatrix,
  priceToWin,
  competitiveAnalysis,
  governmentProposalReviews,
  oralPresentations,
  keyPersonnel,
  laborCategories,
  technicalEvaluation,
  incumbentCapture,
  smallBusinessTeaming,
  contractFinancing,
  contractTypesComparison,
  taskOrderManagement,
  optionYears,
  invoiceProcessing,
  qualityAssurance,
  federalSupplySchedules,
  governmentContractLaw,
  performanceWorkStatement,
  undefinitizedContractActions,
  stopWorkOrders,
  contractDataRights,
  complianceProgram,
  requestForInformation,
  sdvosbCertification,
  constructionContracting,
  itContracting,
  sbirSttr,
  agencyBudgets,
  contractExitStrategy,
  governmentFurnishedProperty,
  preAwardSurvey,
  businessDevelopmentPlan,
  recompeteStrategy,
  proposalTeamBuilding,
  winThemes,
  proposalGraphics,
  executiveSummary,
  contractDisputes,
  terminations,
  changeOrders,
  consentToSubcontract,
  customerRelationshipBuilding,
  marketPositioning,
  pipelineManagement,
  teamingPartnerSelection,
  edwosbCertification,
  abilityOneProgram,
  veteranBusinessGuide,
  indianIncentiveProgram,
  sdbCertification,
  cybersecurityRequirements,
  exportControls,
  conflictMinerals,
  counterfeitParts,
  ethicsCompliance,
  kickOffMeetings,
  statusReporting,
  earnedValueManagement,
  contractSurveillance,
  deliverablesManagement,
  ghostingCompetitors,
  blackHatReviews,
  gateReviews,
  proposalOralsPrep,
  capturePlans,
  novationAgreements,
  ratification,
  awardFeeContracts,
  letterContracts,
  agencyLevelProtests,
  technicalVolume,
  managementVolume,
  pastPerformanceVolume,
  smallBusinessParticipation,
  pricingVolume,
  gsaMasGuide,
  sewpContracts,
  alliantGwac,
  cioSp4,
  scheduleOrdering,
  contractSpecialistCareer,
  proposalManagerCareer,
  captureManagerCareer,
  healthcareContracting,
  professionalServices,
  howToBidOnGovernmentContracts,
];

export function getGuideBySlug(slug: string): GuideData | undefined {
  return allGuides.find((g) => g.slug === slug);
}
