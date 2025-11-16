// Test AI Writing Coach accuracy on demo samples
// This file helps identify any false positives or missed issues

const testCases = {
    // Jennifer Martinez - Key Priorities (should be mostly clean)
    jenniferKeyPriorities: `Primary goals this year were: (1) Develop integrated social media strategy with 25% engagement increase target, (2) Lead Q3 back-to-school campaign execution, and (3) Establish influencer partnership program. Delivered exceptional results: (1) Achieved 34% social engagement increase through data-driven content optimization and A/B testing, exceeding target by 36%, (2) Q3 campaign generated $3.2M revenue (15% above target) with 92% on-time delivery across all channels, (3) Launched influencer program with 12 strategic partnerships yielding 2.8M impressions and 47% higher conversion rates than traditional advertising.`,
    
    // Expected alerts for Jennifer: 
    // - Possible "exceptional" as subjective language
    // - Should NOT flag: missing goals, results, metrics, or business impact
    
    // Test case with actual issues (should trigger multiple alerts)
    poorExample: `She did a good job this year. Her main goal was to improve things and she accomplished most of what we asked. The results were nice and everyone was happy with her work. She's a great team player.`,
    
    // Expected alerts for poor example:
    // - Missing specific goals
    // - No measurable results  
    // - No business impact
    // - Vague language (good, nice, great)
    // - No metrics or specificity
};

// Function to test AI Writing Coach accuracy
function testAICoachAccuracy(text, expectedCleanAreas, expectedIssues) {
    // This would simulate the analyzeFeedback function
    console.log('Testing text:', text.substring(0, 50) + '...');
    console.log('Should NOT flag:', expectedCleanAreas);
    console.log('Should flag:', expectedIssues);
}