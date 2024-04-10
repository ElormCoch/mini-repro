// Copyright (C) Microsoft Corporation. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
  
  // This enum is a replicate of the enum in edge_find_on_page.mojom. Look that
  // file up for more information.
  export enum MatchSelectionResult {
    kSuccess = 0,
    kErrorFeatureDisabled = 1,
    kErrorNoActiveWebContents = 2,
    kErrorInputParamTextEmpty = 3,
    kErrorMatchFrameInvalid = 4,
    kErrorMatchIdNotFound = 5,
    kErrorMatchHasMutated = 6,
  
    kMaxValue = kErrorMatchHasMutated,
  }
  
  export interface ShorelineFindOptions {
    matchCase: boolean;
    matchWholeWord: boolean;
    matchDiacritics: boolean;
    forceNewSession: boolean;
  }
  
  export interface ShorelineFindResult {
    surroundingText: string;
    identifier: number;
    matchStartPosition: number;
    matchEndPosition: number;
  }
  
  export enum ShorelineFindResultCollectionState {
    kInitialState = 0,
    kOkNoResult = 1,
    kOkResult = 2,
    kTooManyResults = 3,
  }
  
  export interface ShorelineFindResultCollection {
    findResultCollectionState: ShorelineFindResultCollectionState;
    numberOfMatches: number;
    activeMatchOrdinal: number;
    matchSurroundingTexts: ShorelineFindResult[];
  }
  
  