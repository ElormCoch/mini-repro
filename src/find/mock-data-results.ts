import { FASTElement, customElement, observable, html, when } from '@microsoft/fast-element';
import { ShorelineFindResultCollection, ShorelineFindResultCollectionState, ShorelineFindResult } from "./sidebar-search-find-on-page-mojom";

// make this a class, @observable decorator from fast, for matchSurro
export class ShorelineFindResultAsClass {

    @observable findResultCollectionState: ShorelineFindResultCollectionState;
    @observable numberOfMatches: number;
    @observable activeMatchOrdinal: number;
    @observable matchSurroundingTexts!: ShorelineFindResult[];

    constructor(findResultCollectionState: ShorelineFindResultCollectionState, numberOfMatches: number,
        activeMatchOrdinal: number,
        matchSurroundingTexts: ShorelineFindResult[]) {
        this.findResultCollectionState = findResultCollectionState;
        this.numberOfMatches = numberOfMatches;
        this.activeMatchOrdinal = activeMatchOrdinal;
        this.matchSurroundingTexts = matchSurroundingTexts;
    }

    setActiveMatchIndex(number: any) {
        this.activeMatchOrdinal = number;
    }

    setResult(findResultCollectionState: ShorelineFindResultCollectionState, numberOfMatches: number,
        activeMatchOrdinal: number,
        matchSurroundingTexts: ShorelineFindResult[]) {
        this.findResultCollectionState = findResultCollectionState;
        this.numberOfMatches = numberOfMatches;
        this.activeMatchOrdinal = activeMatchOrdinal;
        this.matchSurroundingTexts = matchSurroundingTexts;
    }

    getResult(): ShorelineFindResultCollection {
        return {
            findResultCollectionState: this.findResultCollectionState,
            numberOfMatches: this.numberOfMatches,
            activeMatchOrdinal: this.activeMatchOrdinal,
            matchSurroundingTexts: this.matchSurroundingTexts,
        }
    }
}

export const result: ShorelineFindResultCollection = {
    findResultCollectionState: ShorelineFindResultCollectionState.kOkResult,
    numberOfMatches: 12,
    activeMatchOrdinal: 1,
    matchSurroundingTexts: [
        {
            "surroundingText": "In the western Pacific Ocean, it consists of 7,641 islands, with a total area of 300,000 square kilometers,[17] which are broadly categorized in three main geographical divisions from north to south: Luzon, Visayas, and Mindanao.",
            "identifier": 40,
            "matchStartPosition": 23,
            "matchEndPosition": 27
        },
        {
            "surroundingText": "6 [386] A 2016 National Geographic project concluded that people living in the Philippine archipelago carried genetic markers in the following percentages: 53 percent Southeast Asia and Oceania, 36 percent Eastern Asia, five percent Southern Europe, three percent Southern Asia, and two percent Native American (from Latin America).[",
            "identifier": 41,
            "matchStartPosition": 186,
            "matchEndPosition": 190
        },
        {
            "surroundingText": "Ancient Ocean Crossings: Reconsidering the Case for Contacts with the Pre-Columbian Americas.",
            "identifier": 42,
            "matchStartPosition": 8,
            "matchEndPosition": 12
        },
        {
            "surroundingText": "International Dictionary of Historic Places: Asia and Oceania.",
            "identifier": 43,
            "matchStartPosition": 54,
            "matchEndPosition": 58
        },
        {
            "surroundingText": "Historical Dictionaries of Asia, Oceania, and the Middle East (Third ed.).",
            "identifier": 44,
            "matchStartPosition": 33,
            "matchEndPosition": 37
        },
        {
            "surroundingText": "Sea Changes: Historicizing the Ocean.",
            "identifier": 45,
            "matchStartPosition": 31,
            "matchEndPosition": 35
        },
        {
            "surroundingText": "Hot Spot: Asia and Oceania.",
            "identifier": 46,
            "matchStartPosition": 19,
            "matchEndPosition": 23
        },
        {
            "surroundingText": "\"Denisova Admixture and the First Modern Human Dispersals into Southeast Asia and Oceania\".",
            "identifier": 47,
            "matchStartPosition": 82,
            "matchEndPosition": 86
        },
        {
            "surroundingText": "\"A Predominantly Indigenous Paternal Heritage for the Austronesian-Speaking Peoples of Insular South Asia and Oceania\" (PDF).",
            "identifier": 48,
            "matchStartPosition": 110,
            "matchEndPosition": 114
        },
        {
            "surroundingText": "Oceanic Linguistics.",
            "identifier": 49,
            "matchStartPosition": 0,
            "matchEndPosition": 4
        },
        {
            "surroundingText": "^ ￿Bridges across Oceans: Initial Impact Assessment of the Philippines Nautical Highway System and Lessons for Southeast Asia (Report).",
            "identifier": 50,
            "matchStartPosition": 18,
            "matchEndPosition": 22
        },
        {
            "surroundingText": "Pop Culture in Asia and Oceania.",
            "identifier": 51,
            "matchStartPosition": 24,
            "matchEndPosition": 28
        }
    ]
}
