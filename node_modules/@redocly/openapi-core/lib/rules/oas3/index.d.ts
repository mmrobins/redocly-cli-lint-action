import { Oas3RuleSet } from '../../oas-types';
import { Oas3Decorator } from '../../visitors';
export declare const rules: Oas3RuleSet;
export declare const preprocessors: {};
export declare const decorators: {
    'registry-dependencies': Oas3Decorator;
    'operation-description-override': Oas3Decorator;
    'tag-description-override': Oas3Decorator;
    'info-description-override': Oas3Decorator;
};
