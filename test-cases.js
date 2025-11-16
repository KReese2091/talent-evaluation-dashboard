// Test cases for AI Writing Coach validation

// Case 1: Should trigger MANY alerts (poor quality example)
const poorKeyPriorities = `She had some goals this year and did a good job achieving them. The results were great and everyone was happy. She's an amazing team player who always delivers excellent work. The metrics were good and showed nice improvement.`;

// Expected alerts:
// - Missing specific goals ✓
// - No measurable results ✓ 
// - No business impact ✓
// - Subjective language: good(2x), great, amazing, excellent, nice ✓
// - Vague language ✓

// Case 2: Jennifer's actual content (should be mostly clean)
const jenniferKeyPriorities = `Primary goals this year were: (1) Develop integrated social media strategy with 25% engagement increase target, (2) Lead Q3 back-to-school campaign execution, and (3) Establish influencer partnership program. Delivered exceptional results: (1) Achieved 34% social engagement increase through data-driven content optimization and A/B testing, exceeding target by 36%, (2) Q3 campaign generated $3.2M revenue (15% above target) with 92% on-time delivery across all channels, (3) Launched influencer program with 12 strategic partnerships yielding 2.8M impressions and 47% higher conversion rates than traditional advertising.`;

// Expected alerts: None or minimal - this is high-quality content

// Case 3: Missing business context (should trigger specific alert)
const noBusinessContext = `Primary goals: (1) Increase engagement by 25%, (2) Launch campaign, (3) Create partnerships. Results: (1) Achieved 34% engagement increase, (2) Campaign completed on time, (3) Established 12 partnerships with good response.`;

// Expected alerts:
// - Missing business impact ✓
// - Vague language (good) ✓