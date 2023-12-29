import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seedAlcoholCalculation() {
    try {
        await prisma.drink_formula.deleteMany({});
        await prisma.drink_formula.createMany({
            skipDuplicates: true,
            data: [
                { drinkName: 'Lager', drinkVolume: 'Pint', drinkPriceUK: 4.68, drinkPriceLondon: 6.32, drinkCalories: 222, drinkUnits: 2, sourceLink: 'https://www.nhs.uk/live-well/alcohol-advice/calories-in-alcohol/' },
                { drinkName: 'Lager', drinkVolume: 'Half', drinkPriceUK: 2.34, drinkPriceLondon: 3.16, drinkCalories: 111, drinkUnits: 1 },
                { drinkName: 'Lager', drinkVolume: 'Bottle', drinkPriceUK: 3.80, drinkPriceLondon: 4.50, drinkCalories: 116, drinkUnits: 1 },
                { drinkName: 'Ale', drinkVolume: 'Pint', drinkPriceUK: 3.60, drinkPriceLondon: 5.10, drinkCalories: 222, drinkUnits: 2 },
                { drinkName: 'Ale', drinkVolume: 'Half', drinkPriceUK: 1.80, drinkPriceLondon: 2.55, drinkCalories: 111, drinkUnits: 1 },
                { drinkName: 'Ale', drinkVolume: 'Bottle', drinkPriceUK: 2.80, drinkPriceLondon: 4.00, drinkCalories: 167, drinkUnits: 1 },
                { drinkName: 'Stout', drinkVolume: 'Pint', drinkPriceUK: 3.60, drinkPriceLondon: 5.10, drinkCalories: 250, drinkUnits: 2 },
                { drinkName: 'Stout', drinkVolume: 'Half', drinkPriceUK: 1.80, drinkPriceLondon: 2.55, drinkCalories: 125, drinkUnits: 1 },
                { drinkName: 'Stout', drinkVolume: 'Bottle', drinkPriceUK: 2.80, drinkPriceLondon: 4.00, drinkCalories: 167, drinkUnits: 1 },
                { drinkName: 'Wine', drinkVolume: '175ml', drinkPriceUK: 4.68, drinkCalories: 178, drinkUnits: 2.1 },
                { drinkName: 'Wine', drinkVolume: '250ml', drinkPriceUK: 6.69, drinkCalories: 254, drinkUnits: 3 },
                { drinkName: 'Wine', drinkVolume: '750ml', drinkPriceUK: 20.06, drinkCalories: 763, drinkUnits: 9 },
                // { drinkName: 'Spirits', drinkVolume: '25ml', drinkPriceUK: 3, drinkUnits: 1 },
                // { drinkName: 'Spirits', drinkVolume: '50ml', drinkPriceUK: 6, drinkUnits: 2 },
            ],
        });
        console.log('Alcohol calculations(cost, units, calories) data inserted successfully.');
    } catch (error) {
        console.error('Error seeding Alcohol calculations data:', error);
    } finally {
        await prisma.$disconnect();
    }
}

seedAlcoholCalculation();

async function seedDrinkingInsights() {
    try {
        await prisma.drinking_insights.deleteMany({});
        const insightsData = [
            // Insights for Male AGE_16_24
            { ageGroup: "AGE_16_24", gender: "MALE", habit: "Non-drinker", insight: "35% of men your age are also non-drinkers." },
            { ageGroup: "AGE_16_24", gender: "MALE", habit: "Up to 14 units", insight: "35% of men your age drink less than you." },
            { ageGroup: "AGE_16_24", gender: "MALE", habit: "14-21 units", insight: "81% of men your age drink less than you." },
            { ageGroup: "AGE_16_24", gender: "MALE", habit: "21-35 units", insight: "87% of men your age drink less than you." },
            { ageGroup: "AGE_16_24", gender: "MALE", habit: "35-50 units", insight: "91% of men your age drink less than you." },
            { ageGroup: "AGE_16_24", gender: "MALE", habit: "More than 50 units", insight: "93% of men your age drink less than you." },

            // Insights for Female AGE_16_24
            { ageGroup: "AGE_16_24", gender: "FEMALE", habit: "Non-drinker", insight: "58% of women your age drink less than you." },
            { ageGroup: "AGE_16_24", gender: "FEMALE", habit: "Up to 14 units", insight: "58% of women your age drink more than you." },
            { ageGroup: "AGE_16_24", gender: "FEMALE", habit: "14-21 units", insight: "89% of women your age drink more than you." },
            { ageGroup: "AGE_16_24", gender: "FEMALE", habit: "21-35 units", insight: "95% of women your age drink more than you." },
            { ageGroup: "AGE_16_24", gender: "FEMALE", habit: "More than 35 units", insight: "99% of women your age drink more than you." },

            // Insights for Male AGE_25_34
            { ageGroup: "AGE_25_34", gender: "MALE", habit: "Non-drinker", insight: "17% of men your age are also non-drinkers." },
            { ageGroup: "AGE_25_34", gender: "MALE", habit: "Up to 14 units", insight: "17% of men your age drink less than you." },
            { ageGroup: "AGE_25_34", gender: "MALE", habit: "14-21 units", insight: "76% of men your age drink less than you." },
            { ageGroup: "AGE_25_34", gender: "MALE", habit: "21-35 units", insight: "87% of men your age drink less than you." },
            { ageGroup: "AGE_25_34", gender: "MALE", habit: "35-50 units", insight: "96% of men your age drink less than you." },
            { ageGroup: "AGE_25_34", gender: "MALE", habit: "More than 50 units", insight: "100% of men your age drink less than you." },

            // Insights for Female AGE_25_34
            { ageGroup: "AGE_25_34", gender: "FEMALE", habit: "Non-drinker", insight: "75% of women your age drink less than you." },
            { ageGroup: "AGE_25_34", gender: "FEMALE", habit: "Up to 14 units", insight: "25% of women your age drink more than you." },
            { ageGroup: "AGE_25_34", gender: "FEMALE", habit: "14-21 units", insight: "89% of women your age drink more than you." },
            { ageGroup: "AGE_25_34", gender: "FEMALE", habit: "21-35 units", insight: "95% of women your age drink more than you." },
            { ageGroup: "AGE_25_34", gender: "FEMALE", habit: "More than 35 units", insight: "99% of women your age drink more than you." },

            // Insights for Male AGE_35_44
            { ageGroup: "AGE_35_44", gender: "MALE", habit: "Non-drinker", insight: "19% of men your age are also non-drinkers." },
            { ageGroup: "AGE_35_44", gender: "MALE", habit: "Up to 14 units", insight: "19% of men your age drink less than you." },
            { ageGroup: "AGE_35_44", gender: "MALE", habit: "14-21 units", insight: "72% of men your age drink less than you." },
            { ageGroup: "AGE_35_44", gender: "MALE", habit: "21-35 units", insight: "85% of men your age drink less than you." },
            { ageGroup: "AGE_35_44", gender: "MALE", habit: "35-50 units", insight: "94% of men your age drink less than you." },
            { ageGroup: "AGE_35_44", gender: "MALE", habit: "More than 50 units", insight: "97% of men your age drink less than you." },

            // Insights for Female AGE_35_44
            { ageGroup: "AGE_35_44", gender: "FEMALE", habit: "Non-drinker", insight: "77% of women your age drink less than you." },
            { ageGroup: "AGE_35_44", gender: "FEMALE", habit: "Up to 14 units", insight: "23% of women your age drink more than you." },
            { ageGroup: "AGE_35_44", gender: "FEMALE", habit: "14-21 units", insight: "87% of women your age drink more than you." },
            { ageGroup: "AGE_35_44", gender: "FEMALE", habit: "21-35 units", insight: "93% of women your age drink more than you." },
            { ageGroup: "AGE_35_44", gender: "FEMALE", habit: "More than 35 units", insight: "99% of women your age drink more than you." },

            // Insights for Male AGE_45_54
            { ageGroup: "AGE_45_54", gender: "MALE", habit: "Non-drinker", insight: "17% of men your age are also non-drinkers." },
            { ageGroup: "AGE_45_54", gender: "MALE", habit: "Up to 14 units", insight: "17% of men your age drink less than you." },
            { ageGroup: "AGE_45_54", gender: "MALE", habit: "14-21 units", insight: "72% of men your age drink less than you." },
            { ageGroup: "AGE_45_54", gender: "MALE", habit: "21-35 units", insight: "81% of men your age drink less than you." },
            { ageGroup: "AGE_45_54", gender: "MALE", habit: "35-50 units", insight: "90% of men your age drink less than you." },
            { ageGroup: "AGE_45_54", gender: "MALE", habit: "More than 50 units", insight: "95% of men your age drink less than you." },

            // Insights for Female AGE_45_54
            { ageGroup: "AGE_45_54", gender: "FEMALE", habit: "Non-drinker", insight: "89% of women your age drink more than you." },
            { ageGroup: "AGE_45_54", gender: "FEMALE", habit: "Up to 14 units", insight: "21% of women your age drink more than you." },
            { ageGroup: "AGE_45_54", gender: "FEMALE", habit: "14-21 units", insight: "79% of women your age drink more than you." },
            { ageGroup: "AGE_45_54", gender: "FEMALE", habit: "21-35 units", insight: "88% of women your age drink more than you." },
            { ageGroup: "AGE_45_54", gender: "FEMALE", habit: "More than 35 units", insight: "98% of women your age drink more than you." },

            // Insights for Male AGE_55_64
            { ageGroup: "AGE_55_64", gender: "MALE", habit: "Non-drinker", insight: "14% of men your age are also non-drinkers." },
            { ageGroup: "AGE_55_64", gender: "MALE", habit: "Up to 14 units", insight: "14% of men your age drink less than you." },
            { ageGroup: "AGE_55_64", gender: "MALE", habit: "14-21 units", insight: "64% of men your age drink less than you." },
            { ageGroup: "AGE_55_64", gender: "MALE", habit: "21-35 units", insight: "75% of men your age drink less than you." },
            { ageGroup: "AGE_55_64", gender: "MALE", habit: "35-50 units", insight: "87% of men your age drink less than you." },
            { ageGroup: "AGE_55_64", gender: "MALE", habit: "More than 50 units", insight: "93% of men your age drink less than you." },

            // Insights for Female AGE_55_64
            { ageGroup: "AGE_55_64", gender: "FEMALE", habit: "Non-drinker", insight: "17% of women your age drink less than you." },
            { ageGroup: "AGE_55_64", gender: "FEMALE", habit: "Up to 14 units", insight: "17% of women your age drink more than you." },
            { ageGroup: "AGE_55_64", gender: "FEMALE", habit: "14-21 units", insight: "79% of women your age drink more than you." },
            { ageGroup: "AGE_55_64", gender: "FEMALE", habit: "21-35 units", insight: "89% of women your age drink more than you." },
            { ageGroup: "AGE_55_64", gender: "FEMALE", habit: "More than 35 units", insight: "99% of women your age drink more than you." },

            // Insights for Male AGE_65_74
            { ageGroup: "AGE_65_74", gender: "MALE", habit: "Non-drinker", insight: "12% of men your age are also non-drinkers." },
            { ageGroup: "AGE_65_74", gender: "MALE", habit: "Up to 14 units", insight: "12% of men your age drink less than you." },
            { ageGroup: "AGE_65_74", gender: "MALE", habit: "14-21 units", insight: "64% of men your age drink less than you." },
            { ageGroup: "AGE_65_74", gender: "MALE", habit: "21-35 units", insight: "77% of men your age drink less than you." },
            { ageGroup: "AGE_65_74", gender: "MALE", habit: "35-50 units", insight: "91% of men your age drink less than you." },
            { ageGroup: "AGE_65_74", gender: "MALE", habit: "More than 50 units", insight: "95% of men your age drink less than you." },

            // Insights for Female AGE_65_74
            { ageGroup: "AGE_65_74", gender: "FEMALE", habit: "Non-drinker", insight: "19% of women your age drink less than you." },
            { ageGroup: "AGE_65_74", gender: "FEMALE", habit: "Up to 14 units", insight: "19% of women your age drink more than you." },
            { ageGroup: "AGE_65_74", gender: "FEMALE", habit: "14-21 units", insight: "83% of women your age drink more than you." },
            { ageGroup: "AGE_65_74", gender: "FEMALE", habit: "21-35 units", insight: "90% of women your age drink more than you." },
            { ageGroup: "AGE_65_74", gender: "FEMALE", habit: "More than 35 units", insight: "99% of women your age drink more than you." },

            // Insights for Male AGE_OVER_75
            { ageGroup: "AGE_OVER_75", gender: "MALE", habit: "Non-drinker", insight: "20% of men your age are also non-drinkers." },
            { ageGroup: "AGE_OVER_75", gender: "MALE", habit: "Up to 14 units", insight: "20% of men your age drink less than you." },
            { ageGroup: "AGE_OVER_75", gender: "MALE", habit: "14-21 units", insight: "77% of men your age drink less than you." },
            { ageGroup: "AGE_OVER_75", gender: "MALE", habit: "21-35 units", insight: "86% of men your age drink less than you." },
            { ageGroup: "AGE_OVER_75", gender: "MALE", habit: "35-50 units", insight: "93% of men your age drink less than you." },
            { ageGroup: "AGE_OVER_75", gender: "MALE", habit: "More than 50 units", insight: "95% of men your age drink less than you." },

            // Insights for Female AGE_OVER_75
            { ageGroup: "AGE_OVER_75", gender: "FEMALE", habit: "Non-drinker", insight: "26% of women your age drink less than you." },
            { ageGroup: "AGE_OVER_75", gender: "FEMALE", habit: "Up to 14 units", insight: "26% of women your age drink more than you." },
            { ageGroup: "AGE_OVER_75", gender: "FEMALE", habit: "14-21 units", insight: "89% of women your age drink more than you." },
            { ageGroup: "AGE_OVER_75", gender: "FEMALE", habit: "21-35 units", insight: "95% of women your age drink more than you." },
            { ageGroup: "AGE_OVER_75", gender: "FEMALE", habit: "More than 35 units", insight: "99% of women your age drink more than you." },
        ]

        await prisma.drinking_insights.createMany({
            skipDuplicates: true,
            data: insightsData,
        });

        console.log('Drinking insights data inserted successfully.');
    } catch (error) {
        console.error('Error seeding Drinking insights data:', error);
    } finally{
        await prisma.$disconnect();
    }
}

seedDrinkingInsights();