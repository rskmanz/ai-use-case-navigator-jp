import { UseCase, UseCaseCategory, DifficultyLevel, Industry, UserRole, CostRange, ToolCategory, MCPCategory } from '@/types';

export const useCases: UseCase[] = [
  {
    id: 'email-automation-sequences',
    title: 'Automated Email Follow-up Sequences',
    description: 'Set up intelligent email automation that responds to customer behavior, sends personalized follow-ups, and nurtures leads through the sales funnel automatically.',
    category: UseCaseCategory.BUSINESS_AUTOMATION,
    difficulty: DifficultyLevel.BEGINNER,
    timeToImplement: '2-4 hours',
    roiExpected: '50% time savings, 25% increase in conversion rates',
    estimatedCost: CostRange.LOW,
    featured: true,
    popularity: 95,
    lastUpdated: new Date('2024-12-01'),
    industry: [Industry.MARKETING, Industry.SALES, Industry.STARTUP],
    userRoles: [UserRole.MARKETING_MANAGER, UserRole.SALES_MANAGER, UserRole.ENTREPRENEUR],
    tags: ['email', 'automation', 'CRM', 'lead-nurturing', 'conversion'],
    externalResources: [
      {
        id: 'mailchimp-automation',
        title: 'Mailchimpメール自動化',
        description: '初心者にも使いやすいメールマーケティングツールで、ドラッグ＆ドロップで簡単に自動化設定ができます',
        url: 'https://mailchimp.com',
        type: 'service',
        isPaid: true,
        rating: 4.5
      },
      {
        id: 'convertkit',
        title: 'ConvertKit',
        description: 'クリエイター向けのメールマーケティングプラットフォーム。高度なセグメンテーション機能',
        url: 'https://convertkit.com',
        type: 'service',
        isPaid: true,
        rating: 4.7
      }
    ],
    relatedVideos: [
      {
        id: 'email-automation-basics',
        title: 'メール自動化の基本と始め方',
        description: 'メールマーケティング初心者のための完全ガイド。自動化の設定から成果測定までをわかりやすく解説',
        url: 'https://youtube.com/watch?v=example1',
        platform: 'youtube',
        duration: '15:30',
        author: 'マーケティング大学',
        publishedAt: new Date('2024-10-15')
      }
    ],
    relatedArticles: [
      {
        id: 'email-automation-best-practices',
        title: 'メール自動化で結果を出すベストプラクティス20選',
        description: 'メールマーケティングのプロが実践している自動化のノイハウを徹底解説。開封率やクリック率を大幅に改善する方法',
        url: 'https://example.com/email-automation-best-practices',
        author: '佐藤健太',
        publishedAt: new Date('2024-11-01'),
        readingTime: '8分',
        source: 'マーケティングラボ'
      }
    ],
    tools: [
      {
        id: 'hubspot-breeze',
        name: 'HubSpot Breeze',
        description: 'AI-powered CRM with intelligent email automation',
        website: 'https://hubspot.com',
        pricing: '$45/month',
        category: ToolCategory.CRM,
        difficulty: DifficultyLevel.BEGINNER,
        features: ['Email automation', 'Lead scoring', 'Behavioral triggers', 'A/B testing'],
        integrations: ['Gmail', 'Outlook', 'Slack', 'Salesforce'],
        mcpServer: {
          id: 'hubspot-mcp',
          name: 'HubSpot MCP Server',
          description: 'Connect AI assistants to HubSpot CRM and marketing tools',
          repository: 'https://github.com/community/hubspot-mcp-server',
          installCommand: 'npx @community/hubspot-mcp-server',
          configExample: `{
  "mcpServers": {
    "hubspot": {
      "command": "npx",
      "args": ["@community/hubspot-mcp-server"],
      "env": {
        "HUBSPOT_API_KEY": "your_api_key_here"
      }
    }
  }
}`,
          capabilities: ['Contact management', 'Deal tracking', 'Email automation', 'Report generation'],
          requirements: ['HubSpot account', 'API key'],
          category: MCPCategory.API_INTEGRATION,
          official: false,
          documentation: 'https://docs.hubspot.com/api'
        }
      },
      {
        id: 'zapier-ai',
        name: 'Zapier with AI',
        description: 'Workflow automation platform with AI-powered triggers',
        website: 'https://zapier.com',
        pricing: '$20/month',
        category: ToolCategory.AUTOMATION,
        difficulty: DifficultyLevel.BEGINNER,
        features: ['6000+ integrations', 'AI automation', 'Multi-step workflows', 'Conditional logic'],
        integrations: ['Gmail', 'Slack', 'Google Sheets', 'HubSpot', 'Salesforce']
      }
    ],
    steps: [
      {
        id: 'step-1',
        title: 'Set up email automation platform',
        description: 'Connect your email platform and CRM to enable automated workflows',
        duration: '30 minutes',
        difficulty: DifficultyLevel.BEGINNER,
        prerequisites: ['Email platform access', 'CRM account'],
        resources: [
          {
            title: 'HubSpot Email Automation Guide',
            url: 'https://knowledge.hubspot.com/email/create-automated-emails',
            type: 'documentation'
          }
        ]
      },
      {
        id: 'step-2',
        title: 'Create customer journey maps',
        description: 'Define the different paths customers take and what emails they should receive at each stage',
        duration: '1 hour',
        difficulty: DifficultyLevel.BEGINNER,
        prerequisites: ['Understanding of customer lifecycle'],
        resources: [
          {
            title: 'Customer Journey Mapping Template',
            url: 'https://blog.hubspot.com/service/what-is-a-customer-journey-map',
            type: 'template'
          }
        ]
      },
      {
        id: 'step-3',
        title: 'Configure behavioral triggers',
        description: 'Set up triggers based on customer actions like email opens, website visits, or purchase behavior',
        duration: '45 minutes',
        difficulty: DifficultyLevel.INTERMEDIATE,
        prerequisites: ['Journey maps completed', 'Tracking pixels installed'],
        resources: [
          {
            title: 'Email Trigger Setup Tutorial',
            url: 'https://academy.hubspot.com/lessons/workflows-triggers',
            type: 'tutorial'
          }
        ]
      },
      {
        id: 'step-4',
        title: 'Create personalized email templates',
        description: 'Design email templates with dynamic content that adapts to each recipient',
        duration: '1.5 hours',
        difficulty: DifficultyLevel.BEGINNER,
        prerequisites: ['Brand guidelines', 'Content strategy'],
        resources: [
          {
            title: 'Email Template Best Practices',
            url: 'https://blog.hubspot.com/marketing/email-template-examples',
            type: 'blog-post'
          }
        ]
      },
      {
        id: 'step-5',
        title: 'Test and optimize campaigns',
        description: 'Run A/B tests on subject lines, content, and timing to improve performance',
        duration: '30 minutes setup + ongoing monitoring',
        difficulty: DifficultyLevel.INTERMEDIATE,
        prerequisites: ['Active email campaigns', 'Analytics access'],
        resources: [
          {
            title: 'Email A/B Testing Guide',
            url: 'https://blog.hubspot.com/marketing/how-to-a-b-test-emails',
            type: 'tutorial'
          }
        ]
      }
    ]
  },
  {
    id: 'ai-customer-support-chatbot',
    title: 'AI-Powered Customer Support Chatbot',
    description: 'Deploy an intelligent chatbot that handles 80% of customer inquiries automatically, escalates complex issues to humans, and learns from every interaction.',
    category: UseCaseCategory.CUSTOMER_SERVICE,
    difficulty: DifficultyLevel.INTERMEDIATE,
    timeToImplement: '1-2 days',
    roiExpected: '60% reduction in support tickets, 24/7 availability',
    estimatedCost: CostRange.MEDIUM,
    featured: true,
    popularity: 88,
    lastUpdated: new Date('2024-11-28'),
    industry: [Industry.TECHNOLOGY, Industry.RETAIL, Industry.HEALTHCARE],
    userRoles: [UserRole.BUSINESS_ANALYST, UserRole.PROJECT_MANAGER],
    tags: ['chatbot', 'customer-service', 'AI', 'automation', '24/7-support'],
    tools: [
      {
        id: 'intercom-fin',
        name: 'Intercom Fin',
        description: 'Advanced AI chatbot with complex query resolution',
        website: 'https://intercom.com/fin',
        pricing: '$120/month',
        category: ToolCategory.COMMUNICATION,
        difficulty: DifficultyLevel.INTERMEDIATE,
        features: ['Natural language processing', 'Knowledge base integration', 'Human handoff', 'Multi-language support'],
        integrations: ['Slack', 'Salesforce', 'Zendesk', 'Help Scout']
      },
      {
        id: 'zendesk-ai',
        name: 'Zendesk AI',
        description: 'Customer service platform with built-in AI capabilities',
        website: 'https://zendesk.com',
        pricing: '$99/agent/month',
        category: ToolCategory.COMMUNICATION,
        difficulty: DifficultyLevel.INTERMEDIATE,
        features: ['Automated ticket routing', 'AI-powered responses', 'Sentiment analysis', 'Performance analytics'],
        integrations: ['Slack', 'Jira', 'Salesforce', 'Shopify']
      }
    ],
    steps: [
      {
        id: 'step-1',
        title: 'Analyze support ticket patterns',
        description: 'Review your most common customer inquiries to identify automation opportunities',
        duration: '2 hours',
        difficulty: DifficultyLevel.BEGINNER,
        prerequisites: ['Access to support ticket history'],
        resources: [
          {
            title: 'Support Ticket Analysis Template',
            url: 'https://support.zendesk.com/hc/en-us/articles/203691156',
            type: 'template'
          }
        ]
      },
      {
        id: 'step-2',
        title: 'Build comprehensive knowledge base',
        description: 'Create detailed articles and FAQs that the AI can reference when answering questions',
        duration: '4-6 hours',
        difficulty: DifficultyLevel.INTERMEDIATE,
        prerequisites: ['Product documentation', 'Common support responses'],
        resources: [
          {
            title: 'Knowledge Base Best Practices',
            url: 'https://www.intercom.com/help/en/articles/290-knowledge-base-best-practices',
            type: 'documentation'
          }
        ]
      },
      {
        id: 'step-3',
        title: 'Configure AI chatbot responses',
        description: 'Train the AI on your specific use cases and set up response flows',
        duration: '3-4 hours',
        difficulty: DifficultyLevel.INTERMEDIATE,
        prerequisites: ['Knowledge base completed', 'Brand voice guidelines'],
        resources: [
          {
            title: 'Chatbot Training Tutorial',
            url: 'https://www.intercom.com/help/en/articles/3-chatbot-training',
            type: 'tutorial'
          }
        ]
      },
      {
        id: 'step-4',
        title: 'Set up escalation workflows',
        description: 'Define when and how complex queries should be transferred to human agents',
        duration: '1 hour',
        difficulty: DifficultyLevel.BEGINNER,
        prerequisites: ['Team structure defined', 'Escalation criteria established'],
        resources: [
          {
            title: 'Escalation Workflow Guide',
            url: 'https://support.zendesk.com/hc/en-us/articles/escalation-workflows',
            type: 'documentation'
          }
        ]
      },
      {
        id: 'step-5',
        title: 'Monitor and improve performance',
        description: 'Track chatbot effectiveness and continuously refine responses based on user feedback',
        duration: 'Ongoing - 30 minutes weekly',
        difficulty: DifficultyLevel.INTERMEDIATE,
        prerequisites: ['Analytics access', 'Feedback collection system'],
        resources: [
          {
            title: 'Chatbot Analytics Dashboard',
            url: 'https://www.intercom.com/help/en/articles/chatbot-analytics',
            type: 'tutorial'
          }
        ]
      }
    ]
  },
  {
    id: 'automated-content-creation',
    title: 'AI Content Creation Pipeline',
    description: 'Build an automated system that researches topics, generates blog posts, creates social media content, and schedules everything across multiple platforms.',
    category: UseCaseCategory.CONTENT_CREATION,
    difficulty: DifficultyLevel.INTERMEDIATE,
    timeToImplement: '3-5 hours',
    roiExpected: '70% faster content production, 40% cost reduction',
    estimatedCost: CostRange.MEDIUM,
    featured: true,
    popularity: 92,
    lastUpdated: new Date('2024-12-01'),
    industry: [Industry.MARKETING, Industry.STARTUP, Industry.CONSULTING],
    userRoles: [UserRole.MARKETING_MANAGER, UserRole.ENTREPRENEUR, UserRole.CONSULTANT],
    tags: ['content', 'automation', 'social-media', 'blog', 'SEO'],
    tools: [
      {
        id: 'jasper-ai',
        name: 'Jasper AI',
        description: 'AI writing assistant for brand-consistent content',
        website: 'https://jasper.ai',
        pricing: '$99/month',
        category: ToolCategory.AI_ASSISTANT,
        difficulty: DifficultyLevel.INTERMEDIATE,
        features: ['Brand voice training', 'Long-form content', 'Template library', 'Plagiarism detection'],
        integrations: ['Google Docs', 'WordPress', 'Shopify', 'Webflow']
      },
      {
        id: 'buffer-ai',
        name: 'Buffer AI',
        description: 'Social media management with AI-powered scheduling',
        website: 'https://buffer.com',
        pricing: '$50/month',
        category: ToolCategory.COMMUNICATION,
        difficulty: DifficultyLevel.BEGINNER,
        features: ['Multi-platform posting', 'Optimal timing', 'Analytics', 'Content library'],
        integrations: ['Facebook', 'Twitter', 'LinkedIn', 'Instagram', 'TikTok']
      }
    ],
    steps: [
      {
        id: 'step-1',
        title: 'Define content strategy and topics',
        description: 'Create a content calendar with relevant topics for your audience',
        duration: '2 hours',
        difficulty: DifficultyLevel.BEGINNER,
        prerequisites: ['Target audience defined', 'Brand guidelines'],
        resources: [
          {
            title: 'Content Strategy Template',
            url: 'https://blog.hubspot.com/marketing/content-strategy-template',
            type: 'template'
          }
        ]
      },
      {
        id: 'step-2',
        title: 'Set up AI writing tools',
        description: 'Configure AI tools with your brand voice and content guidelines',
        duration: '1 hour',
        difficulty: DifficultyLevel.BEGINNER,
        prerequisites: ['Brand voice documented', 'Writing samples'],
        resources: [
          {
            title: 'Jasper Brand Voice Guide',
            url: 'https://docs.jasper.ai/docs/brand-voice',
            type: 'documentation'
          }
        ]
      },
      {
        id: 'step-3',
        title: 'Create content templates',
        description: 'Build reusable templates for different content types (blogs, social posts, emails)',
        duration: '1.5 hours',
        difficulty: DifficultyLevel.INTERMEDIATE,
        prerequisites: ['Content types identified', 'Style guide ready'],
        resources: [
          {
            title: 'Content Template Library',
            url: 'https://blog.jasper.ai/content-templates/',
            type: 'template'
          }
        ]
      },
      {
        id: 'step-4',
        title: 'Automate content distribution',
        description: 'Set up workflows to automatically publish content across platforms',
        duration: '45 minutes',
        difficulty: DifficultyLevel.INTERMEDIATE,
        prerequisites: ['Social media accounts', 'Publishing schedule'],
        resources: [
          {
            title: 'Buffer Automation Setup',
            url: 'https://buffer.com/help/article/1051-automation-features',
            type: 'tutorial'
          }
        ]
      },
      {
        id: 'step-5',
        title: 'Monitor and optimize performance',
        description: 'Track content performance and refine your AI prompts for better results',
        duration: 'Ongoing - 1 hour weekly',
        difficulty: DifficultyLevel.INTERMEDIATE,
        prerequisites: ['Analytics tools set up', 'Performance KPIs defined'],
        resources: [
          {
            title: 'Content Performance Analytics',
            url: 'https://buffer.com/resources/content-marketing-analytics',
            type: 'blog-post'
          }
        ]
      }
    ]
  },
  {
    id: 'mcp-development-workflow',
    title: 'MCP-Powered Development Workflow',
    description: 'Create an integrated development environment using MCP servers for GitHub, file system operations, and automated code review processes.',
    category: UseCaseCategory.DEVELOPMENT,
    difficulty: DifficultyLevel.ADVANCED,
    timeToImplement: '4-6 hours',
    roiExpected: '50% faster code reviews, 40% reduction in bugs',
    estimatedCost: CostRange.LOW,
    featured: true,
    popularity: 76,
    lastUpdated: new Date('2024-12-01'),
    industry: [Industry.TECHNOLOGY, Industry.STARTUP],
    userRoles: [UserRole.DEVELOPER, UserRole.PROJECT_MANAGER],
    tags: ['MCP', 'development', 'GitHub', 'automation', 'code-review'],
    tools: [
      {
        id: 'github-mcp',
        name: 'GitHub MCP Server',
        description: 'Official MCP server for GitHub integration',
        website: 'https://github.com/modelcontextprotocol/servers',
        pricing: 'Free',
        category: ToolCategory.DEVELOPMENT,
        difficulty: DifficultyLevel.ADVANCED,
        features: ['Repository management', 'File operations', 'Issue tracking', 'Pull request automation'],
        integrations: ['Claude Desktop', 'VS Code', 'Command line'],
        mcpServer: {
          id: 'github-official',
          name: 'GitHub MCP Server',
          description: 'Official GitHub integration for Model Context Protocol',
          repository: 'https://github.com/modelcontextprotocol/servers/tree/main/src/github',
          installCommand: 'npx @modelcontextprotocol/server-github',
          configExample: `{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your_token_here"
      }
    }
  }
}`,
          capabilities: ['Repository operations', 'File management', 'Issue creation', 'PR management'],
          requirements: ['GitHub account', 'Personal access token'],
          category: MCPCategory.DEVELOPMENT,
          official: true,
          documentation: 'https://modelcontextprotocol.io/docs/servers/github'
        }
      },
      {
        id: 'filesystem-mcp',
        name: 'Filesystem MCP Server',
        description: 'Secure file operations with configurable access controls',
        website: 'https://github.com/modelcontextprotocol/servers',
        pricing: 'Free',
        category: ToolCategory.DEVELOPMENT,
        difficulty: DifficultyLevel.INTERMEDIATE,
        features: ['File reading/writing', 'Directory operations', 'Secure access controls', 'Path restrictions'],
        integrations: ['Claude Desktop', 'VS Code'],
        mcpServer: {
          id: 'filesystem-official',
          name: 'Filesystem MCP Server',
          description: 'Official filesystem operations for Model Context Protocol',
          repository: 'https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem',
          installCommand: 'npx @modelcontextprotocol/server-filesystem',
          configExample: `{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/path/to/allowed/directory"
      ]
    }
  }
}`,
          capabilities: ['Read files', 'Write files', 'List directories', 'Create directories'],
          requirements: ['File system access', 'Directory permissions'],
          category: MCPCategory.FILESYSTEM,
          official: true,
          documentation: 'https://modelcontextprotocol.io/docs/servers/filesystem'
        }
      }
    ],
    steps: [
      {
        id: 'step-1',
        title: 'Install Claude Desktop and MCP servers',
        description: 'Set up Claude Desktop and install required MCP servers for development workflow',
        duration: '30 minutes',
        difficulty: DifficultyLevel.INTERMEDIATE,
        prerequisites: ['Claude Desktop access', 'Node.js installed'],
        code: `# Install GitHub MCP server
npx @modelcontextprotocol/server-github

# Install Filesystem MCP server  
npx @modelcontextprotocol/server-filesystem`,
        codeLanguage: 'bash',
        resources: [
          {
            title: 'Claude Desktop Setup Guide',
            url: 'https://docs.anthropic.com/claude/docs/claude-desktop',
            type: 'documentation'
          }
        ]
      },
      {
        id: 'step-2',
        title: 'Configure MCP servers',
        description: 'Set up configuration file with GitHub token and filesystem access',
        duration: '15 minutes',
        difficulty: DifficultyLevel.INTERMEDIATE,
        prerequisites: ['GitHub personal access token', 'Project directory identified'],
        code: `{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_your_token_here"
      }
    },
    "filesystem": {
      "command": "npx", 
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/path/to/your/projects"
      ]
    }
  }
}`,
        codeLanguage: 'json',
        resources: [
          {
            title: 'GitHub Token Creation Guide',
            url: 'https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token',
            type: 'documentation'
          }
        ]
      },
      {
        id: 'step-3',
        title: 'Create automated code review workflow',
        description: 'Set up AI-powered code review process using GitHub MCP integration',
        duration: '2 hours',
        difficulty: DifficultyLevel.ADVANCED,
        prerequisites: ['MCP servers configured', 'GitHub repository access'],
        resources: [
          {
            title: 'Code Review Automation Tutorial',
            url: 'https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests',
            type: 'tutorial'
          }
        ]
      },
      {
        id: 'step-4',
        title: 'Implement project documentation automation',
        description: 'Use filesystem MCP to automatically update documentation based on code changes',
        duration: '1.5 hours',
        difficulty: DifficultyLevel.ADVANCED,
        prerequisites: ['Documentation structure defined', 'Code analysis setup'],
        resources: [
          {
            title: 'Automated Documentation Best Practices',
            url: 'https://about.gitlab.com/blog/2022/10/26/documentation-automation/',
            type: 'blog-post'
          }
        ]
      },
      {
        id: 'step-5',
        title: 'Monitor and optimize workflow',
        description: 'Track workflow performance and continuously improve automation rules',
        duration: 'Ongoing - 30 minutes weekly',
        difficulty: DifficultyLevel.INTERMEDIATE,
        prerequisites: ['Workflow metrics defined', 'Performance tracking setup'],
        resources: [
          {
            title: 'Development Workflow Metrics',
            url: 'https://github.blog/2023-01-19-how-to-measure-developer-productivity/',
            type: 'blog-post'
          }
        ]
      }
    ]
  },
  {
    id: 'data-analysis-dashboard',
    title: 'Automated Business Intelligence Dashboard',
    description: 'Create real-time dashboards that automatically collect data from multiple sources, generate insights, and alert stakeholders to important trends.',
    category: UseCaseCategory.DATA_ANALYSIS,
    difficulty: DifficultyLevel.ADVANCED,
    timeToImplement: '1-2 days',
    roiExpected: '60% faster insights, 35% better decision making',
    estimatedCost: CostRange.HIGH,
    featured: false,
    popularity: 73,
    lastUpdated: new Date('2024-11-30'),
    industry: [Industry.ENTERPRISE, Industry.FINANCE, Industry.RETAIL],
    userRoles: [UserRole.DATA_ANALYST, UserRole.EXECUTIVE, UserRole.BUSINESS_ANALYST],
    tags: ['dashboard', 'BI', 'data-visualization', 'automation', 'analytics'],
    tools: [
      {
        id: 'tableau-ai',
        name: 'Tableau with AI',
        description: 'Advanced data visualization with AI-powered insights',
        website: 'https://tableau.com',
        pricing: '$150/user/month',
        category: ToolCategory.ANALYTICS,
        difficulty: DifficultyLevel.ADVANCED,
        features: ['Natural language queries', 'Automated insights', 'Predictive modeling', 'Real-time data'],
        integrations: ['Salesforce', 'Google Analytics', 'SQL databases', 'Cloud platforms']
      },
      {
        id: 'power-bi',
        name: 'Microsoft Power BI',
        description: 'Business analytics with AI and machine learning',
        website: 'https://powerbi.microsoft.com',
        pricing: '$20/user/month',
        category: ToolCategory.ANALYTICS,
        difficulty: DifficultyLevel.INTERMEDIATE,
        features: ['Automated ML', 'Natural language Q&A', 'Real-time streaming', 'Mobile apps'],
        integrations: ['Office 365', 'Azure', 'Dynamics 365', 'Third-party connectors']
      }
    ],
    steps: [
      {
        id: 'step-1',
        title: 'Define key metrics and data sources',
        description: 'Identify the most important KPIs and where the data lives across your organization',
        duration: '2-3 hours',
        difficulty: DifficultyLevel.INTERMEDIATE,
        prerequisites: ['Stakeholder interviews', 'Current reporting audit'],
        resources: [
          {
            title: 'KPI Definition Framework',
            url: 'https://help.tableau.com/current/pro/desktop/en-us/datasource_plan.htm',
            type: 'documentation'
          }
        ]
      },
      {
        id: 'step-2',
        title: 'Set up data connections and ETL',
        description: 'Connect to all data sources and establish automated data pipelines',
        duration: '4-6 hours',
        difficulty: DifficultyLevel.ADVANCED,
        prerequisites: ['Database access credentials', 'API keys', 'Data mapping complete'],
        resources: [
          {
            title: 'Data Pipeline Best Practices',
            url: 'https://docs.microsoft.com/en-us/power-bi/guidance/powerbi-implementation-planning-content-lifecycle-management',
            type: 'documentation'
          }
        ]
      },
      {
        id: 'step-3',
        title: 'Design interactive dashboards',
        description: 'Create user-friendly dashboards with drill-down capabilities and filters',
        duration: '3-4 hours',
        difficulty: DifficultyLevel.INTERMEDIATE,
        prerequisites: ['Data connections established', 'Design requirements gathered'],
        resources: [
          {
            title: 'Dashboard Design Principles',
            url: 'https://help.tableau.com/current/pro/desktop/en-us/dashboards_best_practices.htm',
            type: 'tutorial'
          }
        ]
      },
      {
        id: 'step-4',
        title: 'Configure automated alerts and insights',
        description: 'Set up AI-powered alerts for anomalies and trend changes',
        duration: '1-2 hours',
        difficulty: DifficultyLevel.ADVANCED,
        prerequisites: ['Thresholds defined', 'Alert criteria established'],
        resources: [
          {
            title: 'Automated Alerting Setup',
            url: 'https://help.tableau.com/current/online/en-us/subscribe_user.htm',
            type: 'tutorial'
          }
        ]
      },
      {
        id: 'step-5',
        title: 'Deploy and train users',
        description: 'Roll out dashboards to stakeholders and provide training on insights interpretation',
        duration: '2-3 hours',
        difficulty: DifficultyLevel.BEGINNER,
        prerequisites: ['User access configured', 'Training materials prepared'],
        resources: [
          {
            title: 'Dashboard User Training Guide',
            url: 'https://community.tableau.com/s/topic/0TO1T000000gNNXWA2/training',
            type: 'tutorial'
          }
        ]
      }
    ]
  }
];

export const getUseCasesByCategory = (category: UseCaseCategory): UseCase[] => {
  return useCases.filter(useCase => useCase.category === category);
};

export const getFeaturedUseCases = (): UseCase[] => {
  return useCases.filter(useCase => useCase.featured).sort((a, b) => b.popularity - a.popularity);
};

export const getUseCasesByDifficulty = (difficulty: DifficultyLevel): UseCase[] => {
  return useCases.filter(useCase => useCase.difficulty === difficulty);
};

export const searchUseCases = (query: string): UseCase[] => {
  const lowercaseQuery = query.toLowerCase();
  return useCases.filter(useCase => 
    useCase.title.toLowerCase().includes(lowercaseQuery) ||
    useCase.description.toLowerCase().includes(lowercaseQuery) ||
    useCase.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    useCase.tools.some(tool => tool.name.toLowerCase().includes(lowercaseQuery))
  );
};