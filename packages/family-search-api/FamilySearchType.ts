export type FamilySearchType = {
  graph: {
    [key: string]: string;
  };
  persons: {
    [key: string]: {
      collaborateCount: number;
      deleted: boolean;
      descendant: boolean;
      discussionCount: number;
      dismissedSuggestions: Suggestions;
      gender: "MALE" | "FEMALE";
      hasMultipleFamiliesAsChild: boolean;
      hasMultipleFamiliesAsParent: boolean;
      hasRecordHints: boolean;
      hasSpouseOrChildren: boolean;
      id: string;
      inPrivateSpace: boolean;
      lifespan: string;
      living: boolean;
      memoryCount: number;
      name: string;
      nameConclusion: {
        contributor: string | null;
        details: {
          detailsType: "NameDetails";
          fullText: string;
          nameForms: Array<{
            familyPart: string | null;
            fullText: string;
            givenPart: string;
            lang: string;
            prefixPart: string | null;
            script: string;
            suffixPart: string | null;
          }>;
          nameType: string;
          preferredName: boolean;
          sourceCount: number;
          style: "EUROTYPIC";
        };
        id: string | null;
        justification: string;
        multiValued: boolean;
        type: "NAME";
      };
      noteCount: number;
      principlePerson: boolean;
      readOnly: boolean;
      size: string;
      skeleton: boolean;
      sourceCount: number;
      spaceId: string;
      spouses?: Array<{
        hasChildren: boolean;
        id: string;
        preferred: boolean;
      }>;
      suggestions?: Suggestions;
    };
  };
  relationships: {
    [key: string]: {
      coupleId: string;
      dismissedSuggestions: Suggestions;
      event?: {
        contributor: null;
        details: {
          detailsType: string;
          date: {
            formalText: string;
            julianDateRange: {
              earliestDay: number;
              latestDay: number;
            };
            localizedText: string;
            modifier: "ABOUT" | "AFTER" | "BEFORE" | null;
            normalizedText: string;
            originalText: string;
          };
          deceasedFlag: null;
          description: string | null;
          place: {
            geoCode: {
              latitude: number;
              longitude: number;
            } | null;
            id: number;
            localizedText: string | null;
            normalizedText: string | null;
            originalText: string;
          } | null;
          sourceCount: number;
          title: string;
          type: string;
        };
        id: string | null;
        justification: string | null;
        multiValued: boolean;
        type: "MARRIAGE";
      };
      hasChildren: boolean;
      id: string;
      preferred: boolean;
      suggestions?: Suggestions;
    };
  };
};

type Suggestions = {
  dataQualityList: Quality;
  empty: boolean;
  researchSuggestionList: Quality;
};

type Quality = Array<{
  category: "RESEARCH_SUGGESTION" | "DATA_QUALITY";
  contextId: string | null;
  entityId: string;
  id?: string | null;
  justification?: null;
  type: {
    canBeDismissed: boolean;
    category: "RESEARCH_SUGGESTION" | "DATA_QUALITY";
    context: string;
    name: string;
  };
}> | null;
