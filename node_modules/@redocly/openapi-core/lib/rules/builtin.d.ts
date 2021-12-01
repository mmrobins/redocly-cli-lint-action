import { CustomRulesConfig } from '../config/config';
export declare const rules: CustomRulesConfig;
export declare const preprocessors: {
    oas3: {};
    oas2: {};
};
export declare const decorators: {
    oas3: {
        'registry-dependencies': import("../visitors").Oas3Decorator;
        'operation-description-override': import("../visitors").Oas3Decorator;
        'tag-description-override': import("../visitors").Oas3Decorator;
        'info-description-override': import("../visitors").Oas3Decorator;
    };
    oas2: {
        'registry-dependencies': import("../visitors").Oas2Decorator;
        'operation-description-override': import("../visitors").Oas2Decorator;
        'tag-description-override': import("../visitors").Oas2Decorator;
        'info-description-override': import("../visitors").Oas2Decorator;
    };
};
