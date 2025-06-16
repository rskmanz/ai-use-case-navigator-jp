// Data migration script to populate Supabase with use cases and tools
const { createClient } = require('@supabase/supabase-js');

// Configuration
const supabaseUrl = 'https://nvnwsgddikyzfqkrcdmd.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY; // You'll need to set this

if (!supabaseServiceKey) {
  console.error('Please set SUPABASE_SERVICE_KEY environment variable');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Sample use cases data
const useCasesData = [
  {
    title: 'Automated Email Follow-up Sequences',
    description: 'Set up intelligent email automation that responds to customer behavior, sends personalized follow-ups, and nurtures leads through the sales funnel automatically.',
    category_slug: 'business-automation',
    difficulty: 'beginner',
    time_to_implement: '2-4 hours',
    roi_expected: '50% time savings, 25% increase in conversion rates',
    estimated_cost: 'low',
    is_featured: true,
    popularity: 95,
    tags: ['email', 'automation', 'CRM', 'lead-nurturing', 'conversion'],
    industries: ['marketing', 'startup', 'enterprise'],
    user_roles: ['marketing-manager', 'sales-manager', 'entrepreneur'],
    tools: [
      {
        name: 'HubSpot Breeze',
        description: 'AI-powered CRM with intelligent email automation',
        website: 'https://hubspot.com',
        pricing: '$45/month',
        category: 'crm',
        difficulty: 'beginner',
        features: ['Email automation', 'Lead scoring', 'Behavioral triggers', 'A/B testing'],
        integrations: ['Gmail', 'Outlook', 'Slack', 'Salesforce']
      }
    ],
    steps: [
      {
        step_number: 1,
        title: 'Set up email automation platform',
        description: 'Connect your email platform and CRM to enable automated workflows',
        duration: '30 minutes',
        difficulty: 'beginner',
        prerequisites: ['Email platform access', 'CRM account'],
        resources: [
          {
            title: 'HubSpot Email Automation Guide',
            url: 'https://knowledge.hubspot.com/email/create-automated-emails',
            type: 'documentation'
          }
        ]
      }
    ]
  },
  {
    title: 'AI-Powered Customer Support Chatbot',
    description: 'Deploy an intelligent chatbot that handles 80% of customer inquiries automatically, escalates complex issues to humans, and learns from every interaction.',
    category_slug: 'customer-service',
    difficulty: 'intermediate',
    time_to_implement: '1-2 days',
    roi_expected: '60% reduction in support tickets, 24/7 availability',
    estimated_cost: 'medium',
    is_featured: true,
    popularity: 88,
    tags: ['chatbot', 'customer-service', 'AI', 'automation', '24/7-support'],
    industries: ['technology', 'retail', 'healthcare'],
    user_roles: ['business-analyst', 'project-manager'],
    tools: [
      {
        name: 'Intercom Fin',
        description: 'Advanced AI chatbot with complex query resolution',
        website: 'https://intercom.com/fin',
        pricing: '$120/month',
        category: 'communication',
        difficulty: 'intermediate',
        features: ['Natural language processing', 'Knowledge base integration', 'Human handoff', 'Multi-language support'],
        integrations: ['Slack', 'Salesforce', 'Zendesk', 'Help Scout']
      }
    ],
    steps: [
      {
        step_number: 1,
        title: 'Analyze support ticket patterns',
        description: 'Review your most common customer inquiries to identify automation opportunities',
        duration: '2 hours',
        difficulty: 'beginner',
        prerequisites: ['Access to support ticket history'],
        resources: [
          {
            title: 'Support Ticket Analysis Template',
            url: 'https://support.zendesk.com/hc/en-us/articles/203691156',
            type: 'template'
          }
        ]
      }
    ]
  }
];

async function migrateData() {
  console.log('Starting data migration...');

  try {
    // 1. Get category IDs
    console.log('Fetching categories...');
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('id, slug');

    if (categoriesError) throw categoriesError;

    const categoryMap = {};
    categories.forEach(cat => {
      categoryMap[cat.slug] = cat.id;
    });

    // 2. Migrate use cases
    for (const useCaseData of useCasesData) {
      console.log(`Migrating use case: ${useCaseData.title}`);

      // Insert tools first
      const toolIds = [];
      for (const toolData of useCaseData.tools) {
        const { data: tool, error: toolError } = await supabase
          .from('tools')
          .insert({
            name: toolData.name,
            description: toolData.description,
            website: toolData.website,
            pricing: toolData.pricing,
            category: toolData.category,
            difficulty: toolData.difficulty,
            features: toolData.features,
            integrations: toolData.integrations
          })
          .select()
          .single();

        if (toolError) {
          console.error('Tool insert error:', toolError);
          continue;
        }

        toolIds.push(tool.id);
      }

      // Insert use case
      const { data: useCase, error: useCaseError } = await supabase
        .from('use_cases')
        .insert({
          title: useCaseData.title,
          description: useCaseData.description,
          category_id: categoryMap[useCaseData.category_slug],
          difficulty: useCaseData.difficulty,
          time_to_implement: useCaseData.time_to_implement,
          roi_expected: useCaseData.roi_expected,
          estimated_cost: useCaseData.estimated_cost,
          is_featured: useCaseData.is_featured,
          popularity: useCaseData.popularity,
          tags: useCaseData.tags,
          industries: useCaseData.industries,
          user_roles: useCaseData.user_roles
        })
        .select()
        .single();

      if (useCaseError) {
        console.error('Use case insert error:', useCaseError);
        continue;
      }

      // Link tools to use case
      for (const toolId of toolIds) {
        await supabase
          .from('use_case_tools')
          .insert({
            use_case_id: useCase.id,
            tool_id: toolId,
            is_primary: true
          });
      }

      // Insert implementation steps
      for (const stepData of useCaseData.steps) {
        const { data: step, error: stepError } = await supabase
          .from('implementation_steps')
          .insert({
            use_case_id: useCase.id,
            step_number: stepData.step_number,
            title: stepData.title,
            description: stepData.description,
            duration: stepData.duration,
            difficulty: stepData.difficulty,
            prerequisites: stepData.prerequisites
          })
          .select()
          .single();

        if (stepError) {
          console.error('Step insert error:', stepError);
          continue;
        }

        // Insert resources for each step
        for (const resourceData of stepData.resources) {
          await supabase
            .from('resources')
            .insert({
              step_id: step.id,
              title: resourceData.title,
              url: resourceData.url,
              type: resourceData.type
            });
        }
      }

      console.log(`✅ Successfully migrated: ${useCaseData.title}`);
    }

    console.log('✅ Data migration completed successfully!');
    
    // Show summary
    const { count: useCaseCount } = await supabase
      .from('use_cases')
      .select('*', { count: 'exact', head: true });
    
    const { count: toolCount } = await supabase
      .from('tools')
      .select('*', { count: 'exact', head: true });

    console.log(`📊 Summary:`);
    console.log(`   Use Cases: ${useCaseCount}`);
    console.log(`   Tools: ${toolCount}`);

  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

// Run migration
migrateData();