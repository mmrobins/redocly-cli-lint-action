require('./sourcemap-register.js');module.exports =
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 337:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse("{\"i8\":\"1.0.0-beta.102\"}");

/***/ }),

/***/ 3109:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const perf_hooks_1 = __webpack_require__(630);
const core_1 = __webpack_require__(2186);
const openapi_core_1 = __webpack_require__(9307);
const utils_1 = __webpack_require__(8750);
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const configFile = core_1.getInput('config');
            const config = yield openapi_core_1.loadConfig(configFile);
            let entryPoints = [];
            const entryPointInput = core_1.getInput('entrypoints');
            if (entryPointInput) {
                entryPoints = entryPointInput.split(" ");
            }
            entryPoints = yield utils_1.getFallbackEntryPointsOrExit(entryPoints, config);
            const format = core_1.getInput('format');
            let maxProblems = parseInt(core_1.getInput('max_problems'));
            if (isNaN(maxProblems)) {
                maxProblems = 100;
            }
            const totals = { errors: 0, warnings: 0, ignored: 0 };
            for (const entryPoint of entryPoints) {
                try {
                    const startedAt = perf_hooks_1.performance.now();
                    core_1.info(`validating ${entryPoint}...\n`);
                    const results = yield openapi_core_1.lint({
                        ref: entryPoint,
                        config,
                    });
                    const fileTotals = openapi_core_1.getTotals(results);
                    totals.errors += fileTotals.errors;
                    totals.warnings += fileTotals.warnings;
                    totals.ignored += fileTotals.ignored;
                    openapi_core_1.formatProblems(results, {
                        format,
                        maxProblems,
                        totals: fileTotals,
                        version: '0.0.1',
                    });
                    const elapsed = utils_1.getExecutionTime(startedAt);
                    core_1.info(`${entryPoint}: validated in ${elapsed}\n\n`);
                }
                catch (e) {
                    core_1.setFailed(e.message);
                }
            }
            utils_1.printLintTotals(totals, entryPoints.length);
            if (totals.errors > 0) {
                core_1.setFailed("Lint failed");
            }
        }
        catch (error) {
            core_1.setFailed(error.message);
        }
    });
}
run();


/***/ }),

/***/ 7351:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const os = __importStar(__webpack_require__(2087));
const utils_1 = __webpack_require__(5278);
/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */
function issueCommand(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os.EOL);
}
exports.issueCommand = issueCommand;
function issue(name, message = '') {
    issueCommand(name, {}, message);
}
exports.issue = issue;
const CMD_STRING = '::';
class Command {
    constructor(command, properties, message) {
        if (!command) {
            command = 'missing.command';
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            let first = true;
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key];
                    if (val) {
                        if (first) {
                            first = false;
                        }
                        else {
                            cmdStr += ',';
                        }
                        cmdStr += `${key}=${escapeProperty(val)}`;
                    }
                }
            }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
    }
}
function escapeData(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A');
}
function escapeProperty(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/:/g, '%3A')
        .replace(/,/g, '%2C');
}
//# sourceMappingURL=command.js.map

/***/ }),

/***/ 2186:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const command_1 = __webpack_require__(7351);
const file_command_1 = __webpack_require__(717);
const utils_1 = __webpack_require__(5278);
const os = __importStar(__webpack_require__(2087));
const path = __importStar(__webpack_require__(5622));
/**
 * The code to exit an action
 */
var ExitCode;
(function (ExitCode) {
    /**
     * A code indicating that the action was successful
     */
    ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */
    ExitCode[ExitCode["Failure"] = 1] = "Failure";
})(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function exportVariable(name, val) {
    const convertedVal = utils_1.toCommandValue(val);
    process.env[name] = convertedVal;
    const filePath = process.env['GITHUB_ENV'] || '';
    if (filePath) {
        const delimiter = '_GitHubActionsFileCommandDelimeter_';
        const commandValue = `${name}<<${delimiter}${os.EOL}${convertedVal}${os.EOL}${delimiter}`;
        file_command_1.issueCommand('ENV', commandValue);
    }
    else {
        command_1.issueCommand('set-env', { name }, convertedVal);
    }
}
exports.exportVariable = exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */
function setSecret(secret) {
    command_1.issueCommand('add-mask', {}, secret);
}
exports.setSecret = setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */
function addPath(inputPath) {
    const filePath = process.env['GITHUB_PATH'] || '';
    if (filePath) {
        file_command_1.issueCommand('PATH', inputPath);
    }
    else {
        command_1.issueCommand('add-path', {}, inputPath);
    }
    process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
}
exports.addPath = addPath;
/**
 * Gets the value of an input.  The value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */
function getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
    if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
    }
    return val.trim();
}
exports.getInput = getInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setOutput(name, value) {
    command_1.issueCommand('set-output', { name }, value);
}
exports.setOutput = setOutput;
/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */
function setCommandEcho(enabled) {
    command_1.issue('echo', enabled ? 'on' : 'off');
}
exports.setCommandEcho = setCommandEcho;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */
function setFailed(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
}
exports.setFailed = setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Gets whether Actions Step Debug is on or not
 */
function isDebug() {
    return process.env['RUNNER_DEBUG'] === '1';
}
exports.isDebug = isDebug;
/**
 * Writes debug message to user log
 * @param message debug message
 */
function debug(message) {
    command_1.issueCommand('debug', {}, message);
}
exports.debug = debug;
/**
 * Adds an error issue
 * @param message error issue message. Errors will be converted to string via toString()
 */
function error(message) {
    command_1.issue('error', message instanceof Error ? message.toString() : message);
}
exports.error = error;
/**
 * Adds an warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 */
function warning(message) {
    command_1.issue('warning', message instanceof Error ? message.toString() : message);
}
exports.warning = warning;
/**
 * Writes info to log with console.log.
 * @param message info message
 */
function info(message) {
    process.stdout.write(message + os.EOL);
}
exports.info = info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */
function startGroup(name) {
    command_1.issue('group', name);
}
exports.startGroup = startGroup;
/**
 * End an output group.
 */
function endGroup() {
    command_1.issue('endgroup');
}
exports.endGroup = endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */
function group(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
            result = yield fn();
        }
        finally {
            endGroup();
        }
        return result;
    });
}
exports.group = group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function saveState(name, value) {
    command_1.issueCommand('save-state', { name }, value);
}
exports.saveState = saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */
function getState(name) {
    return process.env[`STATE_${name}`] || '';
}
exports.getState = getState;
//# sourceMappingURL=core.js.map

/***/ }),

/***/ 717:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

// For internal use, subject to change.
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
const fs = __importStar(__webpack_require__(5747));
const os = __importStar(__webpack_require__(2087));
const utils_1 = __webpack_require__(5278);
function issueCommand(command, message) {
    const filePath = process.env[`GITHUB_${command}`];
    if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command}`);
    }
    if (!fs.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`);
    }
    fs.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os.EOL}`, {
        encoding: 'utf8'
    });
}
exports.issueCommand = issueCommand;
//# sourceMappingURL=file-command.js.map

/***/ }),

/***/ 5278:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */
function toCommandValue(input) {
    if (input === null || input === undefined) {
        return '';
    }
    else if (typeof input === 'string' || input instanceof String) {
        return input;
    }
    return JSON.stringify(input);
}
exports.toCommandValue = toCommandValue;
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 8043:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mapTypeToComponent = exports.bundleDocument = exports.bundle = exports.OasVersion = void 0;
const isEqual = __webpack_require__(8309);
const resolve_1 = __webpack_require__(7098);
const visitors_1 = __webpack_require__(3555);
const oas3_1 = __webpack_require__(7296);
const oas2_1 = __webpack_require__(3289);
const oas3_1_1 = __webpack_require__(2192);
const types_1 = __webpack_require__(4143);
const walk_1 = __webpack_require__(7523);
const oas_types_1 = __webpack_require__(8837);
const ref_utils_1 = __webpack_require__(7977);
const rules_1 = __webpack_require__(9802);
const no_unresolved_refs_1 = __webpack_require__(4440);
const utils_1 = __webpack_require__(5450);
const redocly_1 = __webpack_require__(357);
const remove_unused_components_1 = __webpack_require__(9080);
const remove_unused_components_2 = __webpack_require__(5872);
var OasVersion;
(function (OasVersion) {
    OasVersion["Version2"] = "oas2";
    OasVersion["Version3_0"] = "oas3_0";
    OasVersion["Version3_1"] = "oas3_1";
})(OasVersion = exports.OasVersion || (exports.OasVersion = {}));
function bundle(opts) {
    return __awaiter(this, void 0, void 0, function* () {
        const { ref, doc, externalRefResolver = new resolve_1.BaseResolver(opts.config.resolve), base = null, } = opts;
        if (!(ref || doc)) {
            throw new Error('Document or reference is required.\n');
        }
        const document = doc !== undefined ? doc : yield externalRefResolver.resolveDocument(base, ref, true);
        if (document instanceof Error) {
            throw document;
        }
        return bundleDocument(Object.assign(Object.assign({ document }, opts), { config: opts.config.lint, externalRefResolver }));
    });
}
exports.bundle = bundle;
function bundleDocument(opts) {
    return __awaiter(this, void 0, void 0, function* () {
        const { document, config, customTypes, externalRefResolver, dereference = false, skipRedoclyRegistryRefs = false, removeUnusedComponents = false, keepUrlRefs = false, } = opts;
        const oasVersion = oas_types_1.detectOpenAPI(document.parsed);
        const oasMajorVersion = oas_types_1.openAPIMajor(oasVersion);
        const rules = config.getRulesForOasVersion(oasMajorVersion);
        const types = types_1.normalizeTypes(config.extendTypes((customTypes !== null && customTypes !== void 0 ? customTypes : oasMajorVersion === oas_types_1.OasMajorVersion.Version3)
            ? oasVersion === OasVersion.Version3_1
                ? oas3_1_1.Oas3_1Types
                : oas3_1.Oas3Types
            : oas2_1.Oas2Types, oasVersion), config);
        const preprocessors = rules_1.initRules(rules, config, 'preprocessors', oasVersion);
        const decorators = rules_1.initRules(rules, config, 'decorators', oasVersion);
        const ctx = {
            problems: [],
            oasVersion: oasVersion,
            refTypes: new Map(),
            visitorsData: {},
        };
        if (removeUnusedComponents) {
            decorators.push({
                severity: 'error',
                ruleId: 'remove-unused-components',
                visitor: oasMajorVersion === oas_types_1.OasMajorVersion.Version2
                    ? remove_unused_components_1.RemoveUnusedComponents({})
                    : remove_unused_components_2.RemoveUnusedComponents({})
            });
        }
        const resolvedRefMap = yield resolve_1.resolveDocument({
            rootDocument: document,
            rootType: types.DefinitionRoot,
            externalRefResolver,
        });
        const bundleVisitor = visitors_1.normalizeVisitors([
            ...preprocessors,
            {
                severity: 'error',
                ruleId: 'bundler',
                visitor: makeBundleVisitor(oasMajorVersion, dereference, skipRedoclyRegistryRefs, document, resolvedRefMap, keepUrlRefs),
            },
            ...decorators,
        ], types);
        walk_1.walkDocument({
            document,
            rootType: types.DefinitionRoot,
            normalizedVisitors: bundleVisitor,
            resolvedRefMap,
            ctx,
        });
        return {
            bundle: document,
            problems: ctx.problems.map((problem) => config.addProblemToIgnore(problem)),
            fileDependencies: externalRefResolver.getFiles(),
            rootType: types.DefinitionRoot,
            refTypes: ctx.refTypes,
            visitorsData: ctx.visitorsData,
        };
    });
}
exports.bundleDocument = bundleDocument;
function mapTypeToComponent(typeName, version) {
    switch (version) {
        case oas_types_1.OasMajorVersion.Version3:
            switch (typeName) {
                case 'Schema':
                    return 'schemas';
                case 'Parameter':
                    return 'parameters';
                case 'Response':
                    return 'responses';
                case 'Example':
                    return 'examples';
                case 'RequestBody':
                    return 'requestBodies';
                case 'Header':
                    return 'headers';
                case 'SecuritySchema':
                    return 'securitySchemes';
                case 'Link':
                    return 'links';
                case 'Callback':
                    return 'callbacks';
                default:
                    return null;
            }
        case oas_types_1.OasMajorVersion.Version2:
            switch (typeName) {
                case 'Schema':
                    return 'definitions';
                case 'Parameter':
                    return 'parameters';
                case 'Response':
                    return 'responses';
                default:
                    return null;
            }
    }
}
exports.mapTypeToComponent = mapTypeToComponent;
// function oas3Move
function makeBundleVisitor(version, dereference, skipRedoclyRegistryRefs, rootDocument, resolvedRefMap, keepUrlRefs) {
    let components;
    const visitor = {
        ref: {
            leave(node, ctx, resolved) {
                if (!resolved.location || resolved.node === undefined) {
                    no_unresolved_refs_1.reportUnresolvedRef(resolved, ctx.report, ctx.location);
                    return;
                }
                if (resolved.location.source === rootDocument.source &&
                    resolved.location.source === ctx.location.source &&
                    ctx.type.name !== 'scalar' &&
                    !dereference) {
                    return;
                }
                // do not bundle registry URL before push, otherwise we can't record dependencies
                if (skipRedoclyRegistryRefs && redocly_1.isRedoclyRegistryURL(node.$ref)) {
                    return;
                }
                if (keepUrlRefs && ref_utils_1.isAbsoluteUrl(node.$ref)) {
                    return;
                }
                const componentType = mapTypeToComponent(ctx.type.name, version);
                if (!componentType) {
                    replaceRef(node, resolved, ctx);
                }
                else {
                    if (dereference) {
                        saveComponent(componentType, resolved, ctx);
                        replaceRef(node, resolved, ctx);
                    }
                    else {
                        node.$ref = saveComponent(componentType, resolved, ctx);
                        resolveBundledComponent(node, resolved, ctx);
                    }
                }
            },
        },
        DefinitionRoot: {
            enter(root) {
                if (version === oas_types_1.OasMajorVersion.Version3) {
                    components = root.components = root.components || {};
                }
                else if (version === oas_types_1.OasMajorVersion.Version2) {
                    components = root;
                }
            },
        },
    };
    if (version === oas_types_1.OasMajorVersion.Version3) {
        visitor.DiscriminatorMapping = {
            leave(mapping, ctx) {
                for (const name of Object.keys(mapping)) {
                    const $ref = mapping[name];
                    const resolved = ctx.resolve({ $ref });
                    if (!resolved.location || resolved.node === undefined) {
                        no_unresolved_refs_1.reportUnresolvedRef(resolved, ctx.report, ctx.location.child(name));
                        return;
                    }
                    const componentType = mapTypeToComponent('Schema', version);
                    if (dereference) {
                        saveComponent(componentType, resolved, ctx);
                    }
                    else {
                        mapping[name] = saveComponent(componentType, resolved, ctx);
                    }
                }
            },
        };
    }
    function resolveBundledComponent(node, resolved, ctx) {
        const newRefId = resolve_1.makeRefId(ctx.location.source.absoluteRef, node.$ref);
        resolvedRefMap.set(newRefId, {
            document: rootDocument,
            isRemote: false,
            node: resolved.node,
            nodePointer: node.$ref,
            resolved: true,
        });
    }
    function replaceRef(ref, resolved, ctx) {
        if (!utils_1.isPlainObject(resolved.node)) {
            ctx.parent[ctx.key] = resolved.node;
        }
        else {
            // @ts-ignore
            delete ref.$ref;
            Object.assign(ref, resolved.node);
        }
    }
    function saveComponent(componentType, target, ctx) {
        components[componentType] = components[componentType] || {};
        const name = getComponentName(target, componentType, ctx);
        components[componentType][name] = target.node;
        if (version === oas_types_1.OasMajorVersion.Version3) {
            return `#/components/${componentType}/${name}`;
        }
        else {
            return `#/${componentType}/${name}`;
        }
    }
    function isEqualOrEqualRef(node, target, ctx) {
        var _a;
        if (ref_utils_1.isRef(node) &&
            ((_a = ctx.resolve(node).location) === null || _a === void 0 ? void 0 : _a.absolutePointer) === target.location.absolutePointer) {
            return true;
        }
        return isEqual(node, target.node);
    }
    function getComponentName(target, componentType, ctx) {
        const [fileRef, pointer] = [target.location.source.absoluteRef, target.location.pointer];
        const componentsGroup = components[componentType];
        let name = '';
        const refParts = pointer.slice(2).split('/').filter(Boolean); // slice(2) removes "#/"
        while (refParts.length > 0) {
            name = refParts.pop() + (name ? `-${name}` : '');
            if (!componentsGroup ||
                !componentsGroup[name] ||
                isEqualOrEqualRef(componentsGroup[name], target, ctx)) {
                return name;
            }
        }
        name = ref_utils_1.refBaseName(fileRef) + (name ? `_${name}` : '');
        if (!componentsGroup[name] || isEqualOrEqualRef(componentsGroup[name], target, ctx)) {
            return name;
        }
        const prevName = name;
        let serialId = 2;
        while (componentsGroup[name] && !isEqualOrEqualRef(componentsGroup[name], target, ctx)) {
            name = `${prevName}-${serialId}`;
            serialId++;
        }
        if (!componentsGroup[name]) {
            ctx.report({
                message: `Two schemas are referenced with the same name but different content. Renamed ${prevName} to ${name}.`,
                location: ctx.location,
                forceSeverity: 'warn',
            });
        }
        return name;
    }
    return visitor;
}


/***/ }),

/***/ 6556:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Config = exports.LintConfig = exports.AVAILABLE_REGIONS = exports.DOMAINS = exports.DEFAULT_REGION = exports.IGNORE_FILE = exports.env = void 0;
const fs = __webpack_require__(5747);
const path = __webpack_require__(5622);
const js_yaml_1 = __webpack_require__(8717);
const utils_1 = __webpack_require__(5450);
const oas_types_1 = __webpack_require__(1659);
const utils_2 = __webpack_require__(3411);
// Alias environment here so this file can work in browser environments too.
exports.env = typeof process !== 'undefined' ? process.env || {} : {};
exports.IGNORE_FILE = '.redocly.lint-ignore.yaml';
const IGNORE_BANNER = `# This file instructs Redocly's linter to ignore the rules contained for specific parts of your API.\n` +
    `# See https://redoc.ly/docs/cli/ for more information.\n`;
exports.DEFAULT_REGION = 'us';
function getDomains() {
    const domains = {
        us: 'redocly.com',
        eu: 'eu.redocly.com',
    };
    // FIXME: temporary fix for our lab environments
    const domain = exports.env.REDOCLY_DOMAIN;
    if (domain === null || domain === void 0 ? void 0 : domain.endsWith('.redocly.host')) {
        domains[domain.split('.')[0]] = domain;
    }
    if (domain === 'redoc.online') {
        domains[domain] = domain;
    }
    return domains;
}
exports.DOMAINS = getDomains();
exports.AVAILABLE_REGIONS = Object.keys(exports.DOMAINS);
class LintConfig {
    constructor(rawConfig, configFile) {
        this.rawConfig = rawConfig;
        this.configFile = configFile;
        this.ignore = {};
        this._usedRules = new Set();
        this._usedVersions = new Set();
        this.plugins = rawConfig.plugins || [];
        this.doNotResolveExamples = !!rawConfig.doNotResolveExamples;
        this.recommendedFallback = rawConfig.recommendedFallback || false;
        this.rules = {
            [oas_types_1.OasVersion.Version2]: Object.assign(Object.assign({}, rawConfig.rules), rawConfig.oas2Rules),
            [oas_types_1.OasVersion.Version3_0]: Object.assign(Object.assign({}, rawConfig.rules), rawConfig.oas3_0Rules),
            [oas_types_1.OasVersion.Version3_1]: Object.assign(Object.assign({}, rawConfig.rules), rawConfig.oas3_1Rules),
        };
        this.preprocessors = {
            [oas_types_1.OasVersion.Version2]: Object.assign(Object.assign({}, rawConfig.preprocessors), rawConfig.oas2Preprocessors),
            [oas_types_1.OasVersion.Version3_0]: Object.assign(Object.assign({}, rawConfig.preprocessors), rawConfig.oas3_0Preprocessors),
            [oas_types_1.OasVersion.Version3_1]: Object.assign(Object.assign({}, rawConfig.preprocessors), rawConfig.oas3_1Preprocessors),
        };
        this.decorators = {
            [oas_types_1.OasVersion.Version2]: Object.assign(Object.assign({}, rawConfig.decorators), rawConfig.oas2Decorators),
            [oas_types_1.OasVersion.Version3_0]: Object.assign(Object.assign({}, rawConfig.decorators), rawConfig.oas3_0Decorators),
            [oas_types_1.OasVersion.Version3_1]: Object.assign(Object.assign({}, rawConfig.decorators), rawConfig.oas3_1Decorators),
        };
        this.extendPaths = rawConfig.extendPaths || [];
        this.pluginPaths = rawConfig.pluginPaths || [];
        const dir = this.configFile
            ? path.dirname(this.configFile)
            : (typeof process !== 'undefined' && process.cwd()) || '';
        const ignoreFile = path.join(dir, exports.IGNORE_FILE);
        /* no crash when using it on the client */
        if (fs.hasOwnProperty('existsSync') && fs.existsSync(ignoreFile)) {
            // TODO: parse errors
            this.ignore =
                js_yaml_1.parseYaml(fs.readFileSync(ignoreFile, 'utf-8')) || {};
            // resolve ignore paths
            for (const fileName of Object.keys(this.ignore)) {
                this.ignore[path.resolve(path.dirname(ignoreFile), fileName)] = this.ignore[fileName];
                for (const ruleId of Object.keys(this.ignore[fileName])) {
                    this.ignore[fileName][ruleId] = new Set(this.ignore[fileName][ruleId]);
                }
                delete this.ignore[fileName];
            }
        }
    }
    saveIgnore() {
        const dir = this.configFile ? path.dirname(this.configFile) : process.cwd();
        const ignoreFile = path.join(dir, exports.IGNORE_FILE);
        const mapped = {};
        for (const absFileName of Object.keys(this.ignore)) {
            const ignoredRules = (mapped[utils_1.slash(path.relative(dir, absFileName))] =
                this.ignore[absFileName]);
            for (const ruleId of Object.keys(ignoredRules)) {
                ignoredRules[ruleId] = Array.from(ignoredRules[ruleId]);
            }
        }
        fs.writeFileSync(ignoreFile, IGNORE_BANNER + js_yaml_1.stringifyYaml(mapped));
    }
    addIgnore(problem) {
        const ignore = this.ignore;
        const loc = problem.location[0];
        if (loc.pointer === undefined)
            return;
        const fileIgnore = (ignore[loc.source.absoluteRef] = ignore[loc.source.absoluteRef] || {});
        const ruleIgnore = (fileIgnore[problem.ruleId] = fileIgnore[problem.ruleId] || new Set());
        ruleIgnore.add(loc.pointer);
    }
    addProblemToIgnore(problem) {
        const loc = problem.location[0];
        if (loc.pointer === undefined)
            return problem;
        const fileIgnore = this.ignore[loc.source.absoluteRef] || {};
        const ruleIgnore = fileIgnore[problem.ruleId];
        const ignored = ruleIgnore && ruleIgnore.has(loc.pointer);
        return ignored
            ? Object.assign(Object.assign({}, problem), { ignored }) : problem;
    }
    extendTypes(types, version) {
        let extendedTypes = types;
        for (const plugin of this.plugins) {
            if (plugin.typeExtension !== undefined) {
                switch (version) {
                    case oas_types_1.OasVersion.Version3_0:
                    case oas_types_1.OasVersion.Version3_1:
                        if (!plugin.typeExtension.oas3)
                            continue;
                        extendedTypes = plugin.typeExtension.oas3(extendedTypes, version);
                    case oas_types_1.OasVersion.Version2:
                        if (!plugin.typeExtension.oas2)
                            continue;
                        extendedTypes = plugin.typeExtension.oas2(extendedTypes, version);
                    default:
                        throw new Error('Not implemented');
                }
            }
        }
        return extendedTypes;
    }
    getRuleSettings(ruleId, oasVersion) {
        this._usedRules.add(ruleId);
        this._usedVersions.add(oasVersion);
        const settings = this.rules[oasVersion][ruleId] || 'off';
        if (typeof settings === 'string') {
            return {
                severity: settings,
            };
        }
        else {
            return Object.assign({ severity: 'error' }, settings);
        }
    }
    getPreprocessorSettings(ruleId, oasVersion) {
        this._usedRules.add(ruleId);
        this._usedVersions.add(oasVersion);
        const settings = this.preprocessors[oasVersion][ruleId] || 'off';
        if (typeof settings === 'string') {
            return {
                severity: settings === 'on' ? 'error' : settings,
            };
        }
        else {
            return Object.assign({ severity: 'error' }, settings);
        }
    }
    getDecoratorSettings(ruleId, oasVersion) {
        this._usedRules.add(ruleId);
        this._usedVersions.add(oasVersion);
        const settings = this.decorators[oasVersion][ruleId] || 'off';
        if (typeof settings === 'string') {
            return {
                severity: settings === 'on' ? 'error' : settings,
            };
        }
        else {
            return Object.assign({ severity: 'error' }, settings);
        }
    }
    getUnusedRules() {
        const rules = [];
        const decorators = [];
        const preprocessors = [];
        for (const usedVersion of Array.from(this._usedVersions)) {
            rules.push(...Object.keys(this.rules[usedVersion]).filter((name) => !this._usedRules.has(name)));
            decorators.push(...Object.keys(this.decorators[usedVersion]).filter((name) => !this._usedRules.has(name)));
            preprocessors.push(...Object.keys(this.preprocessors[usedVersion]).filter((name) => !this._usedRules.has(name)));
        }
        return {
            rules,
            preprocessors,
            decorators,
        };
    }
    getRulesForOasVersion(version) {
        switch (version) {
            case oas_types_1.OasMajorVersion.Version3:
                const oas3Rules = []; // default ruleset
                this.plugins.forEach((p) => { var _a; return ((_a = p.preprocessors) === null || _a === void 0 ? void 0 : _a.oas3) && oas3Rules.push(p.preprocessors.oas3); });
                this.plugins.forEach((p) => { var _a; return ((_a = p.rules) === null || _a === void 0 ? void 0 : _a.oas3) && oas3Rules.push(p.rules.oas3); });
                this.plugins.forEach((p) => { var _a; return ((_a = p.decorators) === null || _a === void 0 ? void 0 : _a.oas3) && oas3Rules.push(p.decorators.oas3); });
                return oas3Rules;
            case oas_types_1.OasMajorVersion.Version2:
                const oas2Rules = []; // default ruleset
                this.plugins.forEach((p) => { var _a; return ((_a = p.preprocessors) === null || _a === void 0 ? void 0 : _a.oas2) && oas2Rules.push(p.preprocessors.oas2); });
                this.plugins.forEach((p) => { var _a; return ((_a = p.rules) === null || _a === void 0 ? void 0 : _a.oas2) && oas2Rules.push(p.rules.oas2); });
                this.plugins.forEach((p) => { var _a; return ((_a = p.decorators) === null || _a === void 0 ? void 0 : _a.oas2) && oas2Rules.push(p.decorators.oas2); });
                return oas2Rules;
        }
    }
    skipRules(rules) {
        for (const ruleId of rules || []) {
            for (const version of Object.values(oas_types_1.OasVersion)) {
                if (this.rules[version][ruleId]) {
                    this.rules[version][ruleId] = 'off';
                }
            }
        }
    }
    skipPreprocessors(preprocessors) {
        for (const preprocessorId of preprocessors || []) {
            for (const version of Object.values(oas_types_1.OasVersion)) {
                if (this.preprocessors[version][preprocessorId]) {
                    this.preprocessors[version][preprocessorId] = 'off';
                }
            }
        }
    }
    skipDecorators(decorators) {
        for (const decoratorId of decorators || []) {
            for (const version of Object.values(oas_types_1.OasVersion)) {
                if (this.decorators[version][decoratorId]) {
                    this.decorators[version][decoratorId] = 'off';
                }
            }
        }
    }
}
exports.LintConfig = LintConfig;
class Config {
    constructor(rawConfig, configFile) {
        this.rawConfig = rawConfig;
        this.configFile = configFile;
        this.apis = rawConfig.apis || {};
        this.lint = new LintConfig(rawConfig.lint || {}, configFile);
        this['features.openapi'] = rawConfig['features.openapi'] || {};
        this['features.mockServer'] = rawConfig['features.mockServer'] || {};
        this.resolve = utils_2.getResolveConfig(rawConfig === null || rawConfig === void 0 ? void 0 : rawConfig.resolve);
        this.region = rawConfig.region;
        this.organization = rawConfig.organization;
    }
}
exports.Config = Config;


/***/ }),

/***/ 9802:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initRules = void 0;
const utils_1 = __webpack_require__(5450);
function initRules(rules, config, type, oasVersion) {
    return rules
        .flatMap((ruleset) => Object.keys(ruleset).map((ruleId) => {
        const rule = ruleset[ruleId];
        const ruleSettings = type === 'rules'
            ? config.getRuleSettings(ruleId, oasVersion)
            : type === 'preprocessors'
                ? config.getPreprocessorSettings(ruleId, oasVersion)
                : config.getDecoratorSettings(ruleId, oasVersion);
        if (ruleSettings.severity === 'off') {
            return undefined;
        }
        const visitors = rule(ruleSettings);
        if (Array.isArray(visitors)) {
            return visitors.map((visitor) => ({
                severity: ruleSettings.severity,
                ruleId,
                visitor: visitor,
            }));
        }
        return {
            severity: ruleSettings.severity,
            ruleId,
            visitor: visitors, // note: actually it is only one visitor object
        };
    }))
        .flatMap(visitor => visitor)
        .filter(utils_1.notUndefined);
}
exports.initRules = initRules;


/***/ }),

/***/ 5660:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getAstNodeByPointer = exports.getLineColLocation = exports.getCodeframe = void 0;
const colorette_1 = __webpack_require__(5666);
const yamlAst = __webpack_require__(8342);
const ref_utils_1 = __webpack_require__(7977);
const MAX_LINE_LENGTH = 150;
const MAX_CODEFRAME_LINES = 3;
// TODO: temporary
function parsePointer(pointer) {
    return pointer.substr(2).split('/').map(ref_utils_1.unescapePointer);
}
function getCodeframe(location, color) {
    colorette_1.options.enabled = color;
    const { start, end = { line: start.line, col: start.col + 1 }, source } = location;
    const lines = source.getLines();
    const startLineNum = start.line;
    const endLineNum = Math.max(Math.min(end.line, lines.length), start.line);
    let skipLines = Math.max(endLineNum - startLineNum - MAX_CODEFRAME_LINES + 1, 0);
    if (skipLines < 2)
        skipLines = 0; // do not skip one line
    // Lines specified like this: ["prefix", "string"],
    const prefixedLines = [];
    let currentPad = 0;
    for (let i = startLineNum; i <= endLineNum; i++) {
        if (skipLines > 0 && i >= endLineNum - skipLines)
            break;
        const line = lines[i - 1] || '';
        if (line !== '')
            currentPad = padSize(line);
        let startIdx = i === startLineNum ? start.col - 1 : currentPad;
        let endIdx = i === endLineNum ? end.col - 1 : line.length;
        prefixedLines.push([`${i}`, markLine(line, startIdx, endIdx, colorette_1.red)]);
        if (!color)
            prefixedLines.push(['', underlineLine(line, startIdx, endIdx)]);
    }
    if (skipLines > 0) {
        prefixedLines.push([`…`, `${whitespace(currentPad)}${colorette_1.gray(`< ${skipLines} more lines >`)}`]);
        // print last line
        prefixedLines.push([`${endLineNum}`, markLine(lines[endLineNum - 1], -1, end.col - 1, colorette_1.red)]);
        if (!color)
            prefixedLines.push(['', underlineLine(lines[endLineNum - 1], -1, end.col - 1)]);
    }
    return printPrefixedLines([
        [`${startLineNum - 2}`, markLine(lines[startLineNum - 1 - 2])],
        [`${startLineNum - 1}`, markLine(lines[startLineNum - 1 - 1])],
        ...prefixedLines,
        [`${endLineNum + 1}`, markLine(lines[endLineNum - 1 + 1])],
        [`${endLineNum + 2}`, markLine(lines[endLineNum - 1 + 2])],
    ]);
    function markLine(line, startIdx = -1, endIdx = +Infinity, variant = colorette_1.gray) {
        if (!color)
            return line;
        if (!line)
            return line;
        if (startIdx === -1) {
            startIdx = padSize(line);
        }
        endIdx = Math.min(endIdx, line.length);
        return (line.substr(0, startIdx) + variant(line.substring(startIdx, endIdx)) + line.substr(endIdx));
    }
}
exports.getCodeframe = getCodeframe;
function printPrefixedLines(lines) {
    const existingLines = lines.filter(([_, line]) => line !== undefined);
    const padLen = Math.max(...existingLines.map(([prefix]) => prefix.length));
    const dedentLen = Math.min(...existingLines.map(([_, line]) => (line === '' ? Infinity : padSize(line))));
    return existingLines
        .map(([prefix, line]) => colorette_1.gray(leftPad(padLen, prefix) + ' |') +
        (line ? ' ' + limitLineLength(line.substring(dedentLen)) : ''))
        .join('\n');
}
function limitLineLength(line, maxLen = MAX_LINE_LENGTH) {
    const overflowLen = line.length - maxLen;
    if (overflowLen > 0) {
        const charsMoreText = colorette_1.gray(`...<${overflowLen} chars>`);
        return line.substring(0, maxLen - charsMoreText.length) + charsMoreText;
    }
    else {
        return line;
    }
}
function underlineLine(line, startIdx = -1, endIdx = +Infinity) {
    if (startIdx === -1) {
        startIdx = padSize(line);
    }
    endIdx = Math.min(endIdx, line.length);
    return whitespace(startIdx) + '^'.repeat(Math.max(endIdx - startIdx, 1));
}
function whitespace(len) {
    return ' '.repeat(len);
}
function leftPad(len, str) {
    return whitespace(len - str.length) + str;
}
function padSize(line) {
    for (let i = 0; i < line.length; i++) {
        if (line[i] !== ' ')
            return i;
    }
    return line.length;
}
function getLineColLocation(location) {
    var _a, _b;
    if (location.pointer === undefined)
        return location;
    const { source, pointer, reportOnKey } = location;
    const ast = source.getAst(yamlAst.safeLoad);
    const astNode = getAstNodeByPointer(ast, pointer, !!reportOnKey);
    return Object.assign(Object.assign(Object.assign({}, location), { pointer: undefined }), positionsToLoc(source.body, (_a = astNode === null || astNode === void 0 ? void 0 : astNode.startPosition) !== null && _a !== void 0 ? _a : 1, (_b = astNode === null || astNode === void 0 ? void 0 : astNode.endPosition) !== null && _b !== void 0 ? _b : 1));
}
exports.getLineColLocation = getLineColLocation;
function positionsToLoc(source, startPos, endPos) {
    let currentLine = 1;
    let currentCol = 1;
    let start = { line: 1, col: 1 };
    for (let i = 0; i < endPos - 1; i++) {
        if (i === startPos - 1) {
            start = { line: currentLine, col: currentCol + 1 };
        }
        if (source[i] === '\n') {
            currentLine++;
            currentCol = 1;
            if (i === startPos - 1) {
                start = { line: currentLine, col: currentCol };
            }
            if (source[i + 1] === '\r')
                i++; // TODO: test it
            continue;
        }
        currentCol++;
    }
    const end = startPos === endPos ? Object.assign({}, start) : { line: currentLine, col: currentCol + 1 };
    return { start, end };
}
function getAstNodeByPointer(root, pointer, reportOnKey) {
    const pointerSegments = parsePointer(pointer);
    if (root === undefined) {
        return undefined;
    }
    let currentNode = root;
    for (const key of pointerSegments) {
        if (currentNode.kind === yamlAst.Kind.MAP) {
            const mapping = currentNode.mappings.find((m) => m.key.value === key);
            if (!mapping)
                break;
            currentNode = mapping;
            if (!(mapping === null || mapping === void 0 ? void 0 : mapping.value))
                break; // If node has value - return value, if not - return node itself
            currentNode = mapping.value;
        }
        else if (currentNode.kind === yamlAst.Kind.SEQ) {
            const elem = currentNode.items[parseInt(key, 10)];
            if (!elem)
                break;
            currentNode = elem;
        }
    }
    if (!reportOnKey) {
        return currentNode;
    }
    else {
        const parent = currentNode.parent;
        if (!parent)
            return currentNode;
        if (parent.kind === yamlAst.Kind.SEQ) {
            return currentNode;
        }
        else if (parent.kind === yamlAst.Kind.MAPPING) {
            return parent.key;
        }
        else {
            return currentNode;
        }
    }
}
exports.getAstNodeByPointer = getAstNodeByPointer;


/***/ }),

/***/ 1105:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.formatProblems = exports.getTotals = void 0;
const path = __webpack_require__(5622);
const colorette_1 = __webpack_require__(5666);
const coreVersion = __webpack_require__(337)/* .version */ .i8;
const codeframes_1 = __webpack_require__(5660);
const config_1 = __webpack_require__(3893);
const ERROR_MESSAGE = {
    INVALID_SEVERITY_LEVEL: 'Invalid severity level; accepted values: error or warn',
};
const BG_COLORS = {
    warn: (str) => colorette_1.bgYellow(colorette_1.black(str)),
    error: colorette_1.bgRed,
};
const COLORS = {
    warn: colorette_1.yellow,
    error: colorette_1.red,
};
const SEVERITY_NAMES = {
    warn: 'Warning',
    error: 'Error',
};
const CODECLIMATE_SEVERITY_MAPPING = {
    error: 'critical',
    warn: 'minor',
};
const MAX_SUGGEST = 5;
function severityToNumber(severity) {
    return severity === 'error' ? 1 : 2;
}
function getTotals(problems) {
    let errors = 0;
    let warnings = 0;
    let ignored = 0;
    for (const m of problems) {
        if (m.ignored) {
            ignored++;
            continue;
        }
        if (m.severity === 'error')
            errors++;
        if (m.severity === 'warn')
            warnings++;
    }
    return {
        errors,
        warnings,
        ignored,
    };
}
exports.getTotals = getTotals;
function formatProblems(problems, opts) {
    const { maxProblems = 100, cwd = process.cwd(), format = 'codeframe', color = colorette_1.options.enabled, totals = getTotals(problems), version = coreVersion, } = opts;
    colorette_1.options.enabled = color; // force colors if specified
    const totalProblems = problems.length;
    problems = problems.filter((m) => !m.ignored);
    const ignoredProblems = totalProblems - problems.length;
    problems = problems
        .sort((a, b) => severityToNumber(a.severity) - severityToNumber(b.severity))
        .slice(0, maxProblems);
    if (!totalProblems && format !== 'json')
        return;
    switch (format) {
        case 'json':
            outputJSON();
            break;
        case 'codeframe':
            for (let i = 0; i < problems.length; i++) {
                const problem = problems[i];
                process.stderr.write(`${formatCodeframe(problem, i)}\n`);
            }
            break;
        case 'stylish': {
            const groupedByFile = groupByFiles(problems);
            for (const [file, { ruleIdPad, locationPad: positionPad, fileProblems }] of Object.entries(groupedByFile)) {
                process.stderr.write(`${colorette_1.blue(path.relative(cwd, file))}:\n`);
                for (let i = 0; i < fileProblems.length; i++) {
                    const problem = fileProblems[i];
                    process.stderr.write(`${formatStylish(problem, positionPad, ruleIdPad)}\n`);
                }
                process.stderr.write('\n');
            }
            break;
        }
        case 'checkstyle': {
            const groupedByFile = groupByFiles(problems);
            process.stdout.write('<?xml version="1.0" encoding="UTF-8"?>\n');
            process.stdout.write('<checkstyle version="4.3">\n');
            for (const [file, { fileProblems }] of Object.entries(groupedByFile)) {
                process.stdout.write(`<file name="${xmlEscape(path.relative(cwd, file))}">\n`);
                fileProblems.forEach(formatCheckstyle);
                process.stdout.write(`</file>\n`);
            }
            process.stdout.write(`</checkstyle>\n`);
            break;
        }
        case 'codeclimate':
            outputForCodeClimate();
            break;
    }
    if (totalProblems - ignoredProblems > maxProblems) {
        process.stderr.write(`< ... ${totalProblems - maxProblems} more problems hidden > ${colorette_1.gray('increase with `--max-problems N`')}\n`);
    }
    function outputForCodeClimate() {
        const issues = problems.map((p) => {
            const location = p.location[0]; // TODO: support multiple location
            const lineCol = codeframes_1.getLineColLocation(location);
            return {
                description: p.message,
                location: {
                    path: path.relative(cwd, location.source.absoluteRef),
                    lines: {
                        begin: lineCol.start.line,
                    },
                },
                severity: CODECLIMATE_SEVERITY_MAPPING[p.severity],
                fingerprint: `${p.ruleId}${p.location.length > 0 ? '-' + p.location[0].pointer : ''}`,
            };
        });
        process.stdout.write(JSON.stringify(issues, null, 2));
    }
    function outputJSON() {
        const resultObject = {
            totals,
            version,
            problems: problems.map((p) => {
                var _a;
                let problem = Object.assign(Object.assign({}, p), { location: p.location.map((location) => (Object.assign(Object.assign({}, location), { source: {
                            ref: path.relative(cwd, location.source.absoluteRef),
                        } }))), from: p.from
                        ? Object.assign(Object.assign({}, p.from), { source: {
                                ref: path.relative(cwd, ((_a = p.from) === null || _a === void 0 ? void 0 : _a.source.absoluteRef) || cwd),
                            } }) : undefined });
                if (config_1.env.FORMAT_JSON_WITH_CODEFRAMES) {
                    const location = p.location[0]; // TODO: support multiple locations
                    const loc = codeframes_1.getLineColLocation(location);
                    problem.codeframe = codeframes_1.getCodeframe(loc, color);
                }
                return problem;
            }),
        };
        process.stdout.write(JSON.stringify(resultObject, null, 2));
    }
    function getBgColor(problem) {
        const { severity } = problem;
        if (!BG_COLORS[severity]) {
            throw new Error(ERROR_MESSAGE.INVALID_SEVERITY_LEVEL);
        }
        return BG_COLORS[severity];
    }
    function formatCodeframe(problem, idx) {
        const bgColor = getBgColor(problem);
        const location = problem.location[0]; // TODO: support multiple locations
        const relativePath = path.relative(cwd, location.source.absoluteRef);
        const loc = codeframes_1.getLineColLocation(location);
        const atPointer = location.pointer ? colorette_1.gray(`at ${location.pointer}`) : '';
        const fileWithLoc = `${relativePath}:${loc.start.line}:${loc.start.col}`;
        return (`[${idx + 1}] ${bgColor(fileWithLoc)} ${atPointer}\n\n` +
            `${problem.message}\n\n` +
            formatDidYouMean(problem) +
            codeframes_1.getCodeframe(loc, color) +
            '\n\n' +
            formatFrom(cwd, problem.from) +
            `${SEVERITY_NAMES[problem.severity]} was generated by the ${colorette_1.blue(problem.ruleId)} rule.\n\n`);
    }
    function formatStylish(problem, locationPad, ruleIdPad) {
        const color = COLORS[problem.severity];
        if (!SEVERITY_NAMES[problem.severity]) {
            return 'Error not found severity. Please check your config file. Allowed values: \`warn,error,off\`';
        }
        const severityName = color(SEVERITY_NAMES[problem.severity].toLowerCase().padEnd(7));
        const { start } = problem.location[0];
        return `  ${`${start.line}:${start.col}`.padEnd(locationPad)}  ${severityName}  ${problem.ruleId.padEnd(ruleIdPad)}  ${problem.message}`;
    }
    function formatCheckstyle(problem) {
        const { line, col } = problem.location[0].start;
        const severity = problem.severity == 'warn' ? 'warning' : 'error';
        const message = xmlEscape(problem.message);
        const source = xmlEscape(problem.ruleId);
        process.stdout.write(`<error line="${line}" column="${col}" severity="${severity}" message="${message}" source="${source}" />\n`);
    }
}
exports.formatProblems = formatProblems;
function formatFrom(cwd, location) {
    if (!location)
        return '';
    const relativePath = path.relative(cwd, location.source.absoluteRef);
    const loc = codeframes_1.getLineColLocation(location);
    const fileWithLoc = `${relativePath}:${loc.start.line}:${loc.start.col}`;
    return `referenced from ${colorette_1.blue(fileWithLoc)}\n\n`;
}
function formatDidYouMean(problem) {
    if (problem.suggest.length === 0)
        return '';
    if (problem.suggest.length === 1) {
        return `Did you mean: ${problem.suggest[0]} ?\n\n`;
    }
    else {
        return `Did you mean:\n  - ${problem.suggest.slice(0, MAX_SUGGEST).join('\n  - ')}\n\n`;
    }
}
const groupByFiles = (problems) => {
    const fileGroups = {};
    for (const problem of problems) {
        const absoluteRef = problem.location[0].source.absoluteRef; // TODO: multiple errors
        fileGroups[absoluteRef] = fileGroups[absoluteRef] || {
            fileProblems: [],
            ruleIdPad: 0,
            locationPad: 0,
        };
        const mappedProblem = Object.assign(Object.assign({}, problem), { location: problem.location.map(codeframes_1.getLineColLocation) });
        fileGroups[absoluteRef].fileProblems.push(mappedProblem);
        fileGroups[absoluteRef].ruleIdPad = Math.max(problem.ruleId.length, fileGroups[absoluteRef].ruleIdPad);
        fileGroups[absoluteRef].locationPad = Math.max(Math.max(...mappedProblem.location.map((loc) => `${loc.start.line}:${loc.start.col}`.length)), fileGroups[absoluteRef].locationPad);
    }
    return fileGroups;
};
function xmlEscape(s) {
    return s.replace(/[<>&"'\x00-\x1F\x7F\u0080-\uFFFF]/gu, (char) => {
        switch (char) {
            case '<':
                return '&lt;';
            case '>':
                return '&gt;';
            case '&':
                return '&amp;';
            case '"':
                return '&quot;';
            case "'":
                return '&apos;';
            default:
                return `&#${char.charCodeAt(0)};`;
        }
    });
}


/***/ }),

/***/ 9307:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mapTypeToComponent = exports.bundleDocument = exports.bundle = exports.lintConfig = exports.lintFromString = exports.lintDocument = exports.validate = exports.lint = exports.getTotals = exports.formatProblems = exports.getLineColLocation = exports.getAstNodeByPointer = exports.walkDocument = exports.normalizeVisitors = exports.OasVersion = exports.openAPIMajor = exports.OasMajorVersion = exports.detectOpenAPI = exports.isRef = exports.unescapePointer = exports.stringifyYaml = exports.parseYaml = exports.makeDocumentFromString = exports.YamlParseError = exports.ResolveError = exports.resolveDocument = exports.BaseResolver = exports.Source = exports.isRedoclyRegistryURL = exports.RedoclyClient = exports.CONFIG_FILE_NAMES = exports.findConfig = exports.getConfig = exports.loadConfig = exports.transformConfig = exports.getMergedConfig = exports.IGNORE_FILE = exports.LintConfig = exports.Config = exports.Stats = exports.normalizeTypes = exports.ConfigTypes = exports.Oas2Types = exports.Oas3Types = exports.Oas3_1Types = exports.slash = exports.readFileFromUrl = void 0;
var utils_1 = __webpack_require__(5450);
Object.defineProperty(exports, "readFileFromUrl", ({ enumerable: true, get: function () { return utils_1.readFileFromUrl; } }));
Object.defineProperty(exports, "slash", ({ enumerable: true, get: function () { return utils_1.slash; } }));
var oas3_1_1 = __webpack_require__(2192);
Object.defineProperty(exports, "Oas3_1Types", ({ enumerable: true, get: function () { return oas3_1_1.Oas3_1Types; } }));
var oas3_1 = __webpack_require__(7296);
Object.defineProperty(exports, "Oas3Types", ({ enumerable: true, get: function () { return oas3_1.Oas3Types; } }));
var oas2_1 = __webpack_require__(3289);
Object.defineProperty(exports, "Oas2Types", ({ enumerable: true, get: function () { return oas2_1.Oas2Types; } }));
var redocly_yaml_1 = __webpack_require__(4381);
Object.defineProperty(exports, "ConfigTypes", ({ enumerable: true, get: function () { return redocly_yaml_1.ConfigTypes; } }));
var types_1 = __webpack_require__(4143);
Object.defineProperty(exports, "normalizeTypes", ({ enumerable: true, get: function () { return types_1.normalizeTypes; } }));
var stats_1 = __webpack_require__(8373);
Object.defineProperty(exports, "Stats", ({ enumerable: true, get: function () { return stats_1.Stats; } }));
var config_1 = __webpack_require__(6938);
Object.defineProperty(exports, "Config", ({ enumerable: true, get: function () { return config_1.Config; } }));
Object.defineProperty(exports, "LintConfig", ({ enumerable: true, get: function () { return config_1.LintConfig; } }));
Object.defineProperty(exports, "IGNORE_FILE", ({ enumerable: true, get: function () { return config_1.IGNORE_FILE; } }));
Object.defineProperty(exports, "getMergedConfig", ({ enumerable: true, get: function () { return config_1.getMergedConfig; } }));
Object.defineProperty(exports, "transformConfig", ({ enumerable: true, get: function () { return config_1.transformConfig; } }));
Object.defineProperty(exports, "loadConfig", ({ enumerable: true, get: function () { return config_1.loadConfig; } }));
Object.defineProperty(exports, "getConfig", ({ enumerable: true, get: function () { return config_1.getConfig; } }));
Object.defineProperty(exports, "findConfig", ({ enumerable: true, get: function () { return config_1.findConfig; } }));
Object.defineProperty(exports, "CONFIG_FILE_NAMES", ({ enumerable: true, get: function () { return config_1.CONFIG_FILE_NAMES; } }));
var redocly_1 = __webpack_require__(357);
Object.defineProperty(exports, "RedoclyClient", ({ enumerable: true, get: function () { return redocly_1.RedoclyClient; } }));
Object.defineProperty(exports, "isRedoclyRegistryURL", ({ enumerable: true, get: function () { return redocly_1.isRedoclyRegistryURL; } }));
var resolve_1 = __webpack_require__(7098);
Object.defineProperty(exports, "Source", ({ enumerable: true, get: function () { return resolve_1.Source; } }));
Object.defineProperty(exports, "BaseResolver", ({ enumerable: true, get: function () { return resolve_1.BaseResolver; } }));
Object.defineProperty(exports, "resolveDocument", ({ enumerable: true, get: function () { return resolve_1.resolveDocument; } }));
Object.defineProperty(exports, "ResolveError", ({ enumerable: true, get: function () { return resolve_1.ResolveError; } }));
Object.defineProperty(exports, "YamlParseError", ({ enumerable: true, get: function () { return resolve_1.YamlParseError; } }));
Object.defineProperty(exports, "makeDocumentFromString", ({ enumerable: true, get: function () { return resolve_1.makeDocumentFromString; } }));
var js_yaml_1 = __webpack_require__(1674);
Object.defineProperty(exports, "parseYaml", ({ enumerable: true, get: function () { return js_yaml_1.parseYaml; } }));
Object.defineProperty(exports, "stringifyYaml", ({ enumerable: true, get: function () { return js_yaml_1.stringifyYaml; } }));
var ref_utils_1 = __webpack_require__(7977);
Object.defineProperty(exports, "unescapePointer", ({ enumerable: true, get: function () { return ref_utils_1.unescapePointer; } }));
Object.defineProperty(exports, "isRef", ({ enumerable: true, get: function () { return ref_utils_1.isRef; } }));
var oas_types_1 = __webpack_require__(8837);
Object.defineProperty(exports, "detectOpenAPI", ({ enumerable: true, get: function () { return oas_types_1.detectOpenAPI; } }));
Object.defineProperty(exports, "OasMajorVersion", ({ enumerable: true, get: function () { return oas_types_1.OasMajorVersion; } }));
Object.defineProperty(exports, "openAPIMajor", ({ enumerable: true, get: function () { return oas_types_1.openAPIMajor; } }));
Object.defineProperty(exports, "OasVersion", ({ enumerable: true, get: function () { return oas_types_1.OasVersion; } }));
var visitors_1 = __webpack_require__(3555);
Object.defineProperty(exports, "normalizeVisitors", ({ enumerable: true, get: function () { return visitors_1.normalizeVisitors; } }));
var walk_1 = __webpack_require__(7523);
Object.defineProperty(exports, "walkDocument", ({ enumerable: true, get: function () { return walk_1.walkDocument; } }));
var codeframes_1 = __webpack_require__(5660);
Object.defineProperty(exports, "getAstNodeByPointer", ({ enumerable: true, get: function () { return codeframes_1.getAstNodeByPointer; } }));
Object.defineProperty(exports, "getLineColLocation", ({ enumerable: true, get: function () { return codeframes_1.getLineColLocation; } }));
var format_1 = __webpack_require__(1105);
Object.defineProperty(exports, "formatProblems", ({ enumerable: true, get: function () { return format_1.formatProblems; } }));
Object.defineProperty(exports, "getTotals", ({ enumerable: true, get: function () { return format_1.getTotals; } }));
var lint_1 = __webpack_require__(464);
Object.defineProperty(exports, "lint", ({ enumerable: true, get: function () { return lint_1.lint; } }));
Object.defineProperty(exports, "validate", ({ enumerable: true, get: function () { return lint_1.lint; } }));
Object.defineProperty(exports, "lintDocument", ({ enumerable: true, get: function () { return lint_1.lintDocument; } }));
Object.defineProperty(exports, "lintFromString", ({ enumerable: true, get: function () { return lint_1.lintFromString; } }));
Object.defineProperty(exports, "lintConfig", ({ enumerable: true, get: function () { return lint_1.lintConfig; } }));
var bundle_1 = __webpack_require__(8043);
Object.defineProperty(exports, "bundle", ({ enumerable: true, get: function () { return bundle_1.bundle; } }));
Object.defineProperty(exports, "bundleDocument", ({ enumerable: true, get: function () { return bundle_1.bundleDocument; } }));
Object.defineProperty(exports, "mapTypeToComponent", ({ enumerable: true, get: function () { return bundle_1.mapTypeToComponent; } }));


/***/ }),

/***/ 464:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.lintConfig = exports.lintDocument = exports.lintFromString = exports.lint = void 0;
const resolve_1 = __webpack_require__(7098);
const visitors_1 = __webpack_require__(3555);
const oas3_1_1 = __webpack_require__(2192);
const oas3_1 = __webpack_require__(7296);
const oas2_1 = __webpack_require__(3289);
const walk_1 = __webpack_require__(7523);
const config_1 = __webpack_require__(6938);
const types_1 = __webpack_require__(4143);
const ajv_1 = __webpack_require__(5166);
const oas_types_1 = __webpack_require__(8837);
const redocly_yaml_1 = __webpack_require__(4381);
const spec_1 = __webpack_require__(815);
function lint(opts) {
    return __awaiter(this, void 0, void 0, function* () {
        const { ref, externalRefResolver = new resolve_1.BaseResolver(opts.config.resolve) } = opts;
        const document = (yield externalRefResolver.resolveDocument(null, ref, true));
        return lintDocument(Object.assign(Object.assign({ document }, opts), { externalRefResolver, config: opts.config.lint }));
    });
}
exports.lint = lint;
function lintFromString(opts) {
    return __awaiter(this, void 0, void 0, function* () {
        const { source, absoluteRef, externalRefResolver = new resolve_1.BaseResolver(opts.config.resolve) } = opts;
        const document = resolve_1.makeDocumentFromString(source, absoluteRef || '/');
        return lintDocument(Object.assign(Object.assign({ document }, opts), { externalRefResolver, config: opts.config.lint }));
    });
}
exports.lintFromString = lintFromString;
function lintDocument(opts) {
    return __awaiter(this, void 0, void 0, function* () {
        ajv_1.releaseAjvInstance(); // FIXME: preprocessors can modify nodes which are then cached to ajv-instance by absolute path
        const { document, customTypes, externalRefResolver, config } = opts;
        const oasVersion = oas_types_1.detectOpenAPI(document.parsed);
        const oasMajorVersion = oas_types_1.openAPIMajor(oasVersion);
        const rules = config.getRulesForOasVersion(oasMajorVersion);
        const types = types_1.normalizeTypes(config.extendTypes((customTypes !== null && customTypes !== void 0 ? customTypes : oasMajorVersion === oas_types_1.OasMajorVersion.Version3) ? (oasVersion === oas_types_1.OasVersion.Version3_1 ? oas3_1_1.Oas3_1Types : oas3_1.Oas3Types) : oas2_1.Oas2Types, oasVersion), config);
        const ctx = {
            problems: [],
            oasVersion: oasVersion,
            visitorsData: {},
        };
        const preprocessors = config_1.initRules(rules, config, 'preprocessors', oasVersion);
        const regularRules = config_1.initRules(rules, config, 'rules', oasVersion);
        const normalizedVisitors = visitors_1.normalizeVisitors([...preprocessors, ...regularRules], types);
        const resolvedRefMap = yield resolve_1.resolveDocument({
            rootDocument: document,
            rootType: types.DefinitionRoot,
            externalRefResolver
        });
        walk_1.walkDocument({
            document,
            rootType: types.DefinitionRoot,
            normalizedVisitors,
            resolvedRefMap,
            ctx,
        });
        return ctx.problems.map((problem) => config.addProblemToIgnore(problem));
    });
}
exports.lintDocument = lintDocument;
function lintConfig(opts) {
    return __awaiter(this, void 0, void 0, function* () {
        const { document } = opts;
        const ctx = {
            problems: [],
            oasVersion: oas_types_1.OasVersion.Version3_0,
            visitorsData: {},
        };
        const plugins = config_1.resolvePlugins([config_1.defaultPlugin]);
        const config = new config_1.LintConfig({
            plugins,
            rules: { spec: 'error' },
        });
        const types = types_1.normalizeTypes(redocly_yaml_1.ConfigTypes, config);
        const rules = [{ severity: 'error', ruleId: 'spec', visitor: spec_1.OasSpec({ severity: 'error' }) }];
        const normalizedVisitors = visitors_1.normalizeVisitors(rules, types);
        walk_1.walkDocument({
            document,
            rootType: types.ConfigRoot,
            normalizedVisitors,
            resolvedRefMap: new Map(),
            ctx,
        });
        return ctx.problems;
    });
}
exports.lintConfig = lintConfig;


/***/ }),

/***/ 357:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isRedoclyRegistryURL = exports.RedoclyClient = void 0;
const fs_1 = __webpack_require__(5747);
const path_1 = __webpack_require__(5622);
const os_1 = __webpack_require__(2087);
const colorette_1 = __webpack_require__(5666);
const registry_api_1 = __webpack_require__(5565);
const config_1 = __webpack_require__(6556);
const utils_1 = __webpack_require__(5450);
const TOKEN_FILENAME = '.redocly-config.json';
class RedoclyClient {
    constructor(region) {
        this.accessTokens = {};
        this.region = this.loadRegion(region);
        this.loadTokens();
        this.domain = region ? config_1.DOMAINS[region] : config_1.env.REDOCLY_DOMAIN || config_1.DOMAINS[config_1.DEFAULT_REGION];
        config_1.env.REDOCLY_DOMAIN = this.domain; // isRedoclyRegistryURL depends on the value to be set
        this.registryApi = new registry_api_1.RegistryApi(this.accessTokens, this.region);
    }
    loadRegion(region) {
        if (region && !config_1.DOMAINS[region]) {
            throw new Error(`Invalid argument: region in config file.\nGiven: ${colorette_1.green(region)}, choices: "us", "eu".`);
        }
        if (config_1.env.REDOCLY_DOMAIN) {
            return (config_1.AVAILABLE_REGIONS.find((region) => config_1.DOMAINS[region] === config_1.env.REDOCLY_DOMAIN) || config_1.DEFAULT_REGION);
        }
        return region || config_1.DEFAULT_REGION;
    }
    getRegion() {
        return this.region;
    }
    hasTokens() {
        return utils_1.isNotEmptyObject(this.accessTokens);
    }
    // <backward compatibility: old versions of portal>
    hasToken() {
        return !!this.accessTokens[this.region];
    }
    getAuthorizationHeader() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.accessTokens[this.region];
        });
    }
    // </backward compatibility: portal>
    setAccessTokens(accessTokens) {
        this.accessTokens = accessTokens;
    }
    loadTokens() {
        const credentialsPath = path_1.resolve(os_1.homedir(), TOKEN_FILENAME);
        const credentials = this.readCredentialsFile(credentialsPath);
        if (utils_1.isNotEmptyObject(credentials)) {
            this.setAccessTokens(Object.assign(Object.assign({}, credentials), (credentials.token &&
                !credentials[this.region] && {
                [this.region]: credentials.token,
            })));
        }
        if (config_1.env.REDOCLY_AUTHORIZATION) {
            this.setAccessTokens(Object.assign(Object.assign({}, this.accessTokens), { [this.region]: config_1.env.REDOCLY_AUTHORIZATION }));
        }
    }
    getAllTokens() {
        return Object.entries(this.accessTokens)
            .filter(([region]) => config_1.AVAILABLE_REGIONS.includes(region))
            .map(([region, token]) => ({ region, token }));
    }
    getValidTokens() {
        return __awaiter(this, void 0, void 0, function* () {
            const allTokens = this.getAllTokens();
            const verifiedTokens = yield Promise.allSettled(allTokens.map(({ token, region }) => this.verifyToken(token, region)));
            return allTokens
                .filter((_, index) => verifiedTokens[index].status === 'fulfilled')
                .map(({ token, region }) => ({ token, region, valid: true }));
        });
    }
    getTokens() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.hasTokens() ? yield this.getValidTokens() : [];
        });
    }
    isAuthorizedWithRedoclyByRegion() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.hasTokens()) {
                return false;
            }
            const accessToken = this.accessTokens[this.region];
            if (!accessToken) {
                return false;
            }
            try {
                yield this.verifyToken(accessToken, this.region);
                return true;
            }
            catch (err) {
                return false;
            }
        });
    }
    isAuthorizedWithRedocly() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.hasTokens() && utils_1.isNotEmptyObject(yield this.getValidTokens());
        });
    }
    readCredentialsFile(credentialsPath) {
        return fs_1.existsSync(credentialsPath) ? JSON.parse(fs_1.readFileSync(credentialsPath, 'utf-8')) : {};
    }
    verifyToken(accessToken, region, verbose = false) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.registryApi.authStatus(accessToken, region, verbose);
        });
    }
    login(accessToken, verbose = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const credentialsPath = path_1.resolve(os_1.homedir(), TOKEN_FILENAME);
            try {
                yield this.verifyToken(accessToken, this.region, verbose);
            }
            catch (err) {
                throw new Error('Authorization failed. Please check if you entered a valid API key.');
            }
            const credentials = Object.assign(Object.assign({}, this.readCredentialsFile(credentialsPath)), { [this.region]: accessToken, token: accessToken });
            this.accessTokens = credentials;
            this.registryApi.setAccessTokens(credentials);
            fs_1.writeFileSync(credentialsPath, JSON.stringify(credentials, null, 2));
        });
    }
    logout() {
        const credentialsPath = path_1.resolve(os_1.homedir(), TOKEN_FILENAME);
        if (fs_1.existsSync(credentialsPath)) {
            fs_1.unlinkSync(credentialsPath);
        }
    }
}
exports.RedoclyClient = RedoclyClient;
function isRedoclyRegistryURL(link) {
    const domain = config_1.env.REDOCLY_DOMAIN || config_1.DOMAINS[config_1.DEFAULT_REGION];
    const legacyDomain = domain === 'redocly.com' ? 'redoc.ly' : domain;
    if (!link.startsWith(`https://api.${domain}/registry/`) &&
        !link.startsWith(`https://api.${legacyDomain}/registry/`)) {
        return false;
    }
    return true;
}
exports.isRedoclyRegistryURL = isRedoclyRegistryURL;


/***/ }),

/***/ 7977:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isMappingRef = exports.isAbsoluteUrl = exports.refBaseName = exports.pointerBaseName = exports.parsePointer = exports.parseRef = exports.escapePointer = exports.unescapePointer = exports.Location = exports.isRef = exports.joinPointer = void 0;
function joinPointer(base, key) {
    if (base === '')
        base = '#/';
    return base[base.length - 1] === '/' ? base + key : base + '/' + key;
}
exports.joinPointer = joinPointer;
function isRef(node) {
    return node && typeof node.$ref === 'string';
}
exports.isRef = isRef;
class Location {
    constructor(source, pointer) {
        this.source = source;
        this.pointer = pointer;
    }
    child(components) {
        return new Location(this.source, joinPointer(this.pointer, (Array.isArray(components) ? components : [components]).map(escapePointer).join('/')));
    }
    key() {
        return Object.assign(Object.assign({}, this), { reportOnKey: true });
    }
    get absolutePointer() {
        return this.source.absoluteRef + (this.pointer === '#/' ? '' : this.pointer);
    }
}
exports.Location = Location;
function unescapePointer(fragment) {
    return decodeURIComponent(fragment.replace(/~1/g, '/').replace(/~0/g, '~'));
}
exports.unescapePointer = unescapePointer;
function escapePointer(fragment) {
    if (typeof fragment === 'number')
        return fragment;
    return fragment.replace(/~/g, '~0').replace(/\//g, '~1');
}
exports.escapePointer = escapePointer;
function parseRef(ref) {
    const [uri, pointer] = ref.split('#/');
    return {
        uri: uri || null,
        pointer: pointer ? pointer.split('/').map(unescapePointer).filter(Boolean) : [],
    };
}
exports.parseRef = parseRef;
function parsePointer(pointer) {
    return pointer.substr(2).split('/').map(unescapePointer);
}
exports.parsePointer = parsePointer;
function pointerBaseName(pointer) {
    const parts = pointer.split('/');
    return parts[parts.length - 1];
}
exports.pointerBaseName = pointerBaseName;
function refBaseName(ref) {
    const parts = ref.split(/[\/\\]/); // split by '\' and '/'
    return parts[parts.length - 1].replace(/\.[^.]+$/, ''); // replace extension with empty string
}
exports.refBaseName = refBaseName;
function isAbsoluteUrl(ref) {
    return ref.startsWith('http://') || ref.startsWith('https://');
}
exports.isAbsoluteUrl = isAbsoluteUrl;
function isMappingRef(mapping) {
    // TODO: proper detection of mapping refs
    return (mapping.startsWith('#') ||
        mapping.startsWith('https://') ||
        mapping.startsWith('http://') ||
        mapping.startsWith('./') ||
        mapping.startsWith('../') ||
        mapping.indexOf('/') > -1);
}
exports.isMappingRef = isMappingRef;


/***/ }),

/***/ 7098:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolveDocument = exports.BaseResolver = exports.makeDocumentFromString = exports.makeRefId = exports.YamlParseError = exports.ResolveError = exports.Source = void 0;
const fs = __webpack_require__(5747);
const path = __webpack_require__(5622);
const ref_utils_1 = __webpack_require__(7977);
const types_1 = __webpack_require__(4143);
const utils_1 = __webpack_require__(5450);
class Source {
    constructor(absoluteRef, body, mimeType) {
        this.absoluteRef = absoluteRef;
        this.body = body;
        this.mimeType = mimeType;
    }
    // pass safeLoad as argument to separate it from browser bundle
    getAst(safeLoad) {
        var _a;
        if (this._ast === undefined) {
            this._ast = (_a = safeLoad(this.body, { filename: this.absoluteRef })) !== null && _a !== void 0 ? _a : undefined;
            // fix ast representation of file with newlines only
            if (this._ast &&
                this._ast.kind === 0 && // KIND.scalar = 0
                this._ast.value === '' &&
                this._ast.startPosition !== 1) {
                this._ast.startPosition = 1;
                this._ast.endPosition = 1;
            }
        }
        return this._ast;
    }
    getLines() {
        if (this._lines === undefined) {
            this._lines = this.body.split(/\r\n|[\n\r]/g);
        }
        return this._lines;
    }
}
exports.Source = Source;
class ResolveError extends Error {
    constructor(originalError) {
        super(originalError.message);
        this.originalError = originalError;
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, ResolveError.prototype);
    }
}
exports.ResolveError = ResolveError;
const jsYamlErrorLineColRegexp = /\((\d+):(\d+)\)$/;
class YamlParseError extends Error {
    constructor(originalError, source) {
        super(originalError.message.split('\n')[0]);
        this.originalError = originalError;
        this.source = source;
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, YamlParseError.prototype);
        const [, line, col] = this.message.match(jsYamlErrorLineColRegexp) || [];
        this.line = parseInt(line, 10);
        this.col = parseInt(col, 10);
    }
}
exports.YamlParseError = YamlParseError;
function makeRefId(absoluteRef, pointer) {
    return absoluteRef + '::' + pointer;
}
exports.makeRefId = makeRefId;
function makeDocumentFromString(sourceString, absoluteRef) {
    const source = new Source(absoluteRef, sourceString);
    try {
        return {
            source,
            parsed: utils_1.parseYaml(sourceString, { filename: absoluteRef }),
        };
    }
    catch (e) {
        throw new YamlParseError(e, source);
    }
}
exports.makeDocumentFromString = makeDocumentFromString;
class BaseResolver {
    constructor(config = { http: { headers: [] } }) {
        this.config = config;
        this.cache = new Map();
    }
    getFiles() {
        return new Set(Array.from(this.cache.keys()));
    }
    resolveExternalRef(base, ref) {
        if (ref_utils_1.isAbsoluteUrl(ref)) {
            return ref;
        }
        if (base && ref_utils_1.isAbsoluteUrl(base)) {
            return new URL(ref, base).href;
        }
        return path.resolve(base ? path.dirname(base) : process.cwd(), ref);
    }
    loadExternalRef(absoluteRef) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (ref_utils_1.isAbsoluteUrl(absoluteRef)) {
                    const { body, mimeType } = yield utils_1.readFileFromUrl(absoluteRef, this.config.http);
                    return new Source(absoluteRef, body, mimeType);
                }
                else {
                    return new Source(absoluteRef, yield fs.promises.readFile(absoluteRef, 'utf-8'));
                }
            }
            catch (error) {
                throw new ResolveError(error);
            }
        });
    }
    parseDocument(source, isRoot = false) {
        var _a;
        const ext = source.absoluteRef.substr(source.absoluteRef.lastIndexOf('.'));
        if (!['.json', '.json', '.yml', '.yaml'].includes(ext) &&
            !((_a = source.mimeType) === null || _a === void 0 ? void 0 : _a.match(/(json|yaml|openapi)/)) &&
            !isRoot // always parse root
        ) {
            return { source, parsed: source.body };
        }
        try {
            return {
                source,
                parsed: utils_1.parseYaml(source.body, { filename: source.absoluteRef }),
            };
        }
        catch (e) {
            throw new YamlParseError(e, source);
        }
    }
    resolveDocument(base, ref, isRoot = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const absoluteRef = this.resolveExternalRef(base, ref);
            const cachedDocument = this.cache.get(absoluteRef);
            if (cachedDocument) {
                return cachedDocument;
            }
            const doc = this.loadExternalRef(absoluteRef).then((source) => {
                return this.parseDocument(source, isRoot);
            });
            this.cache.set(absoluteRef, doc);
            return doc;
        });
    }
}
exports.BaseResolver = BaseResolver;
function pushRef(head, node) {
    return {
        prev: head,
        node,
    };
}
function hasRef(head, node) {
    while (head) {
        if (head.node === node) {
            return true;
        }
        head = head.prev;
    }
    return false;
}
const unknownType = { name: 'unknown', properties: {} };
const resolvableScalarType = { name: 'scalar', properties: {} };
function resolveDocument(opts) {
    return __awaiter(this, void 0, void 0, function* () {
        const { rootDocument, externalRefResolver, rootType } = opts;
        const resolvedRefMap = new Map();
        const seedNodes = new Set(); // format "${type}::${absoluteRef}${pointer}"
        const resolvePromises = [];
        resolveRefsInParallel(rootDocument.parsed, rootDocument, '#/', rootType);
        let resolved;
        do {
            resolved = yield Promise.all(resolvePromises);
        } while (resolvePromises.length !== resolved.length);
        return resolvedRefMap;
        function resolveRefsInParallel(rootNode, rootNodeDocument, rootNodePointer, type) {
            const rootNodeDocAbsoluteRef = rootNodeDocument.source.absoluteRef;
            walk(rootNode, type, rootNodeDocAbsoluteRef + rootNodePointer);
            function walk(node, type, nodeAbsoluteRef) {
                if (typeof node !== 'object' || node === null) {
                    return;
                }
                const nodeId = `${type.name}::${nodeAbsoluteRef}`;
                if (seedNodes.has(nodeId)) {
                    return;
                }
                seedNodes.add(nodeId);
                if (Array.isArray(node)) {
                    const itemsType = type.items;
                    // we continue resolving unknown types, but stop early on known scalars
                    if (type !== unknownType && itemsType === undefined) {
                        return;
                    }
                    for (let i = 0; i < node.length; i++) {
                        walk(node[i], itemsType || unknownType, ref_utils_1.joinPointer(nodeAbsoluteRef, i));
                    }
                    return;
                }
                for (const propName of Object.keys(node)) {
                    let propValue = node[propName];
                    let propType = type.properties[propName];
                    if (propType === undefined)
                        propType = type.additionalProperties;
                    if (typeof propType === 'function')
                        propType = propType(propValue, propName);
                    if (propType === undefined)
                        propType = unknownType;
                    if (!types_1.isNamedType(propType) && (propType === null || propType === void 0 ? void 0 : propType.directResolveAs)) {
                        propType = propType.directResolveAs;
                        propValue = { $ref: propValue };
                    }
                    if (propType && propType.name === undefined && propType.resolvable !== false) {
                        propType = resolvableScalarType;
                    }
                    if (!types_1.isNamedType(propType) || typeof propValue !== 'object') {
                        continue;
                    }
                    walk(propValue, propType, ref_utils_1.joinPointer(nodeAbsoluteRef, ref_utils_1.escapePointer(propName)));
                }
                if (ref_utils_1.isRef(node)) {
                    const promise = followRef(rootNodeDocument, node, {
                        prev: null,
                        node,
                    }).then((resolvedRef) => {
                        if (resolvedRef.resolved) {
                            resolveRefsInParallel(resolvedRef.node, resolvedRef.document, resolvedRef.nodePointer, type);
                        }
                    });
                    resolvePromises.push(promise);
                }
            }
            function followRef(document, ref, refStack) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (hasRef(refStack.prev, ref)) {
                        throw new Error('Self-referencing circular pointer');
                    }
                    const { uri, pointer } = ref_utils_1.parseRef(ref.$ref);
                    const isRemote = uri !== null;
                    let targetDoc;
                    try {
                        targetDoc = isRemote
                            ? (yield externalRefResolver.resolveDocument(document.source.absoluteRef, uri))
                            : document;
                    }
                    catch (error) {
                        const resolvedRef = {
                            resolved: false,
                            isRemote,
                            document: undefined,
                            error: error,
                        };
                        const refId = makeRefId(document.source.absoluteRef, ref.$ref);
                        resolvedRefMap.set(refId, resolvedRef);
                        return resolvedRef;
                    }
                    let resolvedRef = {
                        resolved: true,
                        document: targetDoc,
                        isRemote,
                        node: document.parsed,
                        nodePointer: '#/',
                    };
                    let target = targetDoc.parsed;
                    const segments = pointer;
                    for (let segment of segments) {
                        if (typeof target !== 'object') {
                            target = undefined;
                            break;
                        }
                        else if (target[segment] !== undefined) {
                            target = target[segment];
                            resolvedRef.nodePointer = ref_utils_1.joinPointer(resolvedRef.nodePointer, ref_utils_1.escapePointer(segment));
                        }
                        else if (ref_utils_1.isRef(target)) {
                            resolvedRef = yield followRef(targetDoc, target, pushRef(refStack, target));
                            targetDoc = resolvedRef.document || targetDoc;
                            if (typeof resolvedRef.node !== 'object') {
                                target = undefined;
                                break;
                            }
                            target = resolvedRef.node[segment];
                            resolvedRef.nodePointer = ref_utils_1.joinPointer(resolvedRef.nodePointer, ref_utils_1.escapePointer(segment));
                        }
                        else {
                            target = undefined;
                            break;
                        }
                    }
                    resolvedRef.node = target;
                    resolvedRef.document = targetDoc;
                    const refId = makeRefId(document.source.absoluteRef, ref.$ref);
                    if (resolvedRef.document && ref_utils_1.isRef(target)) {
                        resolvedRef = yield followRef(resolvedRef.document, target, pushRef(refStack, target));
                    }
                    resolvedRefMap.set(refId, resolvedRef);
                    return Object.assign({}, resolvedRef);
                });
            }
        }
    });
}
exports.resolveDocument = resolveDocument;


/***/ }),

/***/ 5166:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validateJsonSchema = exports.releaseAjvInstance = void 0;
const ajv_1 = __webpack_require__(2065);
const ref_utils_1 = __webpack_require__(7977);
let ajvInstance = null;
function releaseAjvInstance() {
    ajvInstance = null;
}
exports.releaseAjvInstance = releaseAjvInstance;
function getAjv(resolve, disallowAdditionalProperties) {
    if (!ajvInstance) {
        ajvInstance = new ajv_1.default({
            schemaId: '$id',
            meta: true,
            allErrors: true,
            strictSchema: false,
            inlineRefs: false,
            validateSchema: false,
            discriminator: true,
            allowUnionTypes: true,
            validateFormats: false,
            defaultAdditionalProperties: !disallowAdditionalProperties,
            loadSchemaSync(base, $ref) {
                const resolvedRef = resolve({ $ref }, base.split('#')[0]);
                if (!resolvedRef || !resolvedRef.location)
                    return undefined;
                return Object.assign({ $id: resolvedRef.location.absolutePointer }, resolvedRef.node);
            },
            logger: false,
        });
    }
    return ajvInstance;
}
function getAjvValidator(schema, loc, resolve, disallowAdditionalProperties) {
    const ajv = getAjv(resolve, disallowAdditionalProperties);
    if (!ajv.getSchema(loc.absolutePointer)) {
        ajv.addSchema(Object.assign({ $id: loc.absolutePointer }, schema), loc.absolutePointer);
    }
    return ajv.getSchema(loc.absolutePointer);
}
function validateJsonSchema(data, schema, schemaLoc, instancePath, resolve, disallowAdditionalProperties) {
    const validate = getAjvValidator(schema, schemaLoc, resolve, disallowAdditionalProperties);
    if (!validate)
        return { valid: true, errors: [] }; // unresolved refs are reported
    const valid = validate(data, {
        instancePath,
        parentData: { fake: {} },
        parentDataProperty: 'fake',
        rootData: {},
        dynamicAnchors: {},
    });
    return {
        valid: !!valid,
        errors: (validate.errors || []).map(beatifyErrorMessage),
    };
    function beatifyErrorMessage(error) {
        let message = error.message;
        let suggest = error.keyword === 'enum' ? error.params.allowedValues : undefined;
        if (suggest) {
            message += ` ${suggest.map((e) => `"${e}"`).join(', ')}`;
        }
        if (error.keyword === 'type') {
            message = `type ${message}`;
        }
        const relativePath = error.instancePath.substring(instancePath.length + 1);
        const propName = relativePath.substring(relativePath.lastIndexOf('/') + 1);
        if (propName) {
            message = `\`${propName}\` property ${message}`;
        }
        if (error.keyword === 'additionalProperties') {
            const property = error.params.additionalProperty;
            message = `${message} \`${property}\``;
            error.instancePath += '/' + ref_utils_1.escapePointer(property);
        }
        return Object.assign(Object.assign({}, error), { message,
            suggest });
    }
}
exports.validateJsonSchema = validateJsonSchema;


/***/ }),

/***/ 815:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OasSpec = void 0;
const types_1 = __webpack_require__(4143);
const utils_1 = __webpack_require__(3944);
const ref_utils_1 = __webpack_require__(7977);
const utils_2 = __webpack_require__(5450);
const OasSpec = () => {
    return {
        any(node, { report, type, location, key, resolve, ignoreNextVisitorsOnNode }) {
            var _a, _b, _c, _d;
            const nodeType = utils_1.oasTypeOf(node);
            if (type.items) {
                if (nodeType !== 'array') {
                    report({
                        message: `Expected type \`${type.name}\` (array) but got \`${nodeType}\``,
                    });
                    ignoreNextVisitorsOnNode();
                }
                return;
            }
            else if (nodeType !== 'object') {
                report({
                    message: `Expected type \`${type.name}\` (object) but got \`${nodeType}\``,
                });
                ignoreNextVisitorsOnNode();
                return;
            }
            const required = typeof type.required === 'function' ? type.required(node, key) : type.required;
            for (let propName of required || []) {
                if (!node.hasOwnProperty(propName)) {
                    report({
                        message: `The field \`${propName}\` must be present on this level.`,
                        location: [{ reportOnKey: true }],
                    });
                }
            }
            const allowed = (_a = type.allowed) === null || _a === void 0 ? void 0 : _a.call(type, node);
            if (allowed && utils_2.isPlainObject(node)) {
                for (const propName in node) {
                    if (allowed.includes(propName) ||
                        (type.extensionsPrefix && propName.startsWith(type.extensionsPrefix)) ||
                        !Object.keys(type.properties).includes(propName)) {
                        continue;
                    }
                    report({
                        message: `The field \`${propName}\` is not allowed here.`,
                        location: location.child([propName]).key()
                    });
                }
            }
            const requiredOneOf = type.requiredOneOf || null;
            if (requiredOneOf) {
                let hasProperty = false;
                for (let propName of requiredOneOf || []) {
                    if (node.hasOwnProperty(propName)) {
                        hasProperty = true;
                    }
                }
                if (!hasProperty)
                    report({
                        message: `Must contain at least one of the following fields: ${(_b = type.requiredOneOf) === null || _b === void 0 ? void 0 : _b.join(', ')}.`,
                        location: [{ reportOnKey: true }],
                    });
            }
            for (const propName of Object.keys(node)) {
                const propLocation = location.child([propName]);
                let propValue = node[propName];
                let propType = type.properties[propName];
                if (propType === undefined)
                    propType = type.additionalProperties;
                if (typeof propType === 'function')
                    propType = propType(propValue, propName);
                if (types_1.isNamedType(propType)) {
                    continue; // do nothing for named schema, it is executed with the next any call
                }
                const propSchema = propType;
                const propValueType = utils_1.oasTypeOf(propValue);
                if (propSchema === undefined) {
                    if (propName.startsWith('x-'))
                        continue;
                    report({
                        message: `Property \`${propName}\` is not expected here.`,
                        suggest: utils_1.getSuggest(propName, Object.keys(type.properties)),
                        location: propLocation.key(),
                    });
                    continue;
                }
                if (propSchema === null) {
                    continue; // just defined, no validation
                }
                if (propSchema.resolvable !== false && ref_utils_1.isRef(propValue)) {
                    propValue = resolve(propValue).node;
                }
                if (propSchema.enum) {
                    if (!propSchema.enum.includes(propValue)) {
                        report({
                            location: propLocation,
                            message: `\`${propName}\` can be one of the following only: ${propSchema.enum
                                .map((i) => `"${i}"`)
                                .join(', ')}.`,
                            suggest: utils_1.getSuggest(propValue, propSchema.enum),
                        });
                    }
                }
                else if (propSchema.type && !utils_1.matchesJsonSchemaType(propValue, propSchema.type, false)) {
                    report({
                        message: `Expected type \`${propSchema.type}\` but got \`${propValueType}\`.`,
                        location: propLocation,
                    });
                }
                else if (propValueType === 'array' && ((_c = propSchema.items) === null || _c === void 0 ? void 0 : _c.type)) {
                    const itemsType = (_d = propSchema.items) === null || _d === void 0 ? void 0 : _d.type;
                    for (let i = 0; i < propValue.length; i++) {
                        const item = propValue[i];
                        if (!utils_1.matchesJsonSchemaType(item, itemsType, false)) {
                            report({
                                message: `Expected type \`${itemsType}\` but got \`${utils_1.oasTypeOf(item)}\`.`,
                                location: propLocation.child([i]),
                            });
                        }
                    }
                }
                if (typeof propSchema.minimum === 'number') {
                    if (propSchema.minimum > node[propName]) {
                        report({
                            message: `The value of the ${propName} field must be greater than or equal to ${propSchema.minimum}`,
                            location: location.child([propName]),
                        });
                    }
                }
            }
        },
    };
};
exports.OasSpec = OasSpec;


/***/ }),

/***/ 4440:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.reportUnresolvedRef = exports.NoUnresolvedRefs = void 0;
const resolve_1 = __webpack_require__(7098);
const NoUnresolvedRefs = () => {
    return {
        ref: {
            leave(_, { report, location }, resolved) {
                if (resolved.node !== undefined)
                    return;
                reportUnresolvedRef(resolved, report, location);
            },
        },
        DiscriminatorMapping(mapping, { report, resolve, location }) {
            for (const mappingName of Object.keys(mapping)) {
                const resolved = resolve({ $ref: mapping[mappingName] });
                if (resolved.node !== undefined)
                    return;
                reportUnresolvedRef(resolved, report, location.child(mappingName));
            }
        },
    };
};
exports.NoUnresolvedRefs = NoUnresolvedRefs;
function reportUnresolvedRef(resolved, report, location) {
    var _a;
    const error = resolved.error;
    if (error instanceof resolve_1.YamlParseError) {
        report({
            message: 'Failed to parse: ' + error.message,
            location: {
                source: error.source,
                pointer: undefined,
                start: {
                    col: error.col,
                    line: error.line,
                },
            },
        });
    }
    const message = (_a = resolved.error) === null || _a === void 0 ? void 0 : _a.message;
    report({
        location,
        message: `Can't resolve $ref${message ? ': ' + message : ''}`,
    });
}
exports.reportUnresolvedRef = reportUnresolvedRef;


/***/ }),

/***/ 8373:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Stats = void 0;
const Stats = (statsAccumulator) => {
    return {
        ExternalDocs: { leave() { statsAccumulator.externalDocs.total++; } },
        ref: { enter(ref) { statsAccumulator.refs.items.add(ref['$ref']); } },
        Tag: { leave(tag) { statsAccumulator.tags.items.add(tag.name); } },
        Link: { leave(link) { statsAccumulator.links.items.add(link.operationId); } },
        DefinitionRoot: {
            leave() {
                statsAccumulator.parameters.total = statsAccumulator.parameters.items.size;
                statsAccumulator.refs.total = statsAccumulator.refs.items.size;
                statsAccumulator.links.total = statsAccumulator.links.items.size;
                statsAccumulator.tags.total = statsAccumulator.tags.items.size;
            },
        },
        WebhooksMap: {
            Operation: {
                leave(operation) {
                    operation.tags.forEach((tag) => { statsAccumulator.tags.items.add(tag); });
                }
            }
        },
        PathMap: {
            PathItem: {
                leave() { statsAccumulator.pathItems.total++; },
                Operation: {
                    leave(operation) {
                        statsAccumulator.operations.total++;
                        operation.tags && operation.tags.forEach((tag) => { statsAccumulator.tags.items.add(tag); });
                    }
                },
                Parameter: { leave(parameter) {
                        statsAccumulator.parameters.items.add(parameter.name);
                    } },
            },
        },
        NamedSchemas: {
            Schema: { leave() { statsAccumulator.schemas.total++; } }
        }
    };
};
exports.Stats = Stats;


/***/ }),

/***/ 3944:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validateExample = exports.getSuggest = exports.validateDefinedAndNonEmpty = exports.fieldNonEmpty = exports.missingRequiredField = exports.matchesJsonSchemaType = exports.oasTypeOf = void 0;
const levenshtein = __webpack_require__(7468);
const ref_utils_1 = __webpack_require__(7977);
const ajv_1 = __webpack_require__(5166);
function oasTypeOf(value) {
    if (Array.isArray(value)) {
        return 'array';
    }
    else if (value === null) {
        return 'null';
    }
    else {
        return typeof value;
    }
}
exports.oasTypeOf = oasTypeOf;
/**
 * Checks if value matches specified JSON schema type
 *
 * @param {*} value - value to check
 * @param {JSONSchemaType} type - JSON Schema type
 * @returns boolean
 */
function matchesJsonSchemaType(value, type, nullable) {
    if (nullable && value === null) {
        return value === null;
    }
    switch (type) {
        case 'array':
            return Array.isArray(value);
        case 'object':
            return typeof value === 'object' && value !== null && !Array.isArray(value);
        case 'null':
            return value === null;
        case 'integer':
            return Number.isInteger(value);
        default:
            return typeof value === type;
    }
}
exports.matchesJsonSchemaType = matchesJsonSchemaType;
function missingRequiredField(type, field) {
    return `${type} object should contain \`${field}\` field.`;
}
exports.missingRequiredField = missingRequiredField;
function fieldNonEmpty(type, field) {
    return `${type} object \`${field}\` must be non-empty string.`;
}
exports.fieldNonEmpty = fieldNonEmpty;
function validateDefinedAndNonEmpty(fieldName, value, ctx) {
    if (typeof value !== 'object') {
        return;
    }
    if (value[fieldName] === undefined) {
        ctx.report({
            message: missingRequiredField(ctx.type.name, fieldName),
            location: ctx.location.child([fieldName]).key(),
        });
    }
    else if (!value[fieldName]) {
        ctx.report({
            message: fieldNonEmpty(ctx.type.name, fieldName),
            location: ctx.location.child([fieldName]).key(),
        });
    }
}
exports.validateDefinedAndNonEmpty = validateDefinedAndNonEmpty;
function getSuggest(given, variants) {
    if (typeof given !== 'string' || !variants.length)
        return [];
    const distances = [];
    for (let i = 0; i < variants.length; i++) {
        const distance = levenshtein(given, variants[i]);
        if (distance < 4) {
            distances.push({ distance, variant: variants[i] });
        }
    }
    distances.sort((a, b) => a.distance - b.distance);
    // if (bestMatch.distance <= 4) return bestMatch.string;
    return distances.map((d) => d.variant);
}
exports.getSuggest = getSuggest;
function validateExample(example, schema, dataLoc, { resolve, location, report }, disallowAdditionalProperties) {
    try {
        const { valid, errors } = ajv_1.validateJsonSchema(example, schema, location.child('schema'), dataLoc.pointer, resolve, disallowAdditionalProperties);
        if (!valid) {
            for (let error of errors) {
                report({
                    message: `Example value must conform to the schema: ${error.message}.`,
                    location: Object.assign(Object.assign({}, new ref_utils_1.Location(dataLoc.source, error.instancePath)), { reportOnKey: error.keyword === 'additionalProperties' }),
                    from: location,
                    suggest: error.suggest,
                });
            }
        }
    }
    catch (e) {
        report({
            message: `Example validation errored: ${e.message}.`,
            location: location.child('schema'),
            from: location,
        });
    }
}
exports.validateExample = validateExample;


/***/ }),

/***/ 4143:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isNamedType = exports.normalizeTypes = exports.mapOf = exports.listOf = void 0;
function listOf(typeName) {
    return {
        name: `${typeName}List`,
        properties: {},
        items: typeName,
    };
}
exports.listOf = listOf;
function mapOf(typeName) {
    return {
        name: `${typeName}Map`,
        properties: {},
        additionalProperties: () => typeName,
    };
}
exports.mapOf = mapOf;
function normalizeTypes(types, options = {}) {
    const normalizedTypes = {};
    for (const typeName of Object.keys(types)) {
        normalizedTypes[typeName] = Object.assign(Object.assign({}, types[typeName]), { name: typeName });
    }
    for (const type of Object.values(normalizedTypes)) {
        normalizeType(type);
    }
    return normalizedTypes;
    function normalizeType(type) {
        if (type.additionalProperties) {
            type.additionalProperties = resolveType(type.additionalProperties);
        }
        if (type.items) {
            type.items = resolveType(type.items);
        }
        if (type.properties) {
            const mappedProps = {};
            for (const [propName, prop] of Object.entries(type.properties)) {
                mappedProps[propName] = resolveType(prop);
                if (options.doNotResolveExamples && prop && prop.isExample) {
                    mappedProps[propName] = Object.assign(Object.assign({}, prop), { resolvable: false });
                }
            }
            type.properties = mappedProps;
        }
    }
    // typings are painful here...
    function resolveType(type) {
        if (typeof type === 'string') {
            if (!normalizedTypes[type]) {
                throw new Error(`Unknown type name found: ${type}`);
            }
            return normalizedTypes[type];
        }
        else if (typeof type === 'function') {
            return (value, key) => {
                return resolveType(type(value, key));
            };
        }
        else if (type && type.name) {
            type = Object.assign({}, type);
            normalizeType(type);
            return type;
        }
        else if (type && type.directResolveAs) {
            return Object.assign(Object.assign({}, type), { directResolveAs: resolveType(type.directResolveAs) });
        }
        else {
            return type;
        }
    }
}
exports.normalizeTypes = normalizeTypes;
function isNamedType(t) {
    return typeof (t === null || t === void 0 ? void 0 : t.name) === 'string';
}
exports.isNamedType = isNamedType;


/***/ }),

/***/ 3289:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Oas2Types = void 0;
const _1 = __webpack_require__(4143);
const responseCodeRegexp = /^[0-9][0-9Xx]{2}$/;
const DefinitionRoot = {
    properties: {
        swagger: { type: 'string' },
        info: 'Info',
        host: { type: 'string' },
        basePath: { type: 'string' },
        schemes: { type: 'array', items: { type: 'string' } },
        consumes: { type: 'array', items: { type: 'string' } },
        produces: { type: 'array', items: { type: 'string' } },
        paths: 'PathMap',
        definitions: 'NamedSchemas',
        parameters: 'NamedParameters',
        responses: 'NamedResponses',
        securityDefinitions: 'NamedSecuritySchemes',
        security: _1.listOf('SecurityRequirement'),
        tags: _1.listOf('Tag'),
        externalDocs: 'ExternalDocs',
    },
    required: ['swagger', 'paths', 'info'],
};
const Info = {
    properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        termsOfService: { type: 'string' },
        contact: 'Contact',
        license: 'License',
        version: { type: 'string' },
    },
    required: ['title', 'version'],
};
const Contact = {
    properties: {
        name: { type: 'string' },
        url: { type: 'string' },
        email: { type: 'string' },
    },
};
const License = {
    properties: {
        name: { type: 'string' },
        url: { type: 'string' },
    },
    required: ['name'],
};
const PathMap = {
    properties: {},
    additionalProperties: (_value, key) => key.startsWith('/') ? 'PathItem' : undefined,
};
const PathItem = {
    properties: {
        $ref: { type: 'string' },
        parameters: _1.listOf('Parameter'),
        get: 'Operation',
        put: 'Operation',
        post: 'Operation',
        delete: 'Operation',
        options: 'Operation',
        head: 'Operation',
        patch: 'Operation',
    },
};
const Operation = {
    properties: {
        tags: { type: 'array', items: { type: 'string' } },
        summary: { type: 'string' },
        description: { type: 'string' },
        externalDocs: 'ExternalDocs',
        operationId: { type: 'string' },
        consumes: { type: 'array', items: { type: 'string' } },
        produces: { type: 'array', items: { type: 'string' } },
        parameters: _1.listOf('Parameter'),
        responses: 'ResponsesMap',
        schemes: { type: 'array', items: { type: 'string' } },
        deprecated: { type: 'boolean' },
        security: _1.listOf('SecurityRequirement'),
        'x-codeSamples': _1.listOf('XCodeSample'),
        'x-code-samples': _1.listOf('XCodeSample'),
        'x-hideTryItPanel': { type: 'boolean' },
    },
    required: ['responses'],
};
const XCodeSample = {
    properties: {
        lang: { type: 'string' },
        label: { type: 'string' },
        source: { type: 'string' },
    },
};
const ExternalDocs = {
    properties: {
        description: { type: 'string' },
        url: { type: 'string' },
    },
    required: ['url'],
};
const Parameter = {
    properties: {
        name: { type: 'string' },
        in: { type: 'string', enum: ['query', 'header', 'path', 'formData', 'body'] },
        description: { type: 'string' },
        required: { type: 'boolean' },
        schema: 'Schema',
        type: { type: 'string', enum: ['string', 'number', 'integer', 'boolean', 'array', 'file'] },
        format: { type: 'string' },
        allowEmptyValue: { type: 'boolean' },
        items: 'ParameterItems',
        collectionFormat: { type: 'string', enum: ['csv', 'ssv', 'tsv', 'pipes', 'multi'] },
        default: null,
        maximum: { type: 'integer' },
        exclusiveMaximum: { type: 'boolean' },
        minimum: { type: 'integer' },
        exclusiveMinimum: { type: 'boolean' },
        maxLength: { type: 'integer' },
        minLength: { type: 'integer' },
        pattern: { type: 'string' },
        maxItems: { type: 'integer' },
        minItems: { type: 'integer' },
        uniqueItems: { type: 'boolean' },
        enum: { type: 'array' },
        multipleOf: { type: 'number' },
    },
    required(value) {
        if (!value || !value.in) {
            return ['name', 'in'];
        }
        if (value.in === 'body') {
            return ['name', 'in', 'schema'];
        }
        else {
            if (value.type === 'array') {
                return ['name', 'in', 'type', 'items'];
            }
            else {
                return ['name', 'in', 'type'];
            }
        }
    },
};
const ParameterItems = {
    properties: {
        type: { type: 'string', enum: ['string', 'number', 'integer', 'boolean', 'array'] },
        format: { type: 'string' },
        items: 'ParameterItems',
        collectionFormat: { type: 'string', enum: ['csv', 'ssv', 'tsv', 'pipes', 'multi'] },
        default: null,
        maximum: { type: 'integer' },
        exclusiveMaximum: { type: 'boolean' },
        minimum: { type: 'integer' },
        exclusiveMinimum: { type: 'boolean' },
        maxLength: { type: 'integer' },
        minLength: { type: 'integer' },
        pattern: { type: 'string' },
        maxItems: { type: 'integer' },
        minItems: { type: 'integer' },
        uniqueItems: { type: 'boolean' },
        enum: { type: 'array' },
        multipleOf: { type: 'number' },
    },
    required(value) {
        if (value && value.type === 'array') {
            return ['type', 'items'];
        }
        else {
            return ['type'];
        }
    },
};
const ResponsesMap = {
    properties: {
        default: 'Response',
    },
    additionalProperties: (_v, key) => responseCodeRegexp.test(key) ? 'Response' : undefined,
};
const Response = {
    properties: {
        description: { type: 'string' },
        schema: 'Schema',
        headers: _1.mapOf('Header'),
        examples: 'Examples',
    },
    required: ['description'],
};
const Examples = {
    properties: {},
    additionalProperties: { isExample: true },
};
const Header = {
    properties: {
        description: { type: 'string' },
        type: { type: 'string', enum: ['string', 'number', 'integer', 'boolean', 'array'] },
        format: { type: 'string' },
        items: 'ParameterItems',
        collectionFormat: { type: 'string', enum: ['csv', 'ssv', 'tsv', 'pipes', 'multi'] },
        default: null,
        maximum: { type: 'integer' },
        exclusiveMaximum: { type: 'boolean' },
        minimum: { type: 'integer' },
        exclusiveMinimum: { type: 'boolean' },
        maxLength: { type: 'integer' },
        minLength: { type: 'integer' },
        pattern: { type: 'string' },
        maxItems: { type: 'integer' },
        minItems: { type: 'integer' },
        uniqueItems: { type: 'boolean' },
        enum: { type: 'array' },
        multipleOf: { type: 'number' },
    },
    required(value) {
        if (value && value.type === 'array') {
            return ['type', 'items'];
        }
        else {
            return ['type'];
        }
    },
};
const Tag = {
    properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        externalDocs: 'ExternalDocs',
    },
    required: ['name'],
};
const Schema = {
    properties: {
        format: { type: 'string' },
        title: { type: 'string' },
        description: { type: 'string' },
        default: null,
        multipleOf: { type: 'number' },
        maximum: { type: 'number' },
        minimum: { type: 'number' },
        exclusiveMaximum: { type: 'boolean' },
        exclusiveMinimum: { type: 'boolean' },
        maxLength: { type: 'number' },
        minLength: { type: 'number' },
        pattern: { type: 'string' },
        maxItems: { type: 'number' },
        minItems: { type: 'number' },
        uniqueItems: { type: 'boolean' },
        maxProperties: { type: 'number' },
        minProperties: { type: 'number' },
        required: { type: 'array', items: { type: 'string' } },
        enum: { type: 'array' },
        type: {
            type: 'string',
            enum: ['object', 'array', 'string', 'number', 'integer', 'boolean', 'null'],
        },
        items: (value) => {
            if (Array.isArray(value)) {
                return _1.listOf('Schema');
            }
            else {
                return 'Schema';
            }
        },
        allOf: _1.listOf('Schema'),
        properties: 'SchemaProperties',
        additionalProperties: (value) => {
            if (typeof value === 'boolean') {
                return { type: 'boolean' };
            }
            else {
                return 'Schema';
            }
        },
        discriminator: { type: 'string' },
        readOnly: { type: 'boolean' },
        xml: 'Xml',
        externalDocs: 'ExternalDocs',
        example: { isExample: true },
        'x-tags': { type: 'array', items: { type: 'string' } },
    },
};
const SchemaProperties = {
    properties: {},
    additionalProperties: 'Schema',
};
const Xml = {
    properties: {
        name: { type: 'string' },
        namespace: { type: 'string' },
        prefix: { type: 'string' },
        attribute: { type: 'boolean' },
        wrapped: { type: 'boolean' },
    },
};
const SecurityScheme = {
    properties: {
        type: { enum: ['basic', 'apiKey', 'oauth2'] },
        description: { type: 'string' },
        name: { type: 'string' },
        in: { type: 'string', enum: ['query', 'header'] },
        flow: { enum: ['implicit', 'password', 'application', 'accessCode'] },
        authorizationUrl: { type: 'string' },
        tokenUrl: { type: 'string' },
        scopes: { type: 'object', additionalProperties: { type: 'string' } },
    },
    required(value) {
        switch (value === null || value === void 0 ? void 0 : value.type) {
            case 'apiKey':
                return ['type', 'name', 'in'];
            case 'oauth2':
                switch (value === null || value === void 0 ? void 0 : value.flow) {
                    case 'implicit':
                        return ['type', 'flow', 'authorizationUrl', 'scopes'];
                    case 'accessCode':
                        return ['type', 'flow', 'authorizationUrl', 'tokenUrl', 'scopes'];
                    case 'application':
                    case 'password':
                        return ['type', 'flow', 'tokenUrl', 'scopes'];
                    default:
                        return ['type', 'flow', 'scopes'];
                }
            default:
                return ['type'];
        }
    },
    allowed(value) {
        switch (value === null || value === void 0 ? void 0 : value.type) {
            case 'basic':
                return ['type', 'description'];
            case 'apiKey':
                return ['type', 'name', 'in', 'description'];
            case 'oauth2':
                switch (value === null || value === void 0 ? void 0 : value.flow) {
                    case 'implicit':
                        return ['type', 'flow', 'authorizationUrl', 'description', 'scopes'];
                    case 'accessCode':
                        return ['type', 'flow', 'authorizationUrl', 'tokenUrl', 'description', 'scopes'];
                    case 'application':
                    case 'password':
                        return ['type', 'flow', 'tokenUrl', 'description', 'scopes'];
                    default:
                        return ['type', 'flow', 'tokenUrl', 'authorizationUrl', 'description', 'scopes'];
                }
            default:
                return ['type', 'description'];
        }
    },
    extensionsPrefix: 'x-',
};
const SecurityRequirement = {
    properties: {},
    additionalProperties: { type: 'array', items: { type: 'string' } },
};
exports.Oas2Types = {
    DefinitionRoot,
    Tag,
    ExternalDocs,
    SecurityRequirement,
    Info,
    Contact,
    License,
    PathMap,
    PathItem,
    Parameter,
    ParameterItems,
    Operation,
    Examples,
    Header,
    ResponsesMap,
    Response,
    Schema,
    Xml,
    SchemaProperties,
    NamedSchemas: _1.mapOf('Schema'),
    NamedResponses: _1.mapOf('Response'),
    NamedParameters: _1.mapOf('Parameter'),
    NamedSecuritySchemes: _1.mapOf('SecurityScheme'),
    SecurityScheme,
    XCodeSample,
};


/***/ }),

/***/ 7296:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Oas3Types = void 0;
const _1 = __webpack_require__(4143);
const ref_utils_1 = __webpack_require__(7977);
const responseCodeRegexp = /^[0-9][0-9Xx]{2}$/;
const DefinitionRoot = {
    properties: {
        openapi: null,
        info: 'Info',
        servers: _1.listOf('Server'),
        security: _1.listOf('SecurityRequirement'),
        tags: _1.listOf('Tag'),
        externalDocs: 'ExternalDocs',
        paths: 'PathMap',
        components: 'Components',
        'x-webhooks': 'WebhooksMap',
    },
    required: ['openapi', 'paths', 'info'],
};
const Tag = {
    properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        externalDocs: 'ExternalDocs',
    },
    required: ['name'],
};
const ExternalDocs = {
    properties: {
        description: { type: 'string' },
        url: { type: 'string' },
    },
    required: ['url'],
};
const Server = {
    properties: {
        url: { type: 'string' },
        description: { type: 'string' },
        variables: _1.mapOf('ServerVariable'),
    },
    required: ['url'],
};
const ServerVariable = {
    properties: {
        enum: {
            type: 'array',
            items: { type: 'string' },
        },
        default: { type: 'string' },
        description: null,
    },
    required: ['default'],
};
const SecurityRequirement = {
    properties: {},
    additionalProperties: { type: 'array', items: { type: 'string' } },
};
const Info = {
    properties: {
        title: { type: 'string' },
        version: { type: 'string' },
        description: { type: 'string' },
        termsOfService: { type: 'string' },
        contact: 'Contact',
        license: 'License',
    },
    required: ['title', 'version'],
};
const Contact = {
    properties: {
        name: { type: 'string' },
        url: { type: 'string' },
        email: { type: 'string' },
    },
};
const License = {
    properties: {
        name: { type: 'string' },
        url: { type: 'string' },
    },
    required: ['name'],
};
const PathMap = {
    properties: {},
    additionalProperties: (_value, key) => key.startsWith('/') ? 'PathItem' : undefined,
};
const WebhooksMap = {
    properties: {},
    additionalProperties: () => 'PathItem',
};
const PathItem = {
    properties: {
        $ref: { type: 'string' },
        servers: _1.listOf('Server'),
        parameters: _1.listOf('Parameter'),
        summary: { type: 'string' },
        description: { type: 'string' },
        get: 'Operation',
        put: 'Operation',
        post: 'Operation',
        delete: 'Operation',
        options: 'Operation',
        head: 'Operation',
        patch: 'Operation',
        trace: 'Operation',
    },
};
const Parameter = {
    properties: {
        name: { type: 'string' },
        in: { enum: ['query', 'header', 'path', 'cookie'] },
        description: { type: 'string' },
        required: { type: 'boolean' },
        deprecated: { type: 'boolean' },
        allowEmptyValue: { type: 'boolean' },
        style: {
            enum: ['form', 'simple', 'label', 'matrix', 'spaceDelimited', 'pipeDelimited', 'deepObject'],
        },
        explode: { type: 'boolean' },
        allowReserved: { type: 'boolean' },
        schema: 'Schema',
        example: { isExample: true },
        examples: _1.mapOf('Example'),
        content: 'MediaTypeMap',
    },
    required: ['name', 'in'],
    requiredOneOf: ['schema', 'content'],
};
const Operation = {
    properties: {
        tags: {
            type: 'array',
            items: { type: 'string' },
        },
        summary: { type: 'string' },
        description: { type: 'string' },
        externalDocs: 'ExternalDocs',
        operationId: { type: 'string' },
        parameters: _1.listOf('Parameter'),
        security: _1.listOf('SecurityRequirement'),
        servers: _1.listOf('Server'),
        requestBody: 'RequestBody',
        responses: 'ResponsesMap',
        deprecated: { type: 'boolean' },
        callbacks: _1.mapOf('Callback'),
        'x-codeSamples': _1.listOf('XCodeSample'),
        'x-code-samples': _1.listOf('XCodeSample'),
        'x-hideTryItPanel': { type: 'boolean' },
    },
    required: ['responses'],
};
const XCodeSample = {
    properties: {
        lang: { type: 'string' },
        label: { type: 'string' },
        source: { type: 'string' },
    },
};
const RequestBody = {
    properties: {
        description: { type: 'string' },
        required: { type: 'boolean' },
        content: 'MediaTypeMap',
    },
    required: ['content'],
};
const MediaTypeMap = {
    properties: {},
    additionalProperties: 'MediaType',
};
const MediaType = {
    properties: {
        schema: 'Schema',
        example: { isExample: true },
        examples: _1.mapOf('Example'),
        encoding: _1.mapOf('Encoding'),
    },
};
const Example = {
    properties: {
        value: { isExample: true },
        summary: { type: 'string' },
        description: { type: 'string' },
        externalValue: { type: 'string' },
    },
};
const Encoding = {
    properties: {
        contentType: { type: 'string' },
        headers: _1.mapOf('Header'),
        style: {
            enum: ['form', 'simple', 'label', 'matrix', 'spaceDelimited', 'pipeDelimited', 'deepObject'],
        },
        explode: { type: 'boolean' },
        allowReserved: { type: 'boolean' },
    },
};
const Header = {
    properties: {
        description: { type: 'string' },
        required: { type: 'boolean' },
        deprecated: { type: 'boolean' },
        allowEmptyValue: { type: 'boolean' },
        style: {
            enum: ['form', 'simple', 'label', 'matrix', 'spaceDelimited', 'pipeDelimited', 'deepObject'],
        },
        explode: { type: 'boolean' },
        allowReserved: { type: 'boolean' },
        schema: 'Schema',
        example: { isExample: true },
        examples: _1.mapOf('Example'),
        content: 'MediaTypeMap',
    },
};
const ResponsesMap = {
    properties: { default: 'Response' },
    additionalProperties: (_v, key) => responseCodeRegexp.test(key) ? 'Response' : undefined,
};
const Response = {
    properties: {
        description: { type: 'string' },
        headers: _1.mapOf('Header'),
        content: 'MediaTypeMap',
        links: _1.mapOf('Link'),
    },
    required: ['description'],
};
const Link = {
    properties: {
        operationRef: { type: 'string' },
        operationId: { type: 'string' },
        parameters: null,
        requestBody: null,
        description: { type: 'string' },
        server: 'Server',
    },
};
const Schema = {
    properties: {
        externalDocs: 'ExternalDocs',
        discriminator: 'Discriminator',
        title: { type: 'string' },
        multipleOf: { type: 'number', minimum: 0 },
        maximum: { type: 'number' },
        minimum: { type: 'number' },
        exclusiveMaximum: { type: 'boolean' },
        exclusiveMinimum: { type: 'boolean' },
        maxLength: { type: 'integer', minimum: 0 },
        minLength: { type: 'integer', minimum: 0 },
        pattern: { type: 'string' },
        maxItems: { type: 'integer', minimum: 0 },
        minItems: { type: 'integer', minimum: 0 },
        uniqueItems: { type: 'boolean' },
        maxProperties: { type: 'integer', minimum: 0 },
        minProperties: { type: 'integer', minimum: 0 },
        required: { type: 'array', items: { type: 'string' } },
        enum: { type: 'array' },
        type: {
            enum: ['object', 'array', 'string', 'number', 'integer', 'boolean', 'null'],
        },
        allOf: _1.listOf('Schema'),
        anyOf: _1.listOf('Schema'),
        oneOf: _1.listOf('Schema'),
        not: 'Schema',
        properties: 'SchemaProperties',
        items: (value) => {
            if (Array.isArray(value)) {
                return _1.listOf('Schema');
            }
            else {
                return 'Schema';
            }
        },
        additionalItems: (value) => {
            if (typeof value === 'boolean') {
                return { type: 'boolean' };
            }
            else {
                return 'Schema';
            }
        },
        additionalProperties: (value) => {
            if (typeof value === 'boolean') {
                return { type: 'boolean' };
            }
            else {
                return 'Schema';
            }
        },
        description: { type: 'string' },
        format: { type: 'string' },
        default: null,
        nullable: { type: 'boolean' },
        readOnly: { type: 'boolean' },
        writeOnly: { type: 'boolean' },
        xml: 'Xml',
        example: { isExample: true },
        deprecated: { type: 'boolean' },
        'x-tags': { type: 'array', items: { type: 'string' } },
    },
};
const Xml = {
    properties: {
        name: { type: 'string' },
        namespace: { type: 'string' },
        prefix: { type: 'string' },
        attribute: { type: 'boolean' },
        wrapped: { type: 'boolean' },
    },
};
const SchemaProperties = {
    properties: {},
    additionalProperties: 'Schema',
};
const DiscriminatorMapping = {
    properties: {},
    additionalProperties: (value) => {
        if (ref_utils_1.isMappingRef(value)) {
            return { type: 'string', directResolveAs: 'Schema' };
        }
        else {
            return { type: 'string' };
        }
    },
};
const Discriminator = {
    properties: {
        propertyName: { type: 'string' },
        mapping: 'DiscriminatorMapping',
    },
    required: ['propertyName'],
};
const Components = {
    properties: {
        parameters: 'NamedParameters',
        schemas: 'NamedSchemas',
        responses: 'NamedResponses',
        examples: 'NamedExamples',
        requestBodies: 'NamedRequestBodies',
        headers: 'NamedHeaders',
        securitySchemes: 'NamedSecuritySchemes',
        links: 'NamedLinks',
        callbacks: 'NamedCallbacks',
    },
};
const ImplicitFlow = {
    properties: {
        refreshUrl: { type: 'string' },
        scopes: { type: 'object', additionalProperties: { type: 'string' } },
        authorizationUrl: { type: 'string' },
    },
    required: ['authorizationUrl', 'scopes'],
};
const PasswordFlow = {
    properties: {
        refreshUrl: { type: 'string' },
        scopes: { type: 'object', additionalProperties: { type: 'string' } },
        tokenUrl: { type: 'string' },
    },
    required: ['tokenUrl', 'scopes'],
};
const ClientCredentials = {
    properties: {
        refreshUrl: { type: 'string' },
        scopes: { type: 'object', additionalProperties: { type: 'string' } },
        tokenUrl: { type: 'string' },
    },
    required: ['tokenUrl', 'scopes'],
};
const AuthorizationCode = {
    properties: {
        refreshUrl: { type: 'string' },
        authorizationUrl: { type: 'string' },
        scopes: { type: 'object', additionalProperties: { type: 'string' } },
        tokenUrl: { type: 'string' },
    },
    required: ['authorizationUrl', 'tokenUrl', 'scopes'],
};
const SecuritySchemeFlows = {
    properties: {
        implicit: 'ImplicitFlow',
        password: 'PasswordFlow',
        clientCredentials: 'ClientCredentials',
        authorizationCode: 'AuthorizationCode',
    },
};
const SecurityScheme = {
    properties: {
        type: { enum: ['apiKey', 'http', 'oauth2', 'openIdConnect'] },
        description: { type: 'string' },
        name: { type: 'string' },
        in: { type: 'string', enum: ['query', 'header', 'cookie'] },
        scheme: { type: 'string' },
        bearerFormat: { type: 'string' },
        flows: 'SecuritySchemeFlows',
        openIdConnectUrl: { type: 'string' },
    },
    required(value) {
        switch (value === null || value === void 0 ? void 0 : value.type) {
            case 'apiKey':
                return ['type', 'name', 'in'];
            case 'http':
                return ['type', 'scheme'];
            case 'oauth2':
                return ['type', 'flows'];
            case 'openIdConnect':
                return ['type', 'openIdConnectUrl'];
            default:
                return ['type'];
        }
    },
    allowed(value) {
        switch (value === null || value === void 0 ? void 0 : value.type) {
            case 'apiKey':
                return ['type', 'name', 'in', 'description'];
            case 'http':
                return ['type', 'scheme', 'bearerFormat', 'description'];
            case 'oauth2':
                return ['type', 'flows', 'description'];
            case 'openIdConnect':
                return ['type', 'openIdConnectUrl', 'description'];
            default:
                return ['type', 'description'];
        }
    },
    extensionsPrefix: 'x-',
};
exports.Oas3Types = {
    DefinitionRoot,
    Tag,
    ExternalDocs,
    Server,
    ServerVariable,
    SecurityRequirement,
    Info,
    Contact,
    License,
    PathMap,
    PathItem,
    Parameter,
    Operation,
    Callback: _1.mapOf('PathItem'),
    RequestBody,
    MediaTypeMap,
    MediaType,
    Example,
    Encoding,
    Header,
    ResponsesMap,
    Response,
    Link,
    Schema,
    Xml,
    SchemaProperties,
    DiscriminatorMapping,
    Discriminator,
    Components,
    NamedSchemas: _1.mapOf('Schema'),
    NamedResponses: _1.mapOf('Response'),
    NamedParameters: _1.mapOf('Parameter'),
    NamedExamples: _1.mapOf('Example'),
    NamedRequestBodies: _1.mapOf('RequestBody'),
    NamedHeaders: _1.mapOf('Header'),
    NamedSecuritySchemes: _1.mapOf('SecurityScheme'),
    NamedLinks: _1.mapOf('Link'),
    NamedCallbacks: _1.mapOf('Callback'),
    ImplicitFlow,
    PasswordFlow,
    ClientCredentials,
    AuthorizationCode,
    SecuritySchemeFlows,
    SecurityScheme,
    XCodeSample,
    WebhooksMap,
};


/***/ }),

/***/ 5450:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getMatchingStatusCodeRange = exports.assignExisting = exports.isNotString = exports.isString = exports.isNotEmptyObject = exports.slash = exports.isPathParameter = exports.readFileAsStringSync = exports.isSingular = exports.validateMimeTypeOAS3 = exports.validateMimeType = exports.splitCamelCaseIntoWords = exports.omitObjectProps = exports.pickObjectProps = exports.readFileFromUrl = exports.isEmptyArray = exports.isEmptyObject = exports.isPlainObject = exports.notUndefined = exports.loadYaml = exports.popStack = exports.pushStack = exports.stringifyYaml = exports.parseYaml = void 0;
const fs = __webpack_require__(5747);
const minimatch = __webpack_require__(3973);
const node_fetch_1 = __webpack_require__(467);
const pluralize = __webpack_require__(9290);
const js_yaml_1 = __webpack_require__(1674);
const config_1 = __webpack_require__(6938);
var js_yaml_2 = __webpack_require__(1674);
Object.defineProperty(exports, "parseYaml", ({ enumerable: true, get: function () { return js_yaml_2.parseYaml; } }));
Object.defineProperty(exports, "stringifyYaml", ({ enumerable: true, get: function () { return js_yaml_2.stringifyYaml; } }));
function pushStack(head, value) {
    return { prev: head, value };
}
exports.pushStack = pushStack;
function popStack(head) {
    var _a;
    return (_a = head === null || head === void 0 ? void 0 : head.prev) !== null && _a !== void 0 ? _a : null;
}
exports.popStack = popStack;
function loadYaml(filename) {
    return __awaiter(this, void 0, void 0, function* () {
        const contents = yield fs.promises.readFile(filename, 'utf-8');
        return js_yaml_1.parseYaml(contents);
    });
}
exports.loadYaml = loadYaml;
function notUndefined(x) {
    return x !== undefined;
}
exports.notUndefined = notUndefined;
function isPlainObject(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}
exports.isPlainObject = isPlainObject;
function isEmptyObject(value) {
    return isPlainObject(value) && Object.keys(value).length === 0;
}
exports.isEmptyObject = isEmptyObject;
function isEmptyArray(value) {
    return Array.isArray(value) && value.length === 0;
}
exports.isEmptyArray = isEmptyArray;
function readFileFromUrl(url, config) {
    return __awaiter(this, void 0, void 0, function* () {
        const headers = {};
        for (const header of config.headers) {
            if (match(url, header.matches)) {
                headers[header.name] =
                    header.envVariable !== undefined ? config_1.env[header.envVariable] || '' : header.value;
            }
        }
        const req = yield (config.customFetch || node_fetch_1.default)(url, {
            headers: headers,
        });
        if (!req.ok) {
            throw new Error(`Failed to load ${url}: ${req.status} ${req.statusText}`);
        }
        return { body: yield req.text(), mimeType: req.headers.get('content-type') };
    });
}
exports.readFileFromUrl = readFileFromUrl;
function match(url, pattern) {
    if (!pattern.match(/^https?:\/\//)) {
        // if pattern doesn't specify protocol directly, do not match against it
        url = url.replace(/^https?:\/\//, '');
    }
    return minimatch(url, pattern);
}
function pickObjectProps(object, keys) {
    return Object.fromEntries(keys.filter((key) => key in object).map((key) => [key, object[key]]));
}
exports.pickObjectProps = pickObjectProps;
function omitObjectProps(object, keys) {
    return Object.fromEntries(Object.entries(object).filter(([key]) => !keys.includes(key)));
}
exports.omitObjectProps = omitObjectProps;
function splitCamelCaseIntoWords(str) {
    const camel = str
        .split(/(?:[-._])|([A-Z][a-z]+)/)
        .filter(Boolean)
        .map((item) => item.toLocaleLowerCase());
    const caps = str
        .split(/([A-Z]{2,})/)
        .filter((e) => e && e === e.toUpperCase())
        .map((item) => item.toLocaleLowerCase());
    return new Set([...camel, ...caps]);
}
exports.splitCamelCaseIntoWords = splitCamelCaseIntoWords;
function validateMimeType({ type, value }, { report, location }, allowedValues) {
    const ruleType = type === 'consumes' ? 'request' : 'response';
    if (!allowedValues)
        throw new Error(`Parameter "allowedValues" is not provided for "${ruleType}-mime-type" rule`);
    if (!value[type])
        return;
    for (const mime of value[type]) {
        if (!allowedValues.includes(mime)) {
            report({
                message: `Mime type "${mime}" is not allowed`,
                location: location.child(value[type].indexOf(mime)).key(),
            });
        }
    }
}
exports.validateMimeType = validateMimeType;
function validateMimeTypeOAS3({ type, value }, { report, location }, allowedValues) {
    const ruleType = type === 'consumes' ? 'request' : 'response';
    if (!allowedValues)
        throw new Error(`Parameter "allowedValues" is not provided for "${ruleType}-mime-type" rule`);
    if (!value.content)
        return;
    for (const mime of Object.keys(value.content)) {
        if (!allowedValues.includes(mime)) {
            report({
                message: `Mime type "${mime}" is not allowed`,
                location: location.child('content').child(mime).key(),
            });
        }
    }
}
exports.validateMimeTypeOAS3 = validateMimeTypeOAS3;
function isSingular(path) {
    return pluralize.isSingular(path);
}
exports.isSingular = isSingular;
function readFileAsStringSync(filePath) {
    return fs.readFileSync(filePath, 'utf-8');
}
exports.readFileAsStringSync = readFileAsStringSync;
function isPathParameter(pathSegment) {
    return pathSegment.startsWith('{') && pathSegment.endsWith('}');
}
exports.isPathParameter = isPathParameter;
/**
 * Convert Windows backslash paths to slash paths: foo\\bar ➔ foo/bar
 */
function slash(path) {
    const isExtendedLengthPath = /^\\\\\?\\/.test(path);
    if (isExtendedLengthPath) {
        return path;
    }
    return path.replace(/\\/g, '/');
}
exports.slash = slash;
function isNotEmptyObject(obj) {
    return !!obj && Object.keys(obj).length > 0;
}
exports.isNotEmptyObject = isNotEmptyObject;
// TODO: use it everywhere
function isString(value) {
    return typeof value === 'string';
}
exports.isString = isString;
function isNotString(value) {
    return !isString(value);
}
exports.isNotString = isNotString;
function assignExisting(target, obj) {
    for (let k of Object.keys(obj)) {
        if (target.hasOwnProperty(k)) {
            target[k] = obj[k];
        }
    }
}
exports.assignExisting = assignExisting;
const getMatchingStatusCodeRange = (code) => `${code}`.replace(/^(\d)\d\d$/, (_, firstDigit) => `${firstDigit}XX`);
exports.getMatchingStatusCodeRange = getMatchingStatusCodeRange;


/***/ }),

/***/ 3555:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.normalizeVisitors = void 0;
function normalizeVisitors(visitorsConfig, types) {
    const normalizedVisitors = {};
    normalizedVisitors.any = {
        enter: [],
        leave: [],
    };
    for (const typeName of Object.keys(types)) {
        normalizedVisitors[typeName] = {
            enter: [],
            leave: [],
        };
    }
    normalizedVisitors.ref = {
        enter: [],
        leave: [],
    };
    for (const { ruleId, severity, visitor } of visitorsConfig) {
        normalizeVisitorLevel({ ruleId, severity }, visitor, null);
    }
    for (const v of Object.keys(normalizedVisitors)) {
        normalizedVisitors[v].enter.sort((a, b) => b.depth - a.depth);
        normalizedVisitors[v].leave.sort((a, b) => a.depth - b.depth);
    }
    return normalizedVisitors;
    function addWeakNodes(ruleConf, from, to, parentContext, stack = []) {
        if (stack.includes(from))
            return;
        stack = [...stack, from];
        const possibleChildren = new Set();
        for (let type of Object.values(from.properties)) {
            if (type === to) {
                addWeakFromStack(ruleConf, stack);
                continue;
            }
            if (typeof type === 'object' && type !== null && type.name) {
                possibleChildren.add(type);
            }
        }
        if (from.additionalProperties && typeof from.additionalProperties !== 'function') {
            if (from.additionalProperties === to) {
                addWeakFromStack(ruleConf, stack);
            }
            else if (from.additionalProperties.name !== undefined) {
                possibleChildren.add(from.additionalProperties);
            }
        }
        if (from.items) {
            if (from.items === to) {
                addWeakFromStack(ruleConf, stack);
            }
            else if (from.items.name !== undefined) {
                possibleChildren.add(from.items);
            }
        }
        for (let fromType of Array.from(possibleChildren.values())) {
            addWeakNodes(ruleConf, fromType, to, parentContext, stack);
        }
        function addWeakFromStack(ruleConf, stack) {
            for (const interType of stack.slice(1)) {
                normalizedVisitors[interType.name] =
                    normalizedVisitors[interType.name] ||
                        {
                            enter: [],
                            leave: [],
                        };
                normalizedVisitors[interType.name].enter.push(Object.assign(Object.assign({}, ruleConf), { visit: () => undefined, depth: 0, context: {
                        isSkippedLevel: true,
                        seen: new Set(),
                        parent: parentContext,
                    } }));
            }
        }
    }
    function normalizeVisitorLevel(ruleConf, visitor, parentContext, depth = 0) {
        const visitorKeys = Object.keys(types);
        if (depth === 0) {
            visitorKeys.push('any');
            visitorKeys.push('ref');
        }
        else {
            if (visitor.any) {
                throw new Error('any() is allowed only on top level');
            }
            if (visitor.ref) {
                throw new Error('ref() is allowed only on top level');
            }
        }
        for (const typeName of visitorKeys) {
            const typeVisitor = visitor[typeName];
            const normalizedTypeVisitor = normalizedVisitors[typeName];
            if (!typeVisitor)
                continue;
            let visitorEnter;
            let visitorLeave;
            let visitorSkip;
            const isObjectVisitor = typeof typeVisitor === 'object';
            if (typeName === 'ref' && isObjectVisitor && typeVisitor.skip) {
                throw new Error('ref() visitor does not support skip');
            }
            if (typeof typeVisitor === 'function') {
                visitorEnter = typeVisitor;
            }
            else if (isObjectVisitor) {
                visitorEnter = typeVisitor.enter;
                visitorLeave = typeVisitor.leave;
                visitorSkip = typeVisitor.skip;
            }
            const context = {
                activatedOn: null,
                type: types[typeName],
                parent: parentContext,
                isSkippedLevel: false,
            };
            if (typeof typeVisitor === 'object') {
                normalizeVisitorLevel(ruleConf, typeVisitor, context, depth + 1);
            }
            if (parentContext) {
                addWeakNodes(ruleConf, parentContext.type, types[typeName], parentContext);
            }
            if (visitorEnter || isObjectVisitor) {
                if (visitorEnter && typeof visitorEnter !== 'function') {
                    throw new Error('DEV: should be function');
                }
                normalizedTypeVisitor.enter.push(Object.assign(Object.assign({}, ruleConf), { visit: visitorEnter || (() => undefined), skip: visitorSkip, depth,
                    context }));
            }
            if (visitorLeave) {
                if (typeof visitorLeave !== 'function') {
                    throw new Error('DEV: should be function');
                }
                normalizedTypeVisitor.leave.push(Object.assign(Object.assign({}, ruleConf), { visit: visitorLeave, depth,
                    context }));
            }
        }
    }
}
exports.normalizeVisitors = normalizeVisitors;


/***/ }),

/***/ 7523:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.walkDocument = void 0;
const ref_utils_1 = __webpack_require__(7977);
const resolve_1 = __webpack_require__(7098);
const utils_1 = __webpack_require__(5450);
const types_1 = __webpack_require__(4143);
function collectParents(ctx) {
    var _a;
    const parents = {};
    while (ctx.parent) {
        parents[ctx.parent.type.name] = (_a = ctx.parent.activatedOn) === null || _a === void 0 ? void 0 : _a.value.node;
        ctx = ctx.parent;
    }
    return parents;
}
function collectParentsLocations(ctx) {
    var _a, _b;
    const locations = {};
    while (ctx.parent) {
        if ((_a = ctx.parent.activatedOn) === null || _a === void 0 ? void 0 : _a.value.location) {
            locations[ctx.parent.type.name] = (_b = ctx.parent.activatedOn) === null || _b === void 0 ? void 0 : _b.value.location;
        }
        ctx = ctx.parent;
    }
    return locations;
}
function walkDocument(opts) {
    const { document, rootType, normalizedVisitors, resolvedRefMap, ctx } = opts;
    const seenNodesPerType = {};
    const seenRefs = new Set();
    walkNode(document.parsed, rootType, new ref_utils_1.Location(document.source, '#/'), undefined, '');
    function walkNode(node, type, location, parent, key) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        let currentLocation = location;
        const { node: resolvedNode, location: resolvedLocation, error } = resolve(node);
        const enteredContexts = new Set();
        if (ref_utils_1.isRef(node)) {
            const refEnterVisitors = normalizedVisitors.ref.enter;
            for (const { visit: visitor, ruleId, severity, context } of refEnterVisitors) {
                if (!seenRefs.has(node)) {
                    enteredContexts.add(context);
                    const report = reportFn.bind(undefined, ruleId, severity);
                    visitor(node, {
                        report,
                        resolve,
                        location,
                        type,
                        parent,
                        key,
                        parentLocations: {},
                        oasVersion: ctx.oasVersion,
                        getVisitorData: getVisitorDataFn.bind(undefined, ruleId)
                    }, { node: resolvedNode, location: resolvedLocation, error });
                    if ((resolvedLocation === null || resolvedLocation === void 0 ? void 0 : resolvedLocation.source.absoluteRef) && ctx.refTypes) {
                        ctx.refTypes.set(resolvedLocation === null || resolvedLocation === void 0 ? void 0 : resolvedLocation.source.absoluteRef, type);
                    }
                }
            }
        }
        if (resolvedNode !== undefined && resolvedLocation && type.name !== 'scalar') {
            currentLocation = resolvedLocation;
            const isNodeSeen = (_b = (_a = seenNodesPerType[type.name]) === null || _a === void 0 ? void 0 : _a.has) === null || _b === void 0 ? void 0 : _b.call(_a, resolvedNode);
            let visitedBySome = false;
            const anyEnterVisitors = normalizedVisitors.any.enter;
            const currentEnterVisitors = anyEnterVisitors.concat(((_c = normalizedVisitors[type.name]) === null || _c === void 0 ? void 0 : _c.enter) || []);
            const activatedContexts = [];
            for (const { context, visit, skip, ruleId, severity } of currentEnterVisitors) {
                if (context.isSkippedLevel) {
                    if (context.parent.activatedOn &&
                        !context.parent.activatedOn.value.nextLevelTypeActivated &&
                        !context.seen.has(node)) {
                        // TODO: test for walk through duplicated $ref-ed node
                        context.seen.add(node);
                        visitedBySome = true;
                        activatedContexts.push(context);
                    }
                }
                else {
                    if ((context.parent && // if nested
                        context.parent.activatedOn &&
                        ((_d = context.activatedOn) === null || _d === void 0 ? void 0 : _d.value.withParentNode) !== context.parent.activatedOn.value.node &&
                        // do not enter if visited by parent children (it works thanks because deeper visitors are sorted before)
                        ((_e = context.parent.activatedOn.value.nextLevelTypeActivated) === null || _e === void 0 ? void 0 : _e.value) !== type) ||
                        (!context.parent && !isNodeSeen) // if top-level visit each node just once
                    ) {
                        activatedContexts.push(context);
                        const activatedOn = {
                            node: resolvedNode,
                            location: resolvedLocation,
                            nextLevelTypeActivated: null,
                            withParentNode: (_g = (_f = context.parent) === null || _f === void 0 ? void 0 : _f.activatedOn) === null || _g === void 0 ? void 0 : _g.value.node,
                            skipped: (_k = (((_j = (_h = context.parent) === null || _h === void 0 ? void 0 : _h.activatedOn) === null || _j === void 0 ? void 0 : _j.value.skipped) || (skip === null || skip === void 0 ? void 0 : skip(resolvedNode, key)))) !== null && _k !== void 0 ? _k : false,
                        };
                        context.activatedOn = utils_1.pushStack(context.activatedOn, activatedOn);
                        let ctx = context.parent;
                        while (ctx) {
                            ctx.activatedOn.value.nextLevelTypeActivated = utils_1.pushStack(ctx.activatedOn.value.nextLevelTypeActivated, type);
                            ctx = ctx.parent;
                        }
                        if (!activatedOn.skipped) {
                            visitedBySome = true;
                            enteredContexts.add(context);
                            const { ignoreNextVisitorsOnNode } = visitWithContext(visit, resolvedNode, context, ruleId, severity);
                            if (ignoreNextVisitorsOnNode)
                                break;
                        }
                    }
                }
            }
            if (visitedBySome || !isNodeSeen) {
                seenNodesPerType[type.name] = seenNodesPerType[type.name] || new Set();
                seenNodesPerType[type.name].add(resolvedNode);
                if (Array.isArray(resolvedNode)) {
                    const itemsType = type.items;
                    if (itemsType !== undefined) {
                        for (let i = 0; i < resolvedNode.length; i++) {
                            walkNode(resolvedNode[i], itemsType, resolvedLocation.child([i]), resolvedNode, i);
                        }
                    }
                }
                else if (typeof resolvedNode === 'object' && resolvedNode !== null) {
                    // visit in order from type-tree first
                    const props = Object.keys(type.properties);
                    if (type.additionalProperties) {
                        props.push(...Object.keys(resolvedNode).filter((k) => !props.includes(k)));
                    }
                    if (ref_utils_1.isRef(node)) {
                        props.push(...Object.keys(node).filter((k) => k !== '$ref' && !props.includes(k))); // properties on the same level as $ref
                    }
                    for (const propName of props) {
                        let value = resolvedNode[propName];
                        let loc = resolvedLocation;
                        if (value === undefined) {
                            value = node[propName];
                            loc = location; // properties on the same level as $ref should resolve against original location, not target
                        }
                        let propType = type.properties[propName];
                        if (propType === undefined)
                            propType = type.additionalProperties;
                        if (typeof propType === 'function')
                            propType = propType(value, propName);
                        if (!types_1.isNamedType(propType) && (propType === null || propType === void 0 ? void 0 : propType.directResolveAs)) {
                            propType = propType.directResolveAs;
                            value = { $ref: value };
                        }
                        if (propType && propType.name === undefined && propType.resolvable !== false) {
                            propType = { name: 'scalar', properties: {} };
                        }
                        if (!types_1.isNamedType(propType) || (propType.name === 'scalar' && !ref_utils_1.isRef(value))) {
                            continue;
                        }
                        walkNode(value, propType, loc.child([propName]), resolvedNode, propName);
                    }
                }
            }
            const anyLeaveVisitors = normalizedVisitors.any.leave;
            const currentLeaveVisitors = (((_l = normalizedVisitors[type.name]) === null || _l === void 0 ? void 0 : _l.leave) || []).concat(anyLeaveVisitors);
            for (const context of activatedContexts.reverse()) {
                if (context.isSkippedLevel) {
                    context.seen.delete(resolvedNode);
                }
                else {
                    context.activatedOn = utils_1.popStack(context.activatedOn);
                    if (context.parent) {
                        let ctx = context.parent;
                        while (ctx) {
                            ctx.activatedOn.value.nextLevelTypeActivated = utils_1.popStack(ctx.activatedOn.value.nextLevelTypeActivated);
                            ctx = ctx.parent;
                        }
                    }
                }
            }
            for (const { context, visit, ruleId, severity } of currentLeaveVisitors) {
                if (!context.isSkippedLevel && enteredContexts.has(context)) {
                    visitWithContext(visit, resolvedNode, context, ruleId, severity);
                }
            }
        }
        currentLocation = location;
        if (ref_utils_1.isRef(node)) {
            const refLeaveVisitors = normalizedVisitors.ref.leave;
            for (const { visit: visitor, ruleId, severity, context } of refLeaveVisitors) {
                if (enteredContexts.has(context)) {
                    const report = reportFn.bind(undefined, ruleId, severity);
                    visitor(node, {
                        report,
                        resolve,
                        location,
                        type,
                        parent,
                        key,
                        parentLocations: {},
                        oasVersion: ctx.oasVersion,
                        getVisitorData: getVisitorDataFn.bind(undefined, ruleId)
                    }, { node: resolvedNode, location: resolvedLocation, error });
                }
            }
        }
        // returns true ignores all the next visitors on the specific node
        function visitWithContext(visit, node, context, ruleId, severity) {
            const report = reportFn.bind(undefined, ruleId, severity);
            let ignoreNextVisitorsOnNode = false;
            visit(node, {
                report,
                resolve,
                location: currentLocation,
                type,
                parent,
                key,
                parentLocations: collectParentsLocations(context),
                oasVersion: ctx.oasVersion,
                ignoreNextVisitorsOnNode: () => { ignoreNextVisitorsOnNode = true; },
                getVisitorData: getVisitorDataFn.bind(undefined, ruleId),
            }, collectParents(context), context);
            return { ignoreNextVisitorsOnNode };
        }
        function resolve(ref, from = currentLocation.source.absoluteRef) {
            if (!ref_utils_1.isRef(ref))
                return { location, node: ref };
            const refId = resolve_1.makeRefId(from, ref.$ref);
            const resolvedRef = resolvedRefMap.get(refId);
            if (!resolvedRef) {
                return {
                    location: undefined,
                    node: undefined,
                };
            }
            const { resolved, node, document, nodePointer, error } = resolvedRef;
            const newLocation = resolved
                ? new ref_utils_1.Location(document.source, nodePointer)
                : error instanceof resolve_1.YamlParseError
                    ? new ref_utils_1.Location(error.source, '')
                    : undefined;
            return { location: newLocation, node, error };
        }
        function reportFn(ruleId, severity, opts) {
            const loc = opts.location
                ? Array.isArray(opts.location)
                    ? opts.location
                    : [opts.location]
                : [Object.assign(Object.assign({}, currentLocation), { reportOnKey: false })];
            ctx.problems.push(Object.assign(Object.assign({ ruleId: opts.ruleId || ruleId, severity: opts.forceSeverity || severity }, opts), { suggest: opts.suggest || [], location: loc.map((loc) => {
                    return Object.assign(Object.assign(Object.assign({}, currentLocation), { reportOnKey: false }), loc);
                }) }));
        }
        function getVisitorDataFn(ruleId) {
            ctx.visitorsData[ruleId] = ctx.visitorsData[ruleId] || {};
            return ctx.visitorsData[ruleId];
        }
    }
}
exports.walkDocument = walkDocument;


/***/ }),

/***/ 9417:
/***/ ((module) => {

"use strict";

module.exports = balanced;
function balanced(a, b, str) {
  if (a instanceof RegExp) a = maybeMatch(a, str);
  if (b instanceof RegExp) b = maybeMatch(b, str);

  var r = range(a, b, str);

  return r && {
    start: r[0],
    end: r[1],
    pre: str.slice(0, r[0]),
    body: str.slice(r[0] + a.length, r[1]),
    post: str.slice(r[1] + b.length)
  };
}

function maybeMatch(reg, str) {
  var m = str.match(reg);
  return m ? m[0] : null;
}

balanced.range = range;
function range(a, b, str) {
  var begs, beg, left, right, result;
  var ai = str.indexOf(a);
  var bi = str.indexOf(b, ai + 1);
  var i = ai;

  if (ai >= 0 && bi > 0) {
    begs = [];
    left = str.length;

    while (i >= 0 && !result) {
      if (i == ai) {
        begs.push(i);
        ai = str.indexOf(a, i + 1);
      } else if (begs.length == 1) {
        result = [ begs.pop(), bi ];
      } else {
        beg = begs.pop();
        if (beg < left) {
          left = beg;
          right = bi;
        }

        bi = str.indexOf(b, i + 1);
      }

      i = ai < bi && ai >= 0 ? ai : bi;
    }

    if (begs.length) {
      result = [ left, right ];
    }
  }

  return result;
}


/***/ }),

/***/ 3717:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var concatMap = __webpack_require__(6891);
var balanced = __webpack_require__(9417);

module.exports = expandTop;

var escSlash = '\0SLASH'+Math.random()+'\0';
var escOpen = '\0OPEN'+Math.random()+'\0';
var escClose = '\0CLOSE'+Math.random()+'\0';
var escComma = '\0COMMA'+Math.random()+'\0';
var escPeriod = '\0PERIOD'+Math.random()+'\0';

function numeric(str) {
  return parseInt(str, 10) == str
    ? parseInt(str, 10)
    : str.charCodeAt(0);
}

function escapeBraces(str) {
  return str.split('\\\\').join(escSlash)
            .split('\\{').join(escOpen)
            .split('\\}').join(escClose)
            .split('\\,').join(escComma)
            .split('\\.').join(escPeriod);
}

function unescapeBraces(str) {
  return str.split(escSlash).join('\\')
            .split(escOpen).join('{')
            .split(escClose).join('}')
            .split(escComma).join(',')
            .split(escPeriod).join('.');
}


// Basically just str.split(","), but handling cases
// where we have nested braced sections, which should be
// treated as individual members, like {a,{b,c},d}
function parseCommaParts(str) {
  if (!str)
    return [''];

  var parts = [];
  var m = balanced('{', '}', str);

  if (!m)
    return str.split(',');

  var pre = m.pre;
  var body = m.body;
  var post = m.post;
  var p = pre.split(',');

  p[p.length-1] += '{' + body + '}';
  var postParts = parseCommaParts(post);
  if (post.length) {
    p[p.length-1] += postParts.shift();
    p.push.apply(p, postParts);
  }

  parts.push.apply(parts, p);

  return parts;
}

function expandTop(str) {
  if (!str)
    return [];

  // I don't know why Bash 4.3 does this, but it does.
  // Anything starting with {} will have the first two bytes preserved
  // but *only* at the top level, so {},a}b will not expand to anything,
  // but a{},b}c will be expanded to [a}c,abc].
  // One could argue that this is a bug in Bash, but since the goal of
  // this module is to match Bash's rules, we escape a leading {}
  if (str.substr(0, 2) === '{}') {
    str = '\\{\\}' + str.substr(2);
  }

  return expand(escapeBraces(str), true).map(unescapeBraces);
}

function identity(e) {
  return e;
}

function embrace(str) {
  return '{' + str + '}';
}
function isPadded(el) {
  return /^-?0\d/.test(el);
}

function lte(i, y) {
  return i <= y;
}
function gte(i, y) {
  return i >= y;
}

function expand(str, isTop) {
  var expansions = [];

  var m = balanced('{', '}', str);
  if (!m || /\$$/.test(m.pre)) return [str];

  var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
  var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
  var isSequence = isNumericSequence || isAlphaSequence;
  var isOptions = m.body.indexOf(',') >= 0;
  if (!isSequence && !isOptions) {
    // {a},b}
    if (m.post.match(/,.*\}/)) {
      str = m.pre + '{' + m.body + escClose + m.post;
      return expand(str);
    }
    return [str];
  }

  var n;
  if (isSequence) {
    n = m.body.split(/\.\./);
  } else {
    n = parseCommaParts(m.body);
    if (n.length === 1) {
      // x{{a,b}}y ==> x{a}y x{b}y
      n = expand(n[0], false).map(embrace);
      if (n.length === 1) {
        var post = m.post.length
          ? expand(m.post, false)
          : [''];
        return post.map(function(p) {
          return m.pre + n[0] + p;
        });
      }
    }
  }

  // at this point, n is the parts, and we know it's not a comma set
  // with a single entry.

  // no need to expand pre, since it is guaranteed to be free of brace-sets
  var pre = m.pre;
  var post = m.post.length
    ? expand(m.post, false)
    : [''];

  var N;

  if (isSequence) {
    var x = numeric(n[0]);
    var y = numeric(n[1]);
    var width = Math.max(n[0].length, n[1].length)
    var incr = n.length == 3
      ? Math.abs(numeric(n[2]))
      : 1;
    var test = lte;
    var reverse = y < x;
    if (reverse) {
      incr *= -1;
      test = gte;
    }
    var pad = n.some(isPadded);

    N = [];

    for (var i = x; test(i, y); i += incr) {
      var c;
      if (isAlphaSequence) {
        c = String.fromCharCode(i);
        if (c === '\\')
          c = '';
      } else {
        c = String(i);
        if (pad) {
          var need = width - c.length;
          if (need > 0) {
            var z = new Array(need + 1).join('0');
            if (i < 0)
              c = '-' + z + c.slice(1);
            else
              c = z + c;
          }
        }
      }
      N.push(c);
    }
  } else {
    N = concatMap(n, function(el) { return expand(el, false) });
  }

  for (var j = 0; j < N.length; j++) {
    for (var k = 0; k < post.length; k++) {
      var expansion = pre + N[j] + post[k];
      if (!isTop || isSequence || expansion)
        expansions.push(expansion);
    }
  }

  return expansions;
}



/***/ }),

/***/ 6891:
/***/ ((module) => {

module.exports = function (xs, fn) {
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        var x = fn(xs[i], i);
        if (isArray(x)) res.push.apply(res, x);
        else res.push(x);
    }
    return res;
};

var isArray = Array.isArray || function (xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),

/***/ 7468:
/***/ ((module) => {

"use strict";

module.exports = (function()
{
  function _min(d0, d1, d2, bx, ay)
  {
    return d0 < d1 || d2 < d1
        ? d0 > d2
            ? d2 + 1
            : d0 + 1
        : bx === ay
            ? d1
            : d1 + 1;
  }

  return function(a, b)
  {
    if (a === b) {
      return 0;
    }

    if (a.length > b.length) {
      var tmp = a;
      a = b;
      b = tmp;
    }

    var la = a.length;
    var lb = b.length;

    while (la > 0 && (a.charCodeAt(la - 1) === b.charCodeAt(lb - 1))) {
      la--;
      lb--;
    }

    var offset = 0;

    while (offset < la && (a.charCodeAt(offset) === b.charCodeAt(offset))) {
      offset++;
    }

    la -= offset;
    lb -= offset;

    if (la === 0 || lb < 3) {
      return lb;
    }

    var x = 0;
    var y;
    var d0;
    var d1;
    var d2;
    var d3;
    var dd;
    var dy;
    var ay;
    var bx0;
    var bx1;
    var bx2;
    var bx3;

    var vector = [];

    for (y = 0; y < la; y++) {
      vector.push(y + 1);
      vector.push(a.charCodeAt(offset + y));
    }

    var len = vector.length - 1;

    for (; x < lb - 3;) {
      bx0 = b.charCodeAt(offset + (d0 = x));
      bx1 = b.charCodeAt(offset + (d1 = x + 1));
      bx2 = b.charCodeAt(offset + (d2 = x + 2));
      bx3 = b.charCodeAt(offset + (d3 = x + 3));
      dd = (x += 4);
      for (y = 0; y < len; y += 2) {
        dy = vector[y];
        ay = vector[y + 1];
        d0 = _min(dy, d0, d1, bx0, ay);
        d1 = _min(d0, d1, d2, bx1, ay);
        d2 = _min(d1, d2, d3, bx2, ay);
        dd = _min(d2, d3, dd, bx3, ay);
        vector[y] = dd;
        d3 = d2;
        d2 = d1;
        d1 = d0;
        d0 = dy;
      }
    }

    for (; x < lb;) {
      bx0 = b.charCodeAt(offset + (d0 = x));
      dd = ++x;
      for (y = 0; y < len; y += 2) {
        dy = vector[y];
        vector[y] = dd = _min(dy, d0, dd, bx0, vector[y + 1]);
        d0 = dy;
      }
    }

    return dd;
  };
})();



/***/ }),

/***/ 8309:
/***/ ((module, exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
/**
 * Lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright JS Foundation and other contributors <https://js.foundation/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    asyncTag = '[object AsyncFunction]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    nullTag = '[object Null]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    proxyTag = '[object Proxy]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    undefinedTag = '[object Undefined]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    Symbol = root.Symbol,
    Uint8Array = root.Uint8Array,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice,
    symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols,
    nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
    nativeKeys = overArg(Object.keys, Object);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView'),
    Map = getNative(root, 'Map'),
    Promise = getNative(root, 'Promise'),
    Set = getNative(root, 'Set'),
    WeakMap = getNative(root, 'WeakMap'),
    nativeCreate = getNative(Object, 'create');

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = objIsArr ? arrayTag : getTag(object),
      othTag = othIsArr ? arrayTag : getTag(other);

  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;

  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */
function isEqual(value, other) {
  return baseIsEqual(value, other);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = isEqual;


/***/ }),

/***/ 254:
/***/ ((module, exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used to compose bitmasks for comparison styles. */
var UNORDERED_COMPARE_FLAG = 1,
    PARTIAL_COMPARE_FLAG = 2;

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/,
    reLeadingDot = /^\./,
    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding('util');
  } catch (e) {}
}());

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * The base implementation of `_.sortBy` which uses `comparer` to define the
 * sort order of `array` and replaces criteria objects with their corresponding
 * values.
 *
 * @private
 * @param {Array} array The array to sort.
 * @param {Function} comparer The function to define sort order.
 * @returns {Array} Returns `array`.
 */
function baseSortBy(array, comparer) {
  var length = array.length;

  array.sort(comparer);
  while (length--) {
    array[length] = array[length].value;
  }
  return array;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Symbol = root.Symbol,
    Uint8Array = root.Uint8Array,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice,
    spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object),
    nativeMax = Math.max;

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView'),
    Map = getNative(root, 'Map'),
    Promise = getNative(root, 'Promise'),
    Set = getNative(root, 'Set'),
    WeakMap = getNative(root, 'WeakMap'),
    nativeCreate = getNative(Object, 'create');

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values ? values.length : 0;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  this.__data__ = new ListCache(entries);
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  return this.__data__['delete'](key);
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var cache = this.__data__;
  if (cache instanceof ListCache) {
    var pairs = cache.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      return this;
    }
    cache = this.__data__ = new MapCache(pairs);
  }
  cache.set(key, value);
  return this;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.forEach` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 */
var baseEach = createBaseEach(baseForOwn);

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return object && baseFor(object, iteratee, keys);
}

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = isKey(path, object) ? [path] : castPath(path);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

/**
 * The base implementation of `getTag`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  return objectToString.call(value);
}

/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {boolean} [bitmask] The bitmask of comparison flags.
 *  The bitmask may be composed of the following flags:
 *     1 - Unordered comparison
 *     2 - Partial comparison
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, customizer, bitmask, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
}

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = arrayTag,
      othTag = arrayTag;

  if (!objIsArr) {
    objTag = getTag(object);
    objTag = objTag == argsTag ? objectTag : objTag;
  }
  if (!othIsArr) {
    othTag = getTag(other);
    othTag = othTag == argsTag ? objectTag : othTag;
  }
  var objIsObj = objTag == objectTag && !isHostObject(object),
      othIsObj = othTag == objectTag && !isHostObject(other),
      isSameTag = objTag == othTag;

  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, equalFunc, customizer, bitmask, stack)
      : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
  }
  if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
}

/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack;
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === undefined
            ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack)
            : result
          )) {
        return false;
      }
    }
  }
  return true;
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
}

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
function baseIteratee(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }
  if (value == null) {
    return identity;
  }
  if (typeof value == 'object') {
    return isArray(value)
      ? baseMatchesProperty(value[0], value[1])
      : baseMatches(value);
  }
  return property(value);
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.map` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function baseMap(collection, iteratee) {
  var index = -1,
      result = isArrayLike(collection) ? Array(collection.length) : [];

  baseEach(collection, function(value, key, collection) {
    result[++index] = iteratee(value, key, collection);
  });
  return result;
}

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatches(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || baseIsMatch(object, source, matchData);
  };
}

/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatchesProperty(path, srcValue) {
  if (isKey(path) && isStrictComparable(srcValue)) {
    return matchesStrictComparable(toKey(path), srcValue);
  }
  return function(object) {
    var objValue = get(object, path);
    return (objValue === undefined && objValue === srcValue)
      ? hasIn(object, path)
      : baseIsEqual(srcValue, objValue, undefined, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG);
  };
}

/**
 * The base implementation of `_.orderBy` without param guards.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
 * @param {string[]} orders The sort orders of `iteratees`.
 * @returns {Array} Returns the new sorted array.
 */
function baseOrderBy(collection, iteratees, orders) {
  var index = -1;
  iteratees = arrayMap(iteratees.length ? iteratees : [identity], baseUnary(baseIteratee));

  var result = baseMap(collection, function(value, key, collection) {
    var criteria = arrayMap(iteratees, function(iteratee) {
      return iteratee(value);
    });
    return { 'criteria': criteria, 'index': ++index, 'value': value };
  });

  return baseSortBy(result, function(object, other) {
    return compareMultiple(object, other, orders);
  });
}

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyDeep(path) {
  return function(object) {
    return baseGet(object, path);
  };
}

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = array;
    return apply(func, this, otherArgs);
  };
}

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value) {
  return isArray(value) ? value : stringToPath(value);
}

/**
 * Compares values to sort them in ascending order.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {number} Returns the sort order indicator for `value`.
 */
function compareAscending(value, other) {
  if (value !== other) {
    var valIsDefined = value !== undefined,
        valIsNull = value === null,
        valIsReflexive = value === value,
        valIsSymbol = isSymbol(value);

    var othIsDefined = other !== undefined,
        othIsNull = other === null,
        othIsReflexive = other === other,
        othIsSymbol = isSymbol(other);

    if ((!othIsNull && !othIsSymbol && !valIsSymbol && value > other) ||
        (valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol) ||
        (valIsNull && othIsDefined && othIsReflexive) ||
        (!valIsDefined && othIsReflexive) ||
        !valIsReflexive) {
      return 1;
    }
    if ((!valIsNull && !valIsSymbol && !othIsSymbol && value < other) ||
        (othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol) ||
        (othIsNull && valIsDefined && valIsReflexive) ||
        (!othIsDefined && valIsReflexive) ||
        !othIsReflexive) {
      return -1;
    }
  }
  return 0;
}

/**
 * Used by `_.orderBy` to compare multiple properties of a value to another
 * and stable sort them.
 *
 * If `orders` is unspecified, all values are sorted in ascending order. Otherwise,
 * specify an order of "desc" for descending or "asc" for ascending sort order
 * of corresponding values.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {boolean[]|string[]} orders The order to sort by for each property.
 * @returns {number} Returns the sort order indicator for `object`.
 */
function compareMultiple(object, other, orders) {
  var index = -1,
      objCriteria = object.criteria,
      othCriteria = other.criteria,
      length = objCriteria.length,
      ordersLength = orders.length;

  while (++index < length) {
    var result = compareAscending(objCriteria[index], othCriteria[index]);
    if (result) {
      if (index >= ordersLength) {
        return result;
      }
      var order = orders[index];
      return result * (order == 'desc' ? -1 : 1);
    }
  }
  // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
  // that causes it, under certain circumstances, to provide the same value for
  // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
  // for more details.
  //
  // This also ensures a stable sort in V8 and other engines.
  // See https://bugs.chromium.org/p/v8/issues/detail?id=90 for more details.
  return object.index - other.index;
}

/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike(collection)) {
      return eachFunc(collection, iteratee);
    }
    var length = collection.length,
        index = fromRight ? length : -1,
        iterable = Object(collection);

    while ((fromRight ? index-- : ++index < length)) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & UNORDERED_COMPARE_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!seen.has(othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
              return seen.add(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, customizer, bitmask, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= UNORDERED_COMPARE_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
      objProps = keys(object),
      objLength = objProps.length,
      othProps = keys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
  var result = keys(object),
      length = result.length;

  while (length--) {
    var key = result[length],
        value = object[key];

    result[length] = [key, value, isStrictComparable(value)];
  }
  return result;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11,
// for data views in Edge < 14, and promises in Node.js.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = objectToString.call(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : undefined;

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  path = isKey(path, object) ? [path] : castPath(path);

  var result,
      index = -1,
      length = path.length;

  while (++index < length) {
    var key = toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result) {
    return result;
  }
  var length = object ? object.length : 0;
  return !!length && isLength(length) && isIndex(key, length) &&
    (isArray(object) || isArguments(object));
}

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return isArray(value) || isArguments(value) ||
    !!(spreadableSymbol && value && value[spreadableSymbol]);
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && !isObject(value);
}

/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function matchesStrictComparable(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue &&
      (srcValue !== undefined || (key in Object(object)));
  };
}

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoize(function(string) {
  string = toString(string);

  var result = [];
  if (reLeadingDot.test(string)) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Creates an array of elements, sorted in ascending order by the results of
 * running each element in a collection thru each iteratee. This method
 * performs a stable sort, that is, it preserves the original sort order of
 * equal elements. The iteratees are invoked with one argument: (value).
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {...(Function|Function[])} [iteratees=[_.identity]]
 *  The iteratees to sort by.
 * @returns {Array} Returns the new sorted array.
 * @example
 *
 * var users = [
 *   { 'user': 'fred',   'age': 48 },
 *   { 'user': 'barney', 'age': 36 },
 *   { 'user': 'fred',   'age': 40 },
 *   { 'user': 'barney', 'age': 34 }
 * ];
 *
 * _.sortBy(users, function(o) { return o.user; });
 * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
 *
 * _.sortBy(users, ['user', 'age']);
 * // => objects for [['barney', 34], ['barney', 36], ['fred', 40], ['fred', 48]]
 *
 * _.sortBy(users, 'user', function(o) {
 *   return Math.floor(o.age / 10);
 * });
 * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
 */
var sortBy = baseRest(function(collection, iteratees) {
  if (collection == null) {
    return [];
  }
  var length = iteratees.length;
  if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
    iteratees = [];
  } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
    iteratees = [iteratees[0]];
  }
  return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
});

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result);
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Assign cache to `_.memoize`.
memoize.Cache = MapCache;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */
function property(path) {
  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}

module.exports = sortBy;


/***/ }),

/***/ 3973:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = minimatch
minimatch.Minimatch = Minimatch

var path = { sep: '/' }
try {
  path = __webpack_require__(5622)
} catch (er) {}

var GLOBSTAR = minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {}
var expand = __webpack_require__(3717)

var plTypes = {
  '!': { open: '(?:(?!(?:', close: '))[^/]*?)'},
  '?': { open: '(?:', close: ')?' },
  '+': { open: '(?:', close: ')+' },
  '*': { open: '(?:', close: ')*' },
  '@': { open: '(?:', close: ')' }
}

// any single thing other than /
// don't need to escape / when using new RegExp()
var qmark = '[^/]'

// * => any number of characters
var star = qmark + '*?'

// ** when dots are allowed.  Anything goes, except .. and .
// not (^ or / followed by one or two dots followed by $ or /),
// followed by anything, any number of times.
var twoStarDot = '(?:(?!(?:\\\/|^)(?:\\.{1,2})($|\\\/)).)*?'

// not a ^ or / followed by a dot,
// followed by anything, any number of times.
var twoStarNoDot = '(?:(?!(?:\\\/|^)\\.).)*?'

// characters that need to be escaped in RegExp.
var reSpecials = charSet('().*{}+?[]^$\\!')

// "abc" -> { a:true, b:true, c:true }
function charSet (s) {
  return s.split('').reduce(function (set, c) {
    set[c] = true
    return set
  }, {})
}

// normalizes slashes.
var slashSplit = /\/+/

minimatch.filter = filter
function filter (pattern, options) {
  options = options || {}
  return function (p, i, list) {
    return minimatch(p, pattern, options)
  }
}

function ext (a, b) {
  a = a || {}
  b = b || {}
  var t = {}
  Object.keys(b).forEach(function (k) {
    t[k] = b[k]
  })
  Object.keys(a).forEach(function (k) {
    t[k] = a[k]
  })
  return t
}

minimatch.defaults = function (def) {
  if (!def || !Object.keys(def).length) return minimatch

  var orig = minimatch

  var m = function minimatch (p, pattern, options) {
    return orig.minimatch(p, pattern, ext(def, options))
  }

  m.Minimatch = function Minimatch (pattern, options) {
    return new orig.Minimatch(pattern, ext(def, options))
  }

  return m
}

Minimatch.defaults = function (def) {
  if (!def || !Object.keys(def).length) return Minimatch
  return minimatch.defaults(def).Minimatch
}

function minimatch (p, pattern, options) {
  if (typeof pattern !== 'string') {
    throw new TypeError('glob pattern string required')
  }

  if (!options) options = {}

  // shortcut: comments match nothing.
  if (!options.nocomment && pattern.charAt(0) === '#') {
    return false
  }

  // "" only matches ""
  if (pattern.trim() === '') return p === ''

  return new Minimatch(pattern, options).match(p)
}

function Minimatch (pattern, options) {
  if (!(this instanceof Minimatch)) {
    return new Minimatch(pattern, options)
  }

  if (typeof pattern !== 'string') {
    throw new TypeError('glob pattern string required')
  }

  if (!options) options = {}
  pattern = pattern.trim()

  // windows support: need to use /, not \
  if (path.sep !== '/') {
    pattern = pattern.split(path.sep).join('/')
  }

  this.options = options
  this.set = []
  this.pattern = pattern
  this.regexp = null
  this.negate = false
  this.comment = false
  this.empty = false

  // make the set of regexps etc.
  this.make()
}

Minimatch.prototype.debug = function () {}

Minimatch.prototype.make = make
function make () {
  // don't do it more than once.
  if (this._made) return

  var pattern = this.pattern
  var options = this.options

  // empty patterns and comments match nothing.
  if (!options.nocomment && pattern.charAt(0) === '#') {
    this.comment = true
    return
  }
  if (!pattern) {
    this.empty = true
    return
  }

  // step 1: figure out negation, etc.
  this.parseNegate()

  // step 2: expand braces
  var set = this.globSet = this.braceExpand()

  if (options.debug) this.debug = console.error

  this.debug(this.pattern, set)

  // step 3: now we have a set, so turn each one into a series of path-portion
  // matching patterns.
  // These will be regexps, except in the case of "**", which is
  // set to the GLOBSTAR object for globstar behavior,
  // and will not contain any / characters
  set = this.globParts = set.map(function (s) {
    return s.split(slashSplit)
  })

  this.debug(this.pattern, set)

  // glob --> regexps
  set = set.map(function (s, si, set) {
    return s.map(this.parse, this)
  }, this)

  this.debug(this.pattern, set)

  // filter out everything that didn't compile properly.
  set = set.filter(function (s) {
    return s.indexOf(false) === -1
  })

  this.debug(this.pattern, set)

  this.set = set
}

Minimatch.prototype.parseNegate = parseNegate
function parseNegate () {
  var pattern = this.pattern
  var negate = false
  var options = this.options
  var negateOffset = 0

  if (options.nonegate) return

  for (var i = 0, l = pattern.length
    ; i < l && pattern.charAt(i) === '!'
    ; i++) {
    negate = !negate
    negateOffset++
  }

  if (negateOffset) this.pattern = pattern.substr(negateOffset)
  this.negate = negate
}

// Brace expansion:
// a{b,c}d -> abd acd
// a{b,}c -> abc ac
// a{0..3}d -> a0d a1d a2d a3d
// a{b,c{d,e}f}g -> abg acdfg acefg
// a{b,c}d{e,f}g -> abdeg acdeg abdeg abdfg
//
// Invalid sets are not expanded.
// a{2..}b -> a{2..}b
// a{b}c -> a{b}c
minimatch.braceExpand = function (pattern, options) {
  return braceExpand(pattern, options)
}

Minimatch.prototype.braceExpand = braceExpand

function braceExpand (pattern, options) {
  if (!options) {
    if (this instanceof Minimatch) {
      options = this.options
    } else {
      options = {}
    }
  }

  pattern = typeof pattern === 'undefined'
    ? this.pattern : pattern

  if (typeof pattern === 'undefined') {
    throw new TypeError('undefined pattern')
  }

  if (options.nobrace ||
    !pattern.match(/\{.*\}/)) {
    // shortcut. no need to expand.
    return [pattern]
  }

  return expand(pattern)
}

// parse a component of the expanded set.
// At this point, no pattern may contain "/" in it
// so we're going to return a 2d array, where each entry is the full
// pattern, split on '/', and then turned into a regular expression.
// A regexp is made at the end which joins each array with an
// escaped /, and another full one which joins each regexp with |.
//
// Following the lead of Bash 4.1, note that "**" only has special meaning
// when it is the *only* thing in a path portion.  Otherwise, any series
// of * is equivalent to a single *.  Globstar behavior is enabled by
// default, and can be disabled by setting options.noglobstar.
Minimatch.prototype.parse = parse
var SUBPARSE = {}
function parse (pattern, isSub) {
  if (pattern.length > 1024 * 64) {
    throw new TypeError('pattern is too long')
  }

  var options = this.options

  // shortcuts
  if (!options.noglobstar && pattern === '**') return GLOBSTAR
  if (pattern === '') return ''

  var re = ''
  var hasMagic = !!options.nocase
  var escaping = false
  // ? => one single character
  var patternListStack = []
  var negativeLists = []
  var stateChar
  var inClass = false
  var reClassStart = -1
  var classStart = -1
  // . and .. never match anything that doesn't start with .,
  // even when options.dot is set.
  var patternStart = pattern.charAt(0) === '.' ? '' // anything
  // not (start or / followed by . or .. followed by / or end)
  : options.dot ? '(?!(?:^|\\\/)\\.{1,2}(?:$|\\\/))'
  : '(?!\\.)'
  var self = this

  function clearStateChar () {
    if (stateChar) {
      // we had some state-tracking character
      // that wasn't consumed by this pass.
      switch (stateChar) {
        case '*':
          re += star
          hasMagic = true
        break
        case '?':
          re += qmark
          hasMagic = true
        break
        default:
          re += '\\' + stateChar
        break
      }
      self.debug('clearStateChar %j %j', stateChar, re)
      stateChar = false
    }
  }

  for (var i = 0, len = pattern.length, c
    ; (i < len) && (c = pattern.charAt(i))
    ; i++) {
    this.debug('%s\t%s %s %j', pattern, i, re, c)

    // skip over any that are escaped.
    if (escaping && reSpecials[c]) {
      re += '\\' + c
      escaping = false
      continue
    }

    switch (c) {
      case '/':
        // completely not allowed, even escaped.
        // Should already be path-split by now.
        return false

      case '\\':
        clearStateChar()
        escaping = true
      continue

      // the various stateChar values
      // for the "extglob" stuff.
      case '?':
      case '*':
      case '+':
      case '@':
      case '!':
        this.debug('%s\t%s %s %j <-- stateChar', pattern, i, re, c)

        // all of those are literals inside a class, except that
        // the glob [!a] means [^a] in regexp
        if (inClass) {
          this.debug('  in class')
          if (c === '!' && i === classStart + 1) c = '^'
          re += c
          continue
        }

        // if we already have a stateChar, then it means
        // that there was something like ** or +? in there.
        // Handle the stateChar, then proceed with this one.
        self.debug('call clearStateChar %j', stateChar)
        clearStateChar()
        stateChar = c
        // if extglob is disabled, then +(asdf|foo) isn't a thing.
        // just clear the statechar *now*, rather than even diving into
        // the patternList stuff.
        if (options.noext) clearStateChar()
      continue

      case '(':
        if (inClass) {
          re += '('
          continue
        }

        if (!stateChar) {
          re += '\\('
          continue
        }

        patternListStack.push({
          type: stateChar,
          start: i - 1,
          reStart: re.length,
          open: plTypes[stateChar].open,
          close: plTypes[stateChar].close
        })
        // negation is (?:(?!js)[^/]*)
        re += stateChar === '!' ? '(?:(?!(?:' : '(?:'
        this.debug('plType %j %j', stateChar, re)
        stateChar = false
      continue

      case ')':
        if (inClass || !patternListStack.length) {
          re += '\\)'
          continue
        }

        clearStateChar()
        hasMagic = true
        var pl = patternListStack.pop()
        // negation is (?:(?!js)[^/]*)
        // The others are (?:<pattern>)<type>
        re += pl.close
        if (pl.type === '!') {
          negativeLists.push(pl)
        }
        pl.reEnd = re.length
      continue

      case '|':
        if (inClass || !patternListStack.length || escaping) {
          re += '\\|'
          escaping = false
          continue
        }

        clearStateChar()
        re += '|'
      continue

      // these are mostly the same in regexp and glob
      case '[':
        // swallow any state-tracking char before the [
        clearStateChar()

        if (inClass) {
          re += '\\' + c
          continue
        }

        inClass = true
        classStart = i
        reClassStart = re.length
        re += c
      continue

      case ']':
        //  a right bracket shall lose its special
        //  meaning and represent itself in
        //  a bracket expression if it occurs
        //  first in the list.  -- POSIX.2 2.8.3.2
        if (i === classStart + 1 || !inClass) {
          re += '\\' + c
          escaping = false
          continue
        }

        // handle the case where we left a class open.
        // "[z-a]" is valid, equivalent to "\[z-a\]"
        if (inClass) {
          // split where the last [ was, make sure we don't have
          // an invalid re. if so, re-walk the contents of the
          // would-be class to re-translate any characters that
          // were passed through as-is
          // TODO: It would probably be faster to determine this
          // without a try/catch and a new RegExp, but it's tricky
          // to do safely.  For now, this is safe and works.
          var cs = pattern.substring(classStart + 1, i)
          try {
            RegExp('[' + cs + ']')
          } catch (er) {
            // not a valid class!
            var sp = this.parse(cs, SUBPARSE)
            re = re.substr(0, reClassStart) + '\\[' + sp[0] + '\\]'
            hasMagic = hasMagic || sp[1]
            inClass = false
            continue
          }
        }

        // finish up the class.
        hasMagic = true
        inClass = false
        re += c
      continue

      default:
        // swallow any state char that wasn't consumed
        clearStateChar()

        if (escaping) {
          // no need
          escaping = false
        } else if (reSpecials[c]
          && !(c === '^' && inClass)) {
          re += '\\'
        }

        re += c

    } // switch
  } // for

  // handle the case where we left a class open.
  // "[abc" is valid, equivalent to "\[abc"
  if (inClass) {
    // split where the last [ was, and escape it
    // this is a huge pita.  We now have to re-walk
    // the contents of the would-be class to re-translate
    // any characters that were passed through as-is
    cs = pattern.substr(classStart + 1)
    sp = this.parse(cs, SUBPARSE)
    re = re.substr(0, reClassStart) + '\\[' + sp[0]
    hasMagic = hasMagic || sp[1]
  }

  // handle the case where we had a +( thing at the *end*
  // of the pattern.
  // each pattern list stack adds 3 chars, and we need to go through
  // and escape any | chars that were passed through as-is for the regexp.
  // Go through and escape them, taking care not to double-escape any
  // | chars that were already escaped.
  for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
    var tail = re.slice(pl.reStart + pl.open.length)
    this.debug('setting tail', re, pl)
    // maybe some even number of \, then maybe 1 \, followed by a |
    tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, function (_, $1, $2) {
      if (!$2) {
        // the | isn't already escaped, so escape it.
        $2 = '\\'
      }

      // need to escape all those slashes *again*, without escaping the
      // one that we need for escaping the | character.  As it works out,
      // escaping an even number of slashes can be done by simply repeating
      // it exactly after itself.  That's why this trick works.
      //
      // I am sorry that you have to see this.
      return $1 + $1 + $2 + '|'
    })

    this.debug('tail=%j\n   %s', tail, tail, pl, re)
    var t = pl.type === '*' ? star
      : pl.type === '?' ? qmark
      : '\\' + pl.type

    hasMagic = true
    re = re.slice(0, pl.reStart) + t + '\\(' + tail
  }

  // handle trailing things that only matter at the very end.
  clearStateChar()
  if (escaping) {
    // trailing \\
    re += '\\\\'
  }

  // only need to apply the nodot start if the re starts with
  // something that could conceivably capture a dot
  var addPatternStart = false
  switch (re.charAt(0)) {
    case '.':
    case '[':
    case '(': addPatternStart = true
  }

  // Hack to work around lack of negative lookbehind in JS
  // A pattern like: *.!(x).!(y|z) needs to ensure that a name
  // like 'a.xyz.yz' doesn't match.  So, the first negative
  // lookahead, has to look ALL the way ahead, to the end of
  // the pattern.
  for (var n = negativeLists.length - 1; n > -1; n--) {
    var nl = negativeLists[n]

    var nlBefore = re.slice(0, nl.reStart)
    var nlFirst = re.slice(nl.reStart, nl.reEnd - 8)
    var nlLast = re.slice(nl.reEnd - 8, nl.reEnd)
    var nlAfter = re.slice(nl.reEnd)

    nlLast += nlAfter

    // Handle nested stuff like *(*.js|!(*.json)), where open parens
    // mean that we should *not* include the ) in the bit that is considered
    // "after" the negated section.
    var openParensBefore = nlBefore.split('(').length - 1
    var cleanAfter = nlAfter
    for (i = 0; i < openParensBefore; i++) {
      cleanAfter = cleanAfter.replace(/\)[+*?]?/, '')
    }
    nlAfter = cleanAfter

    var dollar = ''
    if (nlAfter === '' && isSub !== SUBPARSE) {
      dollar = '$'
    }
    var newRe = nlBefore + nlFirst + nlAfter + dollar + nlLast
    re = newRe
  }

  // if the re is not "" at this point, then we need to make sure
  // it doesn't match against an empty path part.
  // Otherwise a/* will match a/, which it should not.
  if (re !== '' && hasMagic) {
    re = '(?=.)' + re
  }

  if (addPatternStart) {
    re = patternStart + re
  }

  // parsing just a piece of a larger pattern.
  if (isSub === SUBPARSE) {
    return [re, hasMagic]
  }

  // skip the regexp for non-magical patterns
  // unescape anything in it, though, so that it'll be
  // an exact match against a file etc.
  if (!hasMagic) {
    return globUnescape(pattern)
  }

  var flags = options.nocase ? 'i' : ''
  try {
    var regExp = new RegExp('^' + re + '$', flags)
  } catch (er) {
    // If it was an invalid regular expression, then it can't match
    // anything.  This trick looks for a character after the end of
    // the string, which is of course impossible, except in multi-line
    // mode, but it's not a /m regex.
    return new RegExp('$.')
  }

  regExp._glob = pattern
  regExp._src = re

  return regExp
}

minimatch.makeRe = function (pattern, options) {
  return new Minimatch(pattern, options || {}).makeRe()
}

Minimatch.prototype.makeRe = makeRe
function makeRe () {
  if (this.regexp || this.regexp === false) return this.regexp

  // at this point, this.set is a 2d array of partial
  // pattern strings, or "**".
  //
  // It's better to use .match().  This function shouldn't
  // be used, really, but it's pretty convenient sometimes,
  // when you just want to work with a regex.
  var set = this.set

  if (!set.length) {
    this.regexp = false
    return this.regexp
  }
  var options = this.options

  var twoStar = options.noglobstar ? star
    : options.dot ? twoStarDot
    : twoStarNoDot
  var flags = options.nocase ? 'i' : ''

  var re = set.map(function (pattern) {
    return pattern.map(function (p) {
      return (p === GLOBSTAR) ? twoStar
      : (typeof p === 'string') ? regExpEscape(p)
      : p._src
    }).join('\\\/')
  }).join('|')

  // must match entire pattern
  // ending in a * or ** will make it less strict.
  re = '^(?:' + re + ')$'

  // can match anything, as long as it's not this.
  if (this.negate) re = '^(?!' + re + ').*$'

  try {
    this.regexp = new RegExp(re, flags)
  } catch (ex) {
    this.regexp = false
  }
  return this.regexp
}

minimatch.match = function (list, pattern, options) {
  options = options || {}
  var mm = new Minimatch(pattern, options)
  list = list.filter(function (f) {
    return mm.match(f)
  })
  if (mm.options.nonull && !list.length) {
    list.push(pattern)
  }
  return list
}

Minimatch.prototype.match = match
function match (f, partial) {
  this.debug('match', f, this.pattern)
  // short-circuit in the case of busted things.
  // comments, etc.
  if (this.comment) return false
  if (this.empty) return f === ''

  if (f === '/' && partial) return true

  var options = this.options

  // windows: need to use /, not \
  if (path.sep !== '/') {
    f = f.split(path.sep).join('/')
  }

  // treat the test path as a set of pathparts.
  f = f.split(slashSplit)
  this.debug(this.pattern, 'split', f)

  // just ONE of the pattern sets in this.set needs to match
  // in order for it to be valid.  If negating, then just one
  // match means that we have failed.
  // Either way, return on the first hit.

  var set = this.set
  this.debug(this.pattern, 'set', set)

  // Find the basename of the path by looking for the last non-empty segment
  var filename
  var i
  for (i = f.length - 1; i >= 0; i--) {
    filename = f[i]
    if (filename) break
  }

  for (i = 0; i < set.length; i++) {
    var pattern = set[i]
    var file = f
    if (options.matchBase && pattern.length === 1) {
      file = [filename]
    }
    var hit = this.matchOne(file, pattern, partial)
    if (hit) {
      if (options.flipNegate) return true
      return !this.negate
    }
  }

  // didn't get any hits.  this is success if it's a negative
  // pattern, failure otherwise.
  if (options.flipNegate) return false
  return this.negate
}

// set partial to true to test if, for example,
// "/a/b" matches the start of "/*/b/*/d"
// Partial means, if you run out of file before you run
// out of pattern, then that's fine, as long as all
// the parts match.
Minimatch.prototype.matchOne = function (file, pattern, partial) {
  var options = this.options

  this.debug('matchOne',
    { 'this': this, file: file, pattern: pattern })

  this.debug('matchOne', file.length, pattern.length)

  for (var fi = 0,
      pi = 0,
      fl = file.length,
      pl = pattern.length
      ; (fi < fl) && (pi < pl)
      ; fi++, pi++) {
    this.debug('matchOne loop')
    var p = pattern[pi]
    var f = file[fi]

    this.debug(pattern, p, f)

    // should be impossible.
    // some invalid regexp stuff in the set.
    if (p === false) return false

    if (p === GLOBSTAR) {
      this.debug('GLOBSTAR', [pattern, p, f])

      // "**"
      // a/**/b/**/c would match the following:
      // a/b/x/y/z/c
      // a/x/y/z/b/c
      // a/b/x/b/x/c
      // a/b/c
      // To do this, take the rest of the pattern after
      // the **, and see if it would match the file remainder.
      // If so, return success.
      // If not, the ** "swallows" a segment, and try again.
      // This is recursively awful.
      //
      // a/**/b/**/c matching a/b/x/y/z/c
      // - a matches a
      // - doublestar
      //   - matchOne(b/x/y/z/c, b/**/c)
      //     - b matches b
      //     - doublestar
      //       - matchOne(x/y/z/c, c) -> no
      //       - matchOne(y/z/c, c) -> no
      //       - matchOne(z/c, c) -> no
      //       - matchOne(c, c) yes, hit
      var fr = fi
      var pr = pi + 1
      if (pr === pl) {
        this.debug('** at the end')
        // a ** at the end will just swallow the rest.
        // We have found a match.
        // however, it will not swallow /.x, unless
        // options.dot is set.
        // . and .. are *never* matched by **, for explosively
        // exponential reasons.
        for (; fi < fl; fi++) {
          if (file[fi] === '.' || file[fi] === '..' ||
            (!options.dot && file[fi].charAt(0) === '.')) return false
        }
        return true
      }

      // ok, let's see if we can swallow whatever we can.
      while (fr < fl) {
        var swallowee = file[fr]

        this.debug('\nglobstar while', file, fr, pattern, pr, swallowee)

        // XXX remove this slice.  Just pass the start index.
        if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
          this.debug('globstar found match!', fr, fl, swallowee)
          // found a match.
          return true
        } else {
          // can't swallow "." or ".." ever.
          // can only swallow ".foo" when explicitly asked.
          if (swallowee === '.' || swallowee === '..' ||
            (!options.dot && swallowee.charAt(0) === '.')) {
            this.debug('dot detected!', file, fr, pattern, pr)
            break
          }

          // ** swallows a segment, and continue.
          this.debug('globstar swallow a segment, and continue')
          fr++
        }
      }

      // no match was found.
      // However, in partial mode, we can't say this is necessarily over.
      // If there's more *pattern* left, then
      if (partial) {
        // ran out of file
        this.debug('\n>>> no match, partial?', file, fr, pattern, pr)
        if (fr === fl) return true
      }
      return false
    }

    // something other than **
    // non-magic patterns just have to match exactly
    // patterns with magic have been turned into regexps.
    var hit
    if (typeof p === 'string') {
      if (options.nocase) {
        hit = f.toLowerCase() === p.toLowerCase()
      } else {
        hit = f === p
      }
      this.debug('string match', p, f, hit)
    } else {
      hit = f.match(p)
      this.debug('pattern match', p, f, hit)
    }

    if (!hit) return false
  }

  // Note: ending in / means that we'll get a final ""
  // at the end of the pattern.  This can only match a
  // corresponding "" at the end of the file.
  // If the file ends in /, then it can only match a
  // a pattern that ends in /, unless the pattern just
  // doesn't have any more for it. But, a/b/ should *not*
  // match "a/b/*", even though "" matches against the
  // [^/]*? pattern, except in partial mode, where it might
  // simply not be reached yet.
  // However, a/b/ should still satisfy a/*

  // now either we fell off the end of the pattern, or we're done.
  if (fi === fl && pi === pl) {
    // ran out of pattern and filename at the same time.
    // an exact hit!
    return true
  } else if (fi === fl) {
    // ran out of file, but still had pattern left.
    // this is ok if we're doing the match as part of
    // a glob fs traversal.
    return partial
  } else if (pi === pl) {
    // ran out of pattern, still have file left.
    // this is only acceptable if we're on the very last
    // empty segment of a file with a trailing slash.
    // a/* should match a/b/
    var emptyFileEnd = (fi === fl - 1) && (file[fi] === '')
    return emptyFileEnd
  }

  // should be unreachable.
  throw new Error('wtf?')
}

// replace stuff like \* with *
function globUnescape (s) {
  return s.replace(/\\(.)/g, '$1')
}

function regExpEscape (s) {
  return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}


/***/ }),

/***/ 467:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Stream = _interopDefault(__webpack_require__(2413));
var http = _interopDefault(__webpack_require__(8605));
var Url = _interopDefault(__webpack_require__(8835));
var whatwgUrl = _interopDefault(__webpack_require__(6365));
var https = _interopDefault(__webpack_require__(7211));
var zlib = _interopDefault(__webpack_require__(8761));

// Based on https://github.com/tmpvar/jsdom/blob/aa85b2abf07766ff7bf5c1f6daafb3726f2f2db5/lib/jsdom/living/blob.js

// fix for "Readable" isn't a named export issue
const Readable = Stream.Readable;

const BUFFER = Symbol('buffer');
const TYPE = Symbol('type');

class Blob {
	constructor() {
		this[TYPE] = '';

		const blobParts = arguments[0];
		const options = arguments[1];

		const buffers = [];
		let size = 0;

		if (blobParts) {
			const a = blobParts;
			const length = Number(a.length);
			for (let i = 0; i < length; i++) {
				const element = a[i];
				let buffer;
				if (element instanceof Buffer) {
					buffer = element;
				} else if (ArrayBuffer.isView(element)) {
					buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
				} else if (element instanceof ArrayBuffer) {
					buffer = Buffer.from(element);
				} else if (element instanceof Blob) {
					buffer = element[BUFFER];
				} else {
					buffer = Buffer.from(typeof element === 'string' ? element : String(element));
				}
				size += buffer.length;
				buffers.push(buffer);
			}
		}

		this[BUFFER] = Buffer.concat(buffers);

		let type = options && options.type !== undefined && String(options.type).toLowerCase();
		if (type && !/[^\u0020-\u007E]/.test(type)) {
			this[TYPE] = type;
		}
	}
	get size() {
		return this[BUFFER].length;
	}
	get type() {
		return this[TYPE];
	}
	text() {
		return Promise.resolve(this[BUFFER].toString());
	}
	arrayBuffer() {
		const buf = this[BUFFER];
		const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		return Promise.resolve(ab);
	}
	stream() {
		const readable = new Readable();
		readable._read = function () {};
		readable.push(this[BUFFER]);
		readable.push(null);
		return readable;
	}
	toString() {
		return '[object Blob]';
	}
	slice() {
		const size = this.size;

		const start = arguments[0];
		const end = arguments[1];
		let relativeStart, relativeEnd;
		if (start === undefined) {
			relativeStart = 0;
		} else if (start < 0) {
			relativeStart = Math.max(size + start, 0);
		} else {
			relativeStart = Math.min(start, size);
		}
		if (end === undefined) {
			relativeEnd = size;
		} else if (end < 0) {
			relativeEnd = Math.max(size + end, 0);
		} else {
			relativeEnd = Math.min(end, size);
		}
		const span = Math.max(relativeEnd - relativeStart, 0);

		const buffer = this[BUFFER];
		const slicedBuffer = buffer.slice(relativeStart, relativeStart + span);
		const blob = new Blob([], { type: arguments[2] });
		blob[BUFFER] = slicedBuffer;
		return blob;
	}
}

Object.defineProperties(Blob.prototype, {
	size: { enumerable: true },
	type: { enumerable: true },
	slice: { enumerable: true }
});

Object.defineProperty(Blob.prototype, Symbol.toStringTag, {
	value: 'Blob',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * fetch-error.js
 *
 * FetchError interface for operational errors
 */

/**
 * Create FetchError instance
 *
 * @param   String      message      Error message for human
 * @param   String      type         Error type for machine
 * @param   String      systemError  For Node.js system error
 * @return  FetchError
 */
function FetchError(message, type, systemError) {
  Error.call(this, message);

  this.message = message;
  this.type = type;

  // when err.type is `system`, err.code contains system error code
  if (systemError) {
    this.code = this.errno = systemError.code;
  }

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

FetchError.prototype = Object.create(Error.prototype);
FetchError.prototype.constructor = FetchError;
FetchError.prototype.name = 'FetchError';

let convert;
try {
	convert = __webpack_require__(2877).convert;
} catch (e) {}

const INTERNALS = Symbol('Body internals');

// fix an issue where "PassThrough" isn't a named export for node <10
const PassThrough = Stream.PassThrough;

/**
 * Body mixin
 *
 * Ref: https://fetch.spec.whatwg.org/#body
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
function Body(body) {
	var _this = this;

	var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	    _ref$size = _ref.size;

	let size = _ref$size === undefined ? 0 : _ref$size;
	var _ref$timeout = _ref.timeout;
	let timeout = _ref$timeout === undefined ? 0 : _ref$timeout;

	if (body == null) {
		// body is undefined or null
		body = null;
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		body = Buffer.from(body.toString());
	} else if (isBlob(body)) ; else if (Buffer.isBuffer(body)) ; else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		body = Buffer.from(body);
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
	} else if (body instanceof Stream) ; else {
		// none of the above
		// coerce to string then buffer
		body = Buffer.from(String(body));
	}
	this[INTERNALS] = {
		body,
		disturbed: false,
		error: null
	};
	this.size = size;
	this.timeout = timeout;

	if (body instanceof Stream) {
		body.on('error', function (err) {
			const error = err.name === 'AbortError' ? err : new FetchError(`Invalid response body while trying to fetch ${_this.url}: ${err.message}`, 'system', err);
			_this[INTERNALS].error = error;
		});
	}
}

Body.prototype = {
	get body() {
		return this[INTERNALS].body;
	},

	get bodyUsed() {
		return this[INTERNALS].disturbed;
	},

	/**
  * Decode response as ArrayBuffer
  *
  * @return  Promise
  */
	arrayBuffer() {
		return consumeBody.call(this).then(function (buf) {
			return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		});
	},

	/**
  * Return raw response as Blob
  *
  * @return Promise
  */
	blob() {
		let ct = this.headers && this.headers.get('content-type') || '';
		return consumeBody.call(this).then(function (buf) {
			return Object.assign(
			// Prevent copying
			new Blob([], {
				type: ct.toLowerCase()
			}), {
				[BUFFER]: buf
			});
		});
	},

	/**
  * Decode response as json
  *
  * @return  Promise
  */
	json() {
		var _this2 = this;

		return consumeBody.call(this).then(function (buffer) {
			try {
				return JSON.parse(buffer.toString());
			} catch (err) {
				return Body.Promise.reject(new FetchError(`invalid json response body at ${_this2.url} reason: ${err.message}`, 'invalid-json'));
			}
		});
	},

	/**
  * Decode response as text
  *
  * @return  Promise
  */
	text() {
		return consumeBody.call(this).then(function (buffer) {
			return buffer.toString();
		});
	},

	/**
  * Decode response as buffer (non-spec api)
  *
  * @return  Promise
  */
	buffer() {
		return consumeBody.call(this);
	},

	/**
  * Decode response as text, while automatically detecting the encoding and
  * trying to decode to UTF-8 (non-spec api)
  *
  * @return  Promise
  */
	textConverted() {
		var _this3 = this;

		return consumeBody.call(this).then(function (buffer) {
			return convertBody(buffer, _this3.headers);
		});
	}
};

// In browsers, all properties are enumerable.
Object.defineProperties(Body.prototype, {
	body: { enumerable: true },
	bodyUsed: { enumerable: true },
	arrayBuffer: { enumerable: true },
	blob: { enumerable: true },
	json: { enumerable: true },
	text: { enumerable: true }
});

Body.mixIn = function (proto) {
	for (const name of Object.getOwnPropertyNames(Body.prototype)) {
		// istanbul ignore else: future proof
		if (!(name in proto)) {
			const desc = Object.getOwnPropertyDescriptor(Body.prototype, name);
			Object.defineProperty(proto, name, desc);
		}
	}
};

/**
 * Consume and convert an entire Body to a Buffer.
 *
 * Ref: https://fetch.spec.whatwg.org/#concept-body-consume-body
 *
 * @return  Promise
 */
function consumeBody() {
	var _this4 = this;

	if (this[INTERNALS].disturbed) {
		return Body.Promise.reject(new TypeError(`body used already for: ${this.url}`));
	}

	this[INTERNALS].disturbed = true;

	if (this[INTERNALS].error) {
		return Body.Promise.reject(this[INTERNALS].error);
	}

	let body = this.body;

	// body is null
	if (body === null) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is blob
	if (isBlob(body)) {
		body = body.stream();
	}

	// body is buffer
	if (Buffer.isBuffer(body)) {
		return Body.Promise.resolve(body);
	}

	// istanbul ignore if: should never happen
	if (!(body instanceof Stream)) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is stream
	// get ready to actually consume the body
	let accum = [];
	let accumBytes = 0;
	let abort = false;

	return new Body.Promise(function (resolve, reject) {
		let resTimeout;

		// allow timeout on slow response body
		if (_this4.timeout) {
			resTimeout = setTimeout(function () {
				abort = true;
				reject(new FetchError(`Response timeout while trying to fetch ${_this4.url} (over ${_this4.timeout}ms)`, 'body-timeout'));
			}, _this4.timeout);
		}

		// handle stream errors
		body.on('error', function (err) {
			if (err.name === 'AbortError') {
				// if the request was aborted, reject with this Error
				abort = true;
				reject(err);
			} else {
				// other errors, such as incorrect content-encoding
				reject(new FetchError(`Invalid response body while trying to fetch ${_this4.url}: ${err.message}`, 'system', err));
			}
		});

		body.on('data', function (chunk) {
			if (abort || chunk === null) {
				return;
			}

			if (_this4.size && accumBytes + chunk.length > _this4.size) {
				abort = true;
				reject(new FetchError(`content size at ${_this4.url} over limit: ${_this4.size}`, 'max-size'));
				return;
			}

			accumBytes += chunk.length;
			accum.push(chunk);
		});

		body.on('end', function () {
			if (abort) {
				return;
			}

			clearTimeout(resTimeout);

			try {
				resolve(Buffer.concat(accum, accumBytes));
			} catch (err) {
				// handle streams that have accumulated too much data (issue #414)
				reject(new FetchError(`Could not create Buffer from response body for ${_this4.url}: ${err.message}`, 'system', err));
			}
		});
	});
}

/**
 * Detect buffer encoding and convert to target encoding
 * ref: http://www.w3.org/TR/2011/WD-html5-20110113/parsing.html#determining-the-character-encoding
 *
 * @param   Buffer  buffer    Incoming buffer
 * @param   String  encoding  Target encoding
 * @return  String
 */
function convertBody(buffer, headers) {
	if (typeof convert !== 'function') {
		throw new Error('The package `encoding` must be installed to use the textConverted() function');
	}

	const ct = headers.get('content-type');
	let charset = 'utf-8';
	let res, str;

	// header
	if (ct) {
		res = /charset=([^;]*)/i.exec(ct);
	}

	// no charset in content type, peek at response body for at most 1024 bytes
	str = buffer.slice(0, 1024).toString();

	// html5
	if (!res && str) {
		res = /<meta.+?charset=(['"])(.+?)\1/i.exec(str);
	}

	// html4
	if (!res && str) {
		res = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(str);
		if (!res) {
			res = /<meta[\s]+?content=(['"])(.+?)\1[\s]+?http-equiv=(['"])content-type\3/i.exec(str);
			if (res) {
				res.pop(); // drop last quote
			}
		}

		if (res) {
			res = /charset=(.*)/i.exec(res.pop());
		}
	}

	// xml
	if (!res && str) {
		res = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(str);
	}

	// found charset
	if (res) {
		charset = res.pop();

		// prevent decode issues when sites use incorrect encoding
		// ref: https://hsivonen.fi/encoding-menu/
		if (charset === 'gb2312' || charset === 'gbk') {
			charset = 'gb18030';
		}
	}

	// turn raw buffers into a single utf-8 buffer
	return convert(buffer, 'UTF-8', charset).toString();
}

/**
 * Detect a URLSearchParams object
 * ref: https://github.com/bitinn/node-fetch/issues/296#issuecomment-307598143
 *
 * @param   Object  obj     Object to detect by type or brand
 * @return  String
 */
function isURLSearchParams(obj) {
	// Duck-typing as a necessary condition.
	if (typeof obj !== 'object' || typeof obj.append !== 'function' || typeof obj.delete !== 'function' || typeof obj.get !== 'function' || typeof obj.getAll !== 'function' || typeof obj.has !== 'function' || typeof obj.set !== 'function') {
		return false;
	}

	// Brand-checking and more duck-typing as optional condition.
	return obj.constructor.name === 'URLSearchParams' || Object.prototype.toString.call(obj) === '[object URLSearchParams]' || typeof obj.sort === 'function';
}

/**
 * Check if `obj` is a W3C `Blob` object (which `File` inherits from)
 * @param  {*} obj
 * @return {boolean}
 */
function isBlob(obj) {
	return typeof obj === 'object' && typeof obj.arrayBuffer === 'function' && typeof obj.type === 'string' && typeof obj.stream === 'function' && typeof obj.constructor === 'function' && typeof obj.constructor.name === 'string' && /^(Blob|File)$/.test(obj.constructor.name) && /^(Blob|File)$/.test(obj[Symbol.toStringTag]);
}

/**
 * Clone body given Res/Req instance
 *
 * @param   Mixed  instance  Response or Request instance
 * @return  Mixed
 */
function clone(instance) {
	let p1, p2;
	let body = instance.body;

	// don't allow cloning a used body
	if (instance.bodyUsed) {
		throw new Error('cannot clone body after it is used');
	}

	// check that body is a stream and not form-data object
	// note: we can't clone the form-data object without having it as a dependency
	if (body instanceof Stream && typeof body.getBoundary !== 'function') {
		// tee instance body
		p1 = new PassThrough();
		p2 = new PassThrough();
		body.pipe(p1);
		body.pipe(p2);
		// set instance body to teed body and return the other teed body
		instance[INTERNALS].body = p1;
		body = p2;
	}

	return body;
}

/**
 * Performs the operation "extract a `Content-Type` value from |object|" as
 * specified in the specification:
 * https://fetch.spec.whatwg.org/#concept-bodyinit-extract
 *
 * This function assumes that instance.body is present.
 *
 * @param   Mixed  instance  Any options.body input
 */
function extractContentType(body) {
	if (body === null) {
		// body is null
		return null;
	} else if (typeof body === 'string') {
		// body is string
		return 'text/plain;charset=UTF-8';
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		return 'application/x-www-form-urlencoded;charset=UTF-8';
	} else if (isBlob(body)) {
		// body is blob
		return body.type || null;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return null;
	} else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		return null;
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		return null;
	} else if (typeof body.getBoundary === 'function') {
		// detect form data input from form-data module
		return `multipart/form-data;boundary=${body.getBoundary()}`;
	} else if (body instanceof Stream) {
		// body is stream
		// can't really do much about this
		return null;
	} else {
		// Body constructor defaults other things to string
		return 'text/plain;charset=UTF-8';
	}
}

/**
 * The Fetch Standard treats this as if "total bytes" is a property on the body.
 * For us, we have to explicitly get it with a function.
 *
 * ref: https://fetch.spec.whatwg.org/#concept-body-total-bytes
 *
 * @param   Body    instance   Instance of Body
 * @return  Number?            Number of bytes, or null if not possible
 */
function getTotalBytes(instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		return 0;
	} else if (isBlob(body)) {
		return body.size;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return body.length;
	} else if (body && typeof body.getLengthSync === 'function') {
		// detect form data input from form-data module
		if (body._lengthRetrievers && body._lengthRetrievers.length == 0 || // 1.x
		body.hasKnownLength && body.hasKnownLength()) {
			// 2.x
			return body.getLengthSync();
		}
		return null;
	} else {
		// body is stream
		return null;
	}
}

/**
 * Write a Body to a Node.js WritableStream (e.g. http.Request) object.
 *
 * @param   Body    instance   Instance of Body
 * @return  Void
 */
function writeToStream(dest, instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		dest.end();
	} else if (isBlob(body)) {
		body.stream().pipe(dest);
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		dest.write(body);
		dest.end();
	} else {
		// body is stream
		body.pipe(dest);
	}
}

// expose Promise
Body.Promise = global.Promise;

/**
 * headers.js
 *
 * Headers class offers convenient helpers
 */

const invalidTokenRegex = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/;
const invalidHeaderCharRegex = /[^\t\x20-\x7e\x80-\xff]/;

function validateName(name) {
	name = `${name}`;
	if (invalidTokenRegex.test(name) || name === '') {
		throw new TypeError(`${name} is not a legal HTTP header name`);
	}
}

function validateValue(value) {
	value = `${value}`;
	if (invalidHeaderCharRegex.test(value)) {
		throw new TypeError(`${value} is not a legal HTTP header value`);
	}
}

/**
 * Find the key in the map object given a header name.
 *
 * Returns undefined if not found.
 *
 * @param   String  name  Header name
 * @return  String|Undefined
 */
function find(map, name) {
	name = name.toLowerCase();
	for (const key in map) {
		if (key.toLowerCase() === name) {
			return key;
		}
	}
	return undefined;
}

const MAP = Symbol('map');
class Headers {
	/**
  * Headers class
  *
  * @param   Object  headers  Response headers
  * @return  Void
  */
	constructor() {
		let init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

		this[MAP] = Object.create(null);

		if (init instanceof Headers) {
			const rawHeaders = init.raw();
			const headerNames = Object.keys(rawHeaders);

			for (const headerName of headerNames) {
				for (const value of rawHeaders[headerName]) {
					this.append(headerName, value);
				}
			}

			return;
		}

		// We don't worry about converting prop to ByteString here as append()
		// will handle it.
		if (init == null) ; else if (typeof init === 'object') {
			const method = init[Symbol.iterator];
			if (method != null) {
				if (typeof method !== 'function') {
					throw new TypeError('Header pairs must be iterable');
				}

				// sequence<sequence<ByteString>>
				// Note: per spec we have to first exhaust the lists then process them
				const pairs = [];
				for (const pair of init) {
					if (typeof pair !== 'object' || typeof pair[Symbol.iterator] !== 'function') {
						throw new TypeError('Each header pair must be iterable');
					}
					pairs.push(Array.from(pair));
				}

				for (const pair of pairs) {
					if (pair.length !== 2) {
						throw new TypeError('Each header pair must be a name/value tuple');
					}
					this.append(pair[0], pair[1]);
				}
			} else {
				// record<ByteString, ByteString>
				for (const key of Object.keys(init)) {
					const value = init[key];
					this.append(key, value);
				}
			}
		} else {
			throw new TypeError('Provided initializer must be an object');
		}
	}

	/**
  * Return combined header value given name
  *
  * @param   String  name  Header name
  * @return  Mixed
  */
	get(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key === undefined) {
			return null;
		}

		return this[MAP][key].join(', ');
	}

	/**
  * Iterate over all headers
  *
  * @param   Function  callback  Executed for each item with parameters (value, name, thisArg)
  * @param   Boolean   thisArg   `this` context for callback function
  * @return  Void
  */
	forEach(callback) {
		let thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

		let pairs = getHeaders(this);
		let i = 0;
		while (i < pairs.length) {
			var _pairs$i = pairs[i];
			const name = _pairs$i[0],
			      value = _pairs$i[1];

			callback.call(thisArg, value, name, this);
			pairs = getHeaders(this);
			i++;
		}
	}

	/**
  * Overwrite header values given name
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	set(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		this[MAP][key !== undefined ? key : name] = [value];
	}

	/**
  * Append a value onto existing header
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	append(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			this[MAP][key].push(value);
		} else {
			this[MAP][name] = [value];
		}
	}

	/**
  * Check for header name existence
  *
  * @param   String   name  Header name
  * @return  Boolean
  */
	has(name) {
		name = `${name}`;
		validateName(name);
		return find(this[MAP], name) !== undefined;
	}

	/**
  * Delete all header values given name
  *
  * @param   String  name  Header name
  * @return  Void
  */
	delete(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			delete this[MAP][key];
		}
	}

	/**
  * Return raw headers (non-spec api)
  *
  * @return  Object
  */
	raw() {
		return this[MAP];
	}

	/**
  * Get an iterator on keys.
  *
  * @return  Iterator
  */
	keys() {
		return createHeadersIterator(this, 'key');
	}

	/**
  * Get an iterator on values.
  *
  * @return  Iterator
  */
	values() {
		return createHeadersIterator(this, 'value');
	}

	/**
  * Get an iterator on entries.
  *
  * This is the default iterator of the Headers object.
  *
  * @return  Iterator
  */
	[Symbol.iterator]() {
		return createHeadersIterator(this, 'key+value');
	}
}
Headers.prototype.entries = Headers.prototype[Symbol.iterator];

Object.defineProperty(Headers.prototype, Symbol.toStringTag, {
	value: 'Headers',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Headers.prototype, {
	get: { enumerable: true },
	forEach: { enumerable: true },
	set: { enumerable: true },
	append: { enumerable: true },
	has: { enumerable: true },
	delete: { enumerable: true },
	keys: { enumerable: true },
	values: { enumerable: true },
	entries: { enumerable: true }
});

function getHeaders(headers) {
	let kind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'key+value';

	const keys = Object.keys(headers[MAP]).sort();
	return keys.map(kind === 'key' ? function (k) {
		return k.toLowerCase();
	} : kind === 'value' ? function (k) {
		return headers[MAP][k].join(', ');
	} : function (k) {
		return [k.toLowerCase(), headers[MAP][k].join(', ')];
	});
}

const INTERNAL = Symbol('internal');

function createHeadersIterator(target, kind) {
	const iterator = Object.create(HeadersIteratorPrototype);
	iterator[INTERNAL] = {
		target,
		kind,
		index: 0
	};
	return iterator;
}

const HeadersIteratorPrototype = Object.setPrototypeOf({
	next() {
		// istanbul ignore if
		if (!this || Object.getPrototypeOf(this) !== HeadersIteratorPrototype) {
			throw new TypeError('Value of `this` is not a HeadersIterator');
		}

		var _INTERNAL = this[INTERNAL];
		const target = _INTERNAL.target,
		      kind = _INTERNAL.kind,
		      index = _INTERNAL.index;

		const values = getHeaders(target, kind);
		const len = values.length;
		if (index >= len) {
			return {
				value: undefined,
				done: true
			};
		}

		this[INTERNAL].index = index + 1;

		return {
			value: values[index],
			done: false
		};
	}
}, Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));

Object.defineProperty(HeadersIteratorPrototype, Symbol.toStringTag, {
	value: 'HeadersIterator',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * Export the Headers object in a form that Node.js can consume.
 *
 * @param   Headers  headers
 * @return  Object
 */
function exportNodeCompatibleHeaders(headers) {
	const obj = Object.assign({ __proto__: null }, headers[MAP]);

	// http.request() only supports string as Host header. This hack makes
	// specifying custom Host header possible.
	const hostHeaderKey = find(headers[MAP], 'Host');
	if (hostHeaderKey !== undefined) {
		obj[hostHeaderKey] = obj[hostHeaderKey][0];
	}

	return obj;
}

/**
 * Create a Headers object from an object of headers, ignoring those that do
 * not conform to HTTP grammar productions.
 *
 * @param   Object  obj  Object of headers
 * @return  Headers
 */
function createHeadersLenient(obj) {
	const headers = new Headers();
	for (const name of Object.keys(obj)) {
		if (invalidTokenRegex.test(name)) {
			continue;
		}
		if (Array.isArray(obj[name])) {
			for (const val of obj[name]) {
				if (invalidHeaderCharRegex.test(val)) {
					continue;
				}
				if (headers[MAP][name] === undefined) {
					headers[MAP][name] = [val];
				} else {
					headers[MAP][name].push(val);
				}
			}
		} else if (!invalidHeaderCharRegex.test(obj[name])) {
			headers[MAP][name] = [obj[name]];
		}
	}
	return headers;
}

const INTERNALS$1 = Symbol('Response internals');

// fix an issue where "STATUS_CODES" aren't a named export for node <10
const STATUS_CODES = http.STATUS_CODES;

/**
 * Response class
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
class Response {
	constructor() {
		let body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
		let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		Body.call(this, body, opts);

		const status = opts.status || 200;
		const headers = new Headers(opts.headers);

		if (body != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(body);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		this[INTERNALS$1] = {
			url: opts.url,
			status,
			statusText: opts.statusText || STATUS_CODES[status],
			headers,
			counter: opts.counter
		};
	}

	get url() {
		return this[INTERNALS$1].url || '';
	}

	get status() {
		return this[INTERNALS$1].status;
	}

	/**
  * Convenience property representing if the request ended normally
  */
	get ok() {
		return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
	}

	get redirected() {
		return this[INTERNALS$1].counter > 0;
	}

	get statusText() {
		return this[INTERNALS$1].statusText;
	}

	get headers() {
		return this[INTERNALS$1].headers;
	}

	/**
  * Clone this response
  *
  * @return  Response
  */
	clone() {
		return new Response(clone(this), {
			url: this.url,
			status: this.status,
			statusText: this.statusText,
			headers: this.headers,
			ok: this.ok,
			redirected: this.redirected
		});
	}
}

Body.mixIn(Response.prototype);

Object.defineProperties(Response.prototype, {
	url: { enumerable: true },
	status: { enumerable: true },
	ok: { enumerable: true },
	redirected: { enumerable: true },
	statusText: { enumerable: true },
	headers: { enumerable: true },
	clone: { enumerable: true }
});

Object.defineProperty(Response.prototype, Symbol.toStringTag, {
	value: 'Response',
	writable: false,
	enumerable: false,
	configurable: true
});

const INTERNALS$2 = Symbol('Request internals');
const URL = Url.URL || whatwgUrl.URL;

// fix an issue where "format", "parse" aren't a named export for node <10
const parse_url = Url.parse;
const format_url = Url.format;

/**
 * Wrapper around `new URL` to handle arbitrary URLs
 *
 * @param  {string} urlStr
 * @return {void}
 */
function parseURL(urlStr) {
	/*
 	Check whether the URL is absolute or not
 		Scheme: https://tools.ietf.org/html/rfc3986#section-3.1
 	Absolute URL: https://tools.ietf.org/html/rfc3986#section-4.3
 */
	if (/^[a-zA-Z][a-zA-Z\d+\-.]*:/.exec(urlStr)) {
		urlStr = new URL(urlStr).toString();
	}

	// Fallback to old implementation for arbitrary URLs
	return parse_url(urlStr);
}

const streamDestructionSupported = 'destroy' in Stream.Readable.prototype;

/**
 * Check if a value is an instance of Request.
 *
 * @param   Mixed   input
 * @return  Boolean
 */
function isRequest(input) {
	return typeof input === 'object' && typeof input[INTERNALS$2] === 'object';
}

function isAbortSignal(signal) {
	const proto = signal && typeof signal === 'object' && Object.getPrototypeOf(signal);
	return !!(proto && proto.constructor.name === 'AbortSignal');
}

/**
 * Request class
 *
 * @param   Mixed   input  Url or Request instance
 * @param   Object  init   Custom options
 * @return  Void
 */
class Request {
	constructor(input) {
		let init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		let parsedURL;

		// normalize input
		if (!isRequest(input)) {
			if (input && input.href) {
				// in order to support Node.js' Url objects; though WHATWG's URL objects
				// will fall into this branch also (since their `toString()` will return
				// `href` property anyway)
				parsedURL = parseURL(input.href);
			} else {
				// coerce input to a string before attempting to parse
				parsedURL = parseURL(`${input}`);
			}
			input = {};
		} else {
			parsedURL = parseURL(input.url);
		}

		let method = init.method || input.method || 'GET';
		method = method.toUpperCase();

		if ((init.body != null || isRequest(input) && input.body !== null) && (method === 'GET' || method === 'HEAD')) {
			throw new TypeError('Request with GET/HEAD method cannot have body');
		}

		let inputBody = init.body != null ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;

		Body.call(this, inputBody, {
			timeout: init.timeout || input.timeout || 0,
			size: init.size || input.size || 0
		});

		const headers = new Headers(init.headers || input.headers || {});

		if (inputBody != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(inputBody);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		let signal = isRequest(input) ? input.signal : null;
		if ('signal' in init) signal = init.signal;

		if (signal != null && !isAbortSignal(signal)) {
			throw new TypeError('Expected signal to be an instanceof AbortSignal');
		}

		this[INTERNALS$2] = {
			method,
			redirect: init.redirect || input.redirect || 'follow',
			headers,
			parsedURL,
			signal
		};

		// node-fetch-only options
		this.follow = init.follow !== undefined ? init.follow : input.follow !== undefined ? input.follow : 20;
		this.compress = init.compress !== undefined ? init.compress : input.compress !== undefined ? input.compress : true;
		this.counter = init.counter || input.counter || 0;
		this.agent = init.agent || input.agent;
	}

	get method() {
		return this[INTERNALS$2].method;
	}

	get url() {
		return format_url(this[INTERNALS$2].parsedURL);
	}

	get headers() {
		return this[INTERNALS$2].headers;
	}

	get redirect() {
		return this[INTERNALS$2].redirect;
	}

	get signal() {
		return this[INTERNALS$2].signal;
	}

	/**
  * Clone this request
  *
  * @return  Request
  */
	clone() {
		return new Request(this);
	}
}

Body.mixIn(Request.prototype);

Object.defineProperty(Request.prototype, Symbol.toStringTag, {
	value: 'Request',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Request.prototype, {
	method: { enumerable: true },
	url: { enumerable: true },
	headers: { enumerable: true },
	redirect: { enumerable: true },
	clone: { enumerable: true },
	signal: { enumerable: true }
});

/**
 * Convert a Request to Node.js http request options.
 *
 * @param   Request  A Request instance
 * @return  Object   The options object to be passed to http.request
 */
function getNodeRequestOptions(request) {
	const parsedURL = request[INTERNALS$2].parsedURL;
	const headers = new Headers(request[INTERNALS$2].headers);

	// fetch step 1.3
	if (!headers.has('Accept')) {
		headers.set('Accept', '*/*');
	}

	// Basic fetch
	if (!parsedURL.protocol || !parsedURL.hostname) {
		throw new TypeError('Only absolute URLs are supported');
	}

	if (!/^https?:$/.test(parsedURL.protocol)) {
		throw new TypeError('Only HTTP(S) protocols are supported');
	}

	if (request.signal && request.body instanceof Stream.Readable && !streamDestructionSupported) {
		throw new Error('Cancellation of streamed requests with AbortSignal is not supported in node < 8');
	}

	// HTTP-network-or-cache fetch steps 2.4-2.7
	let contentLengthValue = null;
	if (request.body == null && /^(POST|PUT)$/i.test(request.method)) {
		contentLengthValue = '0';
	}
	if (request.body != null) {
		const totalBytes = getTotalBytes(request);
		if (typeof totalBytes === 'number') {
			contentLengthValue = String(totalBytes);
		}
	}
	if (contentLengthValue) {
		headers.set('Content-Length', contentLengthValue);
	}

	// HTTP-network-or-cache fetch step 2.11
	if (!headers.has('User-Agent')) {
		headers.set('User-Agent', 'node-fetch/1.0 (+https://github.com/bitinn/node-fetch)');
	}

	// HTTP-network-or-cache fetch step 2.15
	if (request.compress && !headers.has('Accept-Encoding')) {
		headers.set('Accept-Encoding', 'gzip,deflate');
	}

	let agent = request.agent;
	if (typeof agent === 'function') {
		agent = agent(parsedURL);
	}

	if (!headers.has('Connection') && !agent) {
		headers.set('Connection', 'close');
	}

	// HTTP-network fetch step 4.2
	// chunked encoding is handled by Node.js

	return Object.assign({}, parsedURL, {
		method: request.method,
		headers: exportNodeCompatibleHeaders(headers),
		agent
	});
}

/**
 * abort-error.js
 *
 * AbortError interface for cancelled requests
 */

/**
 * Create AbortError instance
 *
 * @param   String      message      Error message for human
 * @return  AbortError
 */
function AbortError(message) {
  Error.call(this, message);

  this.type = 'aborted';
  this.message = message;

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

AbortError.prototype = Object.create(Error.prototype);
AbortError.prototype.constructor = AbortError;
AbortError.prototype.name = 'AbortError';

// fix an issue where "PassThrough", "resolve" aren't a named export for node <10
const PassThrough$1 = Stream.PassThrough;
const resolve_url = Url.resolve;

/**
 * Fetch function
 *
 * @param   Mixed    url   Absolute url or Request instance
 * @param   Object   opts  Fetch options
 * @return  Promise
 */
function fetch(url, opts) {

	// allow custom promise
	if (!fetch.Promise) {
		throw new Error('native promise missing, set fetch.Promise to your favorite alternative');
	}

	Body.Promise = fetch.Promise;

	// wrap http.request into fetch
	return new fetch.Promise(function (resolve, reject) {
		// build request object
		const request = new Request(url, opts);
		const options = getNodeRequestOptions(request);

		const send = (options.protocol === 'https:' ? https : http).request;
		const signal = request.signal;

		let response = null;

		const abort = function abort() {
			let error = new AbortError('The user aborted a request.');
			reject(error);
			if (request.body && request.body instanceof Stream.Readable) {
				request.body.destroy(error);
			}
			if (!response || !response.body) return;
			response.body.emit('error', error);
		};

		if (signal && signal.aborted) {
			abort();
			return;
		}

		const abortAndFinalize = function abortAndFinalize() {
			abort();
			finalize();
		};

		// send request
		const req = send(options);
		let reqTimeout;

		if (signal) {
			signal.addEventListener('abort', abortAndFinalize);
		}

		function finalize() {
			req.abort();
			if (signal) signal.removeEventListener('abort', abortAndFinalize);
			clearTimeout(reqTimeout);
		}

		if (request.timeout) {
			req.once('socket', function (socket) {
				reqTimeout = setTimeout(function () {
					reject(new FetchError(`network timeout at: ${request.url}`, 'request-timeout'));
					finalize();
				}, request.timeout);
			});
		}

		req.on('error', function (err) {
			reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, 'system', err));
			finalize();
		});

		req.on('response', function (res) {
			clearTimeout(reqTimeout);

			const headers = createHeadersLenient(res.headers);

			// HTTP fetch step 5
			if (fetch.isRedirect(res.statusCode)) {
				// HTTP fetch step 5.2
				const location = headers.get('Location');

				// HTTP fetch step 5.3
				const locationURL = location === null ? null : resolve_url(request.url, location);

				// HTTP fetch step 5.5
				switch (request.redirect) {
					case 'error':
						reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, 'no-redirect'));
						finalize();
						return;
					case 'manual':
						// node-fetch-specific step: make manual redirect a bit easier to use by setting the Location header value to the resolved URL.
						if (locationURL !== null) {
							// handle corrupted header
							try {
								headers.set('Location', locationURL);
							} catch (err) {
								// istanbul ignore next: nodejs server prevent invalid response headers, we can't test this through normal request
								reject(err);
							}
						}
						break;
					case 'follow':
						// HTTP-redirect fetch step 2
						if (locationURL === null) {
							break;
						}

						// HTTP-redirect fetch step 5
						if (request.counter >= request.follow) {
							reject(new FetchError(`maximum redirect reached at: ${request.url}`, 'max-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 6 (counter increment)
						// Create a new Request object.
						const requestOpts = {
							headers: new Headers(request.headers),
							follow: request.follow,
							counter: request.counter + 1,
							agent: request.agent,
							compress: request.compress,
							method: request.method,
							body: request.body,
							signal: request.signal,
							timeout: request.timeout,
							size: request.size
						};

						// HTTP-redirect fetch step 9
						if (res.statusCode !== 303 && request.body && getTotalBytes(request) === null) {
							reject(new FetchError('Cannot follow redirect with body being a readable stream', 'unsupported-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 11
						if (res.statusCode === 303 || (res.statusCode === 301 || res.statusCode === 302) && request.method === 'POST') {
							requestOpts.method = 'GET';
							requestOpts.body = undefined;
							requestOpts.headers.delete('content-length');
						}

						// HTTP-redirect fetch step 15
						resolve(fetch(new Request(locationURL, requestOpts)));
						finalize();
						return;
				}
			}

			// prepare response
			res.once('end', function () {
				if (signal) signal.removeEventListener('abort', abortAndFinalize);
			});
			let body = res.pipe(new PassThrough$1());

			const response_options = {
				url: request.url,
				status: res.statusCode,
				statusText: res.statusMessage,
				headers: headers,
				size: request.size,
				timeout: request.timeout,
				counter: request.counter
			};

			// HTTP-network fetch step 12.1.1.3
			const codings = headers.get('Content-Encoding');

			// HTTP-network fetch step 12.1.1.4: handle content codings

			// in following scenarios we ignore compression support
			// 1. compression support is disabled
			// 2. HEAD request
			// 3. no Content-Encoding header
			// 4. no content response (204)
			// 5. content not modified response (304)
			if (!request.compress || request.method === 'HEAD' || codings === null || res.statusCode === 204 || res.statusCode === 304) {
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// For Node v6+
			// Be less strict when decoding compressed responses, since sometimes
			// servers send slightly invalid responses that are still accepted
			// by common browsers.
			// Always using Z_SYNC_FLUSH is what cURL does.
			const zlibOptions = {
				flush: zlib.Z_SYNC_FLUSH,
				finishFlush: zlib.Z_SYNC_FLUSH
			};

			// for gzip
			if (codings == 'gzip' || codings == 'x-gzip') {
				body = body.pipe(zlib.createGunzip(zlibOptions));
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// for deflate
			if (codings == 'deflate' || codings == 'x-deflate') {
				// handle the infamous raw deflate response from old servers
				// a hack for old IIS and Apache servers
				const raw = res.pipe(new PassThrough$1());
				raw.once('data', function (chunk) {
					// see http://stackoverflow.com/questions/37519828
					if ((chunk[0] & 0x0F) === 0x08) {
						body = body.pipe(zlib.createInflate());
					} else {
						body = body.pipe(zlib.createInflateRaw());
					}
					response = new Response(body, response_options);
					resolve(response);
				});
				return;
			}

			// for br
			if (codings == 'br' && typeof zlib.createBrotliDecompress === 'function') {
				body = body.pipe(zlib.createBrotliDecompress());
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// otherwise, use response as-is
			response = new Response(body, response_options);
			resolve(response);
		});

		writeToStream(req, request);
	});
}
/**
 * Redirect code matching
 *
 * @param   Number   code  Status code
 * @return  Boolean
 */
fetch.isRedirect = function (code) {
	return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
};

// expose Promise
fetch.Promise = global.Promise;

module.exports = exports = fetch;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.default = exports;
exports.Headers = Headers;
exports.Request = Request;
exports.Response = Response;
exports.FetchError = FetchError;


/***/ }),

/***/ 4256:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const punycode = __webpack_require__(4213);
const regexes = __webpack_require__(4572);
const mappingTable = __webpack_require__(68);
const { STATUS_MAPPING } = __webpack_require__(8644);

function containsNonASCII(str) {
  return /[^\x00-\x7F]/.test(str);
}

function findStatus(val, { useSTD3ASCIIRules }) {
  let start = 0;
  let end = mappingTable.length - 1;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);

    const target = mappingTable[mid];
    const min = Array.isArray(target[0]) ? target[0][0] : target[0];
    const max = Array.isArray(target[0]) ? target[0][1] : target[0];

    if (min <= val && max >= val) {
      if (useSTD3ASCIIRules &&
          (target[1] === STATUS_MAPPING.disallowed_STD3_valid || target[1] === STATUS_MAPPING.disallowed_STD3_mapped)) {
        return [STATUS_MAPPING.disallowed, ...target.slice(2)];
      } else if (target[1] === STATUS_MAPPING.disallowed_STD3_valid) {
        return [STATUS_MAPPING.valid, ...target.slice(2)];
      } else if (target[1] === STATUS_MAPPING.disallowed_STD3_mapped) {
        return [STATUS_MAPPING.mapped, ...target.slice(2)];
      }

      return target.slice(1);
    } else if (min > val) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  return null;
}

function mapChars(domainName, { useSTD3ASCIIRules, processingOption }) {
  let hasError = false;
  let processed = "";

  for (const ch of domainName) {
    const [status, mapping] = findStatus(ch.codePointAt(0), { useSTD3ASCIIRules });

    switch (status) {
      case STATUS_MAPPING.disallowed:
        hasError = true;
        processed += ch;
        break;
      case STATUS_MAPPING.ignored:
        break;
      case STATUS_MAPPING.mapped:
        processed += mapping;
        break;
      case STATUS_MAPPING.deviation:
        if (processingOption === "transitional") {
          processed += mapping;
        } else {
          processed += ch;
        }
        break;
      case STATUS_MAPPING.valid:
        processed += ch;
        break;
    }
  }

  return {
    string: processed,
    error: hasError
  };
}

function validateLabel(label, { checkHyphens, checkBidi, checkJoiners, processingOption, useSTD3ASCIIRules }) {
  if (label.normalize("NFC") !== label) {
    return false;
  }

  const codePoints = Array.from(label);

  if (checkHyphens) {
    if ((codePoints[2] === "-" && codePoints[3] === "-") ||
        (label.startsWith("-") || label.endsWith("-"))) {
      return false;
    }
  }

  if (label.includes(".") ||
      (codePoints.length > 0 && regexes.combiningMarks.test(codePoints[0]))) {
    return false;
  }

  for (const ch of codePoints) {
    const [status] = findStatus(ch.codePointAt(0), { useSTD3ASCIIRules });
    if ((processingOption === "transitional" && status !== STATUS_MAPPING.valid) ||
        (processingOption === "nontransitional" &&
         status !== STATUS_MAPPING.valid && status !== STATUS_MAPPING.deviation)) {
      return false;
    }
  }

  // https://tools.ietf.org/html/rfc5892#appendix-A
  if (checkJoiners) {
    let last = 0;
    for (const [i, ch] of codePoints.entries()) {
      if (ch === "\u200C" || ch === "\u200D") {
        if (i > 0) {
          if (regexes.combiningClassVirama.test(codePoints[i - 1])) {
            continue;
          }
          if (ch === "\u200C") {
            // TODO: make this more efficient
            const next = codePoints.indexOf("\u200C", i + 1);
            const test = next < 0 ? codePoints.slice(last) : codePoints.slice(last, next);
            if (regexes.validZWNJ.test(test.join(""))) {
              last = i + 1;
              continue;
            }
          }
        }
        return false;
      }
    }
  }

  // https://tools.ietf.org/html/rfc5893#section-2
  if (checkBidi) {
    let rtl;

    // 1
    if (regexes.bidiS1LTR.test(codePoints[0])) {
      rtl = false;
    } else if (regexes.bidiS1RTL.test(codePoints[0])) {
      rtl = true;
    } else {
      return false;
    }

    if (rtl) {
      // 2-4
      if (!regexes.bidiS2.test(label) ||
          !regexes.bidiS3.test(label) ||
          (regexes.bidiS4EN.test(label) && regexes.bidiS4AN.test(label))) {
        return false;
      }
    } else if (!regexes.bidiS5.test(label) ||
               !regexes.bidiS6.test(label)) { // 5-6
      return false;
    }
  }

  return true;
}

function isBidiDomain(labels) {
  const domain = labels.map(label => {
    if (label.startsWith("xn--")) {
      try {
        return punycode.decode(label.substring(4));
      } catch (err) {
        return "";
      }
    }
    return label;
  }).join(".");
  return regexes.bidiDomain.test(domain);
}

function processing(domainName, options) {
  const { processingOption } = options;

  // 1. Map.
  let { string, error } = mapChars(domainName, options);

  // 2. Normalize.
  string = string.normalize("NFC");

  // 3. Break.
  const labels = string.split(".");
  const isBidi = isBidiDomain(labels);

  // 4. Convert/Validate.
  for (const [i, origLabel] of labels.entries()) {
    let label = origLabel;
    let curProcessing = processingOption;
    if (label.startsWith("xn--")) {
      try {
        label = punycode.decode(label.substring(4));
        labels[i] = label;
      } catch (err) {
        error = true;
        continue;
      }
      curProcessing = "nontransitional";
    }

    // No need to validate if we already know there is an error.
    if (error) {
      continue;
    }
    const validation = validateLabel(label, Object.assign({}, options, {
      processingOption: curProcessing,
      checkBidi: options.checkBidi && isBidi
    }));
    if (!validation) {
      error = true;
    }
  }

  return {
    string: labels.join("."),
    error
  };
}

function toASCII(domainName, {
  checkHyphens = false,
  checkBidi = false,
  checkJoiners = false,
  useSTD3ASCIIRules = false,
  processingOption = "nontransitional",
  verifyDNSLength = false
} = {}) {
  if (processingOption !== "transitional" && processingOption !== "nontransitional") {
    throw new RangeError("processingOption must be either transitional or nontransitional");
  }

  const result = processing(domainName, {
    processingOption,
    checkHyphens,
    checkBidi,
    checkJoiners,
    useSTD3ASCIIRules
  });
  let labels = result.string.split(".");
  labels = labels.map(l => {
    if (containsNonASCII(l)) {
      try {
        return "xn--" + punycode.encode(l);
      } catch (e) {
        result.error = true;
      }
    }
    return l;
  });

  if (verifyDNSLength) {
    const total = labels.join(".").length;
    if (total > 253 || total === 0) {
      result.error = true;
    }

    for (let i = 0; i < labels.length; ++i) {
      if (labels[i].length > 63 || labels[i].length === 0) {
        result.error = true;
        break;
      }
    }
  }

  if (result.error) {
    return null;
  }
  return labels.join(".");
}

function toUnicode(domainName, {
  checkHyphens = false,
  checkBidi = false,
  checkJoiners = false,
  useSTD3ASCIIRules = false,
  processingOption = "nontransitional"
} = {}) {
  const result = processing(domainName, {
    processingOption,
    checkHyphens,
    checkBidi,
    checkJoiners,
    useSTD3ASCIIRules
  });

  return {
    domain: result.string,
    error: result.error
  };
}

module.exports = {
  toASCII,
  toUnicode
};


/***/ }),

/***/ 4572:
/***/ ((module) => {

"use strict";


const combiningMarks = /[\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D3-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0C00-\u0C04\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F\u109A-\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u180B-\u180D\u1885\u1886\u18A9\u1920-\u192B\u1930-\u193B\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F\u1AB0-\u1ABE\u1B00-\u1B04\u1B34-\u1B44\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BE6-\u1BF3\u1C24-\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DF9\u1DFB-\u1DFF\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F-\uA672\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C5\uA8E0-\uA8F1\uA8FF\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9E5\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\u{101FD}\u{102E0}\u{10376}-\u{1037A}\u{10A01}-\u{10A03}\u{10A05}\u{10A06}\u{10A0C}-\u{10A0F}\u{10A38}-\u{10A3A}\u{10A3F}\u{10AE5}\u{10AE6}\u{10D24}-\u{10D27}\u{10F46}-\u{10F50}\u{11000}-\u{11002}\u{11038}-\u{11046}\u{1107F}-\u{11082}\u{110B0}-\u{110BA}\u{11100}-\u{11102}\u{11127}-\u{11134}\u{11145}\u{11146}\u{11173}\u{11180}-\u{11182}\u{111B3}-\u{111C0}\u{111C9}-\u{111CC}\u{1122C}-\u{11237}\u{1123E}\u{112DF}-\u{112EA}\u{11300}-\u{11303}\u{1133B}\u{1133C}\u{1133E}-\u{11344}\u{11347}\u{11348}\u{1134B}-\u{1134D}\u{11357}\u{11362}\u{11363}\u{11366}-\u{1136C}\u{11370}-\u{11374}\u{11435}-\u{11446}\u{1145E}\u{114B0}-\u{114C3}\u{115AF}-\u{115B5}\u{115B8}-\u{115C0}\u{115DC}\u{115DD}\u{11630}-\u{11640}\u{116AB}-\u{116B7}\u{1171D}-\u{1172B}\u{1182C}-\u{1183A}\u{119D1}-\u{119D7}\u{119DA}-\u{119E0}\u{119E4}\u{11A01}-\u{11A0A}\u{11A33}-\u{11A39}\u{11A3B}-\u{11A3E}\u{11A47}\u{11A51}-\u{11A5B}\u{11A8A}-\u{11A99}\u{11C2F}-\u{11C36}\u{11C38}-\u{11C3F}\u{11C92}-\u{11CA7}\u{11CA9}-\u{11CB6}\u{11D31}-\u{11D36}\u{11D3A}\u{11D3C}\u{11D3D}\u{11D3F}-\u{11D45}\u{11D47}\u{11D8A}-\u{11D8E}\u{11D90}\u{11D91}\u{11D93}-\u{11D97}\u{11EF3}-\u{11EF6}\u{16AF0}-\u{16AF4}\u{16B30}-\u{16B36}\u{16F4F}\u{16F51}-\u{16F87}\u{16F8F}-\u{16F92}\u{1BC9D}\u{1BC9E}\u{1D165}-\u{1D169}\u{1D16D}-\u{1D172}\u{1D17B}-\u{1D182}\u{1D185}-\u{1D18B}\u{1D1AA}-\u{1D1AD}\u{1D242}-\u{1D244}\u{1DA00}-\u{1DA36}\u{1DA3B}-\u{1DA6C}\u{1DA75}\u{1DA84}\u{1DA9B}-\u{1DA9F}\u{1DAA1}-\u{1DAAF}\u{1E000}-\u{1E006}\u{1E008}-\u{1E018}\u{1E01B}-\u{1E021}\u{1E023}\u{1E024}\u{1E026}-\u{1E02A}\u{1E130}-\u{1E136}\u{1E2EC}-\u{1E2EF}\u{1E8D0}-\u{1E8D6}\u{1E944}-\u{1E94A}\u{E0100}-\u{E01EF}]/u;
const combiningClassVirama = /[\u094D\u09CD\u0A4D\u0ACD\u0B4D\u0BCD\u0C4D\u0CCD\u0D3B\u0D3C\u0D4D\u0DCA\u0E3A\u0EBA\u0F84\u1039\u103A\u1714\u1734\u17D2\u1A60\u1B44\u1BAA\u1BAB\u1BF2\u1BF3\u2D7F\uA806\uA8C4\uA953\uA9C0\uAAF6\uABED\u{10A3F}\u{11046}\u{1107F}\u{110B9}\u{11133}\u{11134}\u{111C0}\u{11235}\u{112EA}\u{1134D}\u{11442}\u{114C2}\u{115BF}\u{1163F}\u{116B6}\u{1172B}\u{11839}\u{119E0}\u{11A34}\u{11A47}\u{11A99}\u{11C3F}\u{11D44}\u{11D45}\u{11D97}]/u;
const validZWNJ = /[\u0620\u0626\u0628\u062A-\u062E\u0633-\u063F\u0641-\u0647\u0649\u064A\u066E\u066F\u0678-\u0687\u069A-\u06BF\u06C1\u06C2\u06CC\u06CE\u06D0\u06D1\u06FA-\u06FC\u06FF\u0712-\u0714\u071A-\u071D\u071F-\u0727\u0729\u072B\u072D\u072E\u074E-\u0758\u075C-\u076A\u076D-\u0770\u0772\u0775-\u0777\u077A-\u077F\u07CA-\u07EA\u0841-\u0845\u0848\u084A-\u0853\u0855\u0860\u0862-\u0865\u0868\u08A0-\u08A9\u08AF\u08B0\u08B3\u08B4\u08B6-\u08B8\u08BA-\u08BD\u1807\u1820-\u1878\u1887-\u18A8\u18AA\uA840-\uA872\u{10AC0}-\u{10AC4}\u{10ACD}\u{10AD3}-\u{10ADC}\u{10ADE}-\u{10AE0}\u{10AEB}-\u{10AEE}\u{10B80}\u{10B82}\u{10B86}-\u{10B88}\u{10B8A}\u{10B8B}\u{10B8D}\u{10B90}\u{10BAD}\u{10BAE}\u{10D00}-\u{10D21}\u{10D23}\u{10F30}-\u{10F32}\u{10F34}-\u{10F44}\u{10F51}-\u{10F53}\u{1E900}-\u{1E943}][\xAD\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u061C\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u070F\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D3-\u08E1\u08E3-\u0902\u093A\u093C\u0941-\u0948\u094D\u0951-\u0957\u0962\u0963\u0981\u09BC\u09C1-\u09C4\u09CD\u09E2\u09E3\u09FE\u0A01\u0A02\u0A3C\u0A41\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81\u0A82\u0ABC\u0AC1-\u0AC5\u0AC7\u0AC8\u0ACD\u0AE2\u0AE3\u0AFA-\u0AFF\u0B01\u0B3C\u0B3F\u0B41-\u0B44\u0B4D\u0B56\u0B62\u0B63\u0B82\u0BC0\u0BCD\u0C00\u0C04\u0C3E-\u0C40\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81\u0CBC\u0CBF\u0CC6\u0CCC\u0CCD\u0CE2\u0CE3\u0D00\u0D01\u0D3B\u0D3C\u0D41-\u0D44\u0D4D\u0D62\u0D63\u0DCA\u0DD2-\u0DD4\u0DD6\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F71-\u0F7E\u0F80-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102D-\u1030\u1032-\u1037\u1039\u103A\u103D\u103E\u1058\u1059\u105E-\u1060\u1071-\u1074\u1082\u1085\u1086\u108D\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4\u17B5\u17B7-\u17BD\u17C6\u17C9-\u17D3\u17DD\u180B-\u180D\u1885\u1886\u18A9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193B\u1A17\u1A18\u1A1B\u1A56\u1A58-\u1A5E\u1A60\u1A62\u1A65-\u1A6C\u1A73-\u1A7C\u1A7F\u1AB0-\u1ABE\u1B00-\u1B03\u1B34\u1B36-\u1B3A\u1B3C\u1B42\u1B6B-\u1B73\u1B80\u1B81\u1BA2-\u1BA5\u1BA8\u1BA9\u1BAB-\u1BAD\u1BE6\u1BE8\u1BE9\u1BED\u1BEF-\u1BF1\u1C2C-\u1C33\u1C36\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE0\u1CE2-\u1CE8\u1CED\u1CF4\u1CF8\u1CF9\u1DC0-\u1DF9\u1DFB-\u1DFF\u200B\u200E\u200F\u202A-\u202E\u2060-\u2064\u206A-\u206F\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302D\u3099\u309A\uA66F-\uA672\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA825\uA826\uA8C4\uA8C5\uA8E0-\uA8F1\uA8FF\uA926-\uA92D\uA947-\uA951\uA980-\uA982\uA9B3\uA9B6-\uA9B9\uA9BC\uA9BD\uA9E5\uAA29-\uAA2E\uAA31\uAA32\uAA35\uAA36\uAA43\uAA4C\uAA7C\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEC\uAAED\uAAF6\uABE5\uABE8\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\uFEFF\uFFF9-\uFFFB\u{101FD}\u{102E0}\u{10376}-\u{1037A}\u{10A01}-\u{10A03}\u{10A05}\u{10A06}\u{10A0C}-\u{10A0F}\u{10A38}-\u{10A3A}\u{10A3F}\u{10AE5}\u{10AE6}\u{10D24}-\u{10D27}\u{10F46}-\u{10F50}\u{11001}\u{11038}-\u{11046}\u{1107F}-\u{11081}\u{110B3}-\u{110B6}\u{110B9}\u{110BA}\u{11100}-\u{11102}\u{11127}-\u{1112B}\u{1112D}-\u{11134}\u{11173}\u{11180}\u{11181}\u{111B6}-\u{111BE}\u{111C9}-\u{111CC}\u{1122F}-\u{11231}\u{11234}\u{11236}\u{11237}\u{1123E}\u{112DF}\u{112E3}-\u{112EA}\u{11300}\u{11301}\u{1133B}\u{1133C}\u{11340}\u{11366}-\u{1136C}\u{11370}-\u{11374}\u{11438}-\u{1143F}\u{11442}-\u{11444}\u{11446}\u{1145E}\u{114B3}-\u{114B8}\u{114BA}\u{114BF}\u{114C0}\u{114C2}\u{114C3}\u{115B2}-\u{115B5}\u{115BC}\u{115BD}\u{115BF}\u{115C0}\u{115DC}\u{115DD}\u{11633}-\u{1163A}\u{1163D}\u{1163F}\u{11640}\u{116AB}\u{116AD}\u{116B0}-\u{116B5}\u{116B7}\u{1171D}-\u{1171F}\u{11722}-\u{11725}\u{11727}-\u{1172B}\u{1182F}-\u{11837}\u{11839}\u{1183A}\u{119D4}-\u{119D7}\u{119DA}\u{119DB}\u{119E0}\u{11A01}-\u{11A0A}\u{11A33}-\u{11A38}\u{11A3B}-\u{11A3E}\u{11A47}\u{11A51}-\u{11A56}\u{11A59}-\u{11A5B}\u{11A8A}-\u{11A96}\u{11A98}\u{11A99}\u{11C30}-\u{11C36}\u{11C38}-\u{11C3D}\u{11C3F}\u{11C92}-\u{11CA7}\u{11CAA}-\u{11CB0}\u{11CB2}\u{11CB3}\u{11CB5}\u{11CB6}\u{11D31}-\u{11D36}\u{11D3A}\u{11D3C}\u{11D3D}\u{11D3F}-\u{11D45}\u{11D47}\u{11D90}\u{11D91}\u{11D95}\u{11D97}\u{11EF3}\u{11EF4}\u{13430}-\u{13438}\u{16AF0}-\u{16AF4}\u{16B30}-\u{16B36}\u{16F4F}\u{16F8F}-\u{16F92}\u{1BC9D}\u{1BC9E}\u{1BCA0}-\u{1BCA3}\u{1D167}-\u{1D169}\u{1D173}-\u{1D182}\u{1D185}-\u{1D18B}\u{1D1AA}-\u{1D1AD}\u{1D242}-\u{1D244}\u{1DA00}-\u{1DA36}\u{1DA3B}-\u{1DA6C}\u{1DA75}\u{1DA84}\u{1DA9B}-\u{1DA9F}\u{1DAA1}-\u{1DAAF}\u{1E000}-\u{1E006}\u{1E008}-\u{1E018}\u{1E01B}-\u{1E021}\u{1E023}\u{1E024}\u{1E026}-\u{1E02A}\u{1E130}-\u{1E136}\u{1E2EC}-\u{1E2EF}\u{1E8D0}-\u{1E8D6}\u{1E944}-\u{1E94B}\u{E0001}\u{E0020}-\u{E007F}\u{E0100}-\u{E01EF}]*\u200C[\xAD\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u061C\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u070F\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D3-\u08E1\u08E3-\u0902\u093A\u093C\u0941-\u0948\u094D\u0951-\u0957\u0962\u0963\u0981\u09BC\u09C1-\u09C4\u09CD\u09E2\u09E3\u09FE\u0A01\u0A02\u0A3C\u0A41\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81\u0A82\u0ABC\u0AC1-\u0AC5\u0AC7\u0AC8\u0ACD\u0AE2\u0AE3\u0AFA-\u0AFF\u0B01\u0B3C\u0B3F\u0B41-\u0B44\u0B4D\u0B56\u0B62\u0B63\u0B82\u0BC0\u0BCD\u0C00\u0C04\u0C3E-\u0C40\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81\u0CBC\u0CBF\u0CC6\u0CCC\u0CCD\u0CE2\u0CE3\u0D00\u0D01\u0D3B\u0D3C\u0D41-\u0D44\u0D4D\u0D62\u0D63\u0DCA\u0DD2-\u0DD4\u0DD6\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F71-\u0F7E\u0F80-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102D-\u1030\u1032-\u1037\u1039\u103A\u103D\u103E\u1058\u1059\u105E-\u1060\u1071-\u1074\u1082\u1085\u1086\u108D\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4\u17B5\u17B7-\u17BD\u17C6\u17C9-\u17D3\u17DD\u180B-\u180D\u1885\u1886\u18A9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193B\u1A17\u1A18\u1A1B\u1A56\u1A58-\u1A5E\u1A60\u1A62\u1A65-\u1A6C\u1A73-\u1A7C\u1A7F\u1AB0-\u1ABE\u1B00-\u1B03\u1B34\u1B36-\u1B3A\u1B3C\u1B42\u1B6B-\u1B73\u1B80\u1B81\u1BA2-\u1BA5\u1BA8\u1BA9\u1BAB-\u1BAD\u1BE6\u1BE8\u1BE9\u1BED\u1BEF-\u1BF1\u1C2C-\u1C33\u1C36\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE0\u1CE2-\u1CE8\u1CED\u1CF4\u1CF8\u1CF9\u1DC0-\u1DF9\u1DFB-\u1DFF\u200B\u200E\u200F\u202A-\u202E\u2060-\u2064\u206A-\u206F\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302D\u3099\u309A\uA66F-\uA672\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA825\uA826\uA8C4\uA8C5\uA8E0-\uA8F1\uA8FF\uA926-\uA92D\uA947-\uA951\uA980-\uA982\uA9B3\uA9B6-\uA9B9\uA9BC\uA9BD\uA9E5\uAA29-\uAA2E\uAA31\uAA32\uAA35\uAA36\uAA43\uAA4C\uAA7C\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEC\uAAED\uAAF6\uABE5\uABE8\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\uFEFF\uFFF9-\uFFFB\u{101FD}\u{102E0}\u{10376}-\u{1037A}\u{10A01}-\u{10A03}\u{10A05}\u{10A06}\u{10A0C}-\u{10A0F}\u{10A38}-\u{10A3A}\u{10A3F}\u{10AE5}\u{10AE6}\u{10D24}-\u{10D27}\u{10F46}-\u{10F50}\u{11001}\u{11038}-\u{11046}\u{1107F}-\u{11081}\u{110B3}-\u{110B6}\u{110B9}\u{110BA}\u{11100}-\u{11102}\u{11127}-\u{1112B}\u{1112D}-\u{11134}\u{11173}\u{11180}\u{11181}\u{111B6}-\u{111BE}\u{111C9}-\u{111CC}\u{1122F}-\u{11231}\u{11234}\u{11236}\u{11237}\u{1123E}\u{112DF}\u{112E3}-\u{112EA}\u{11300}\u{11301}\u{1133B}\u{1133C}\u{11340}\u{11366}-\u{1136C}\u{11370}-\u{11374}\u{11438}-\u{1143F}\u{11442}-\u{11444}\u{11446}\u{1145E}\u{114B3}-\u{114B8}\u{114BA}\u{114BF}\u{114C0}\u{114C2}\u{114C3}\u{115B2}-\u{115B5}\u{115BC}\u{115BD}\u{115BF}\u{115C0}\u{115DC}\u{115DD}\u{11633}-\u{1163A}\u{1163D}\u{1163F}\u{11640}\u{116AB}\u{116AD}\u{116B0}-\u{116B5}\u{116B7}\u{1171D}-\u{1171F}\u{11722}-\u{11725}\u{11727}-\u{1172B}\u{1182F}-\u{11837}\u{11839}\u{1183A}\u{119D4}-\u{119D7}\u{119DA}\u{119DB}\u{119E0}\u{11A01}-\u{11A0A}\u{11A33}-\u{11A38}\u{11A3B}-\u{11A3E}\u{11A47}\u{11A51}-\u{11A56}\u{11A59}-\u{11A5B}\u{11A8A}-\u{11A96}\u{11A98}\u{11A99}\u{11C30}-\u{11C36}\u{11C38}-\u{11C3D}\u{11C3F}\u{11C92}-\u{11CA7}\u{11CAA}-\u{11CB0}\u{11CB2}\u{11CB3}\u{11CB5}\u{11CB6}\u{11D31}-\u{11D36}\u{11D3A}\u{11D3C}\u{11D3D}\u{11D3F}-\u{11D45}\u{11D47}\u{11D90}\u{11D91}\u{11D95}\u{11D97}\u{11EF3}\u{11EF4}\u{13430}-\u{13438}\u{16AF0}-\u{16AF4}\u{16B30}-\u{16B36}\u{16F4F}\u{16F8F}-\u{16F92}\u{1BC9D}\u{1BC9E}\u{1BCA0}-\u{1BCA3}\u{1D167}-\u{1D169}\u{1D173}-\u{1D182}\u{1D185}-\u{1D18B}\u{1D1AA}-\u{1D1AD}\u{1D242}-\u{1D244}\u{1DA00}-\u{1DA36}\u{1DA3B}-\u{1DA6C}\u{1DA75}\u{1DA84}\u{1DA9B}-\u{1DA9F}\u{1DAA1}-\u{1DAAF}\u{1E000}-\u{1E006}\u{1E008}-\u{1E018}\u{1E01B}-\u{1E021}\u{1E023}\u{1E024}\u{1E026}-\u{1E02A}\u{1E130}-\u{1E136}\u{1E2EC}-\u{1E2EF}\u{1E8D0}-\u{1E8D6}\u{1E944}-\u{1E94B}\u{E0001}\u{E0020}-\u{E007F}\u{E0100}-\u{E01EF}]*[\u0620\u0622-\u063F\u0641-\u064A\u066E\u066F\u0671-\u0673\u0675-\u06D3\u06D5\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u077F\u07CA-\u07EA\u0840-\u0855\u0860\u0862-\u0865\u0867-\u086A\u08A0-\u08AC\u08AE-\u08B4\u08B6-\u08BD\u1807\u1820-\u1878\u1887-\u18A8\u18AA\uA840-\uA871\u{10AC0}-\u{10AC5}\u{10AC7}\u{10AC9}\u{10ACA}\u{10ACE}-\u{10AD6}\u{10AD8}-\u{10AE1}\u{10AE4}\u{10AEB}-\u{10AEF}\u{10B80}-\u{10B91}\u{10BA9}-\u{10BAE}\u{10D01}-\u{10D23}\u{10F30}-\u{10F44}\u{10F51}-\u{10F54}\u{1E900}-\u{1E943}]/u;
const bidiDomain = /[\u05BE\u05C0\u05C3\u05C6\u05D0-\u05EA\u05EF-\u05F4\u0600-\u0605\u0608\u060B\u060D\u061B\u061C\u061E-\u064A\u0660-\u0669\u066B-\u066F\u0671-\u06D5\u06DD\u06E5\u06E6\u06EE\u06EF\u06FA-\u070D\u070F\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07C0-\u07EA\u07F4\u07F5\u07FA\u07FE-\u0815\u081A\u0824\u0828\u0830-\u083E\u0840-\u0858\u085E\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u08E2\u200F\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBC1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFC\uFE70-\uFE74\uFE76-\uFEFC\u{10800}-\u{10805}\u{10808}\u{1080A}-\u{10835}\u{10837}\u{10838}\u{1083C}\u{1083F}-\u{10855}\u{10857}-\u{1089E}\u{108A7}-\u{108AF}\u{108E0}-\u{108F2}\u{108F4}\u{108F5}\u{108FB}-\u{1091B}\u{10920}-\u{10939}\u{1093F}\u{10980}-\u{109B7}\u{109BC}-\u{109CF}\u{109D2}-\u{10A00}\u{10A10}-\u{10A13}\u{10A15}-\u{10A17}\u{10A19}-\u{10A35}\u{10A40}-\u{10A48}\u{10A50}-\u{10A58}\u{10A60}-\u{10A9F}\u{10AC0}-\u{10AE4}\u{10AEB}-\u{10AF6}\u{10B00}-\u{10B35}\u{10B40}-\u{10B55}\u{10B58}-\u{10B72}\u{10B78}-\u{10B91}\u{10B99}-\u{10B9C}\u{10BA9}-\u{10BAF}\u{10C00}-\u{10C48}\u{10C80}-\u{10CB2}\u{10CC0}-\u{10CF2}\u{10CFA}-\u{10D23}\u{10D30}-\u{10D39}\u{10E60}-\u{10E7E}\u{10F00}-\u{10F27}\u{10F30}-\u{10F45}\u{10F51}-\u{10F59}\u{10FE0}-\u{10FF6}\u{1E800}-\u{1E8C4}\u{1E8C7}-\u{1E8CF}\u{1E900}-\u{1E943}\u{1E94B}\u{1E950}-\u{1E959}\u{1E95E}\u{1E95F}\u{1EC71}-\u{1ECB4}\u{1ED01}-\u{1ED3D}\u{1EE00}-\u{1EE03}\u{1EE05}-\u{1EE1F}\u{1EE21}\u{1EE22}\u{1EE24}\u{1EE27}\u{1EE29}-\u{1EE32}\u{1EE34}-\u{1EE37}\u{1EE39}\u{1EE3B}\u{1EE42}\u{1EE47}\u{1EE49}\u{1EE4B}\u{1EE4D}-\u{1EE4F}\u{1EE51}\u{1EE52}\u{1EE54}\u{1EE57}\u{1EE59}\u{1EE5B}\u{1EE5D}\u{1EE5F}\u{1EE61}\u{1EE62}\u{1EE64}\u{1EE67}-\u{1EE6A}\u{1EE6C}-\u{1EE72}\u{1EE74}-\u{1EE77}\u{1EE79}-\u{1EE7C}\u{1EE7E}\u{1EE80}-\u{1EE89}\u{1EE8B}-\u{1EE9B}\u{1EEA1}-\u{1EEA3}\u{1EEA5}-\u{1EEA9}\u{1EEAB}-\u{1EEBB}]/u;
const bidiS1LTR = /[A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02B8\u02BB-\u02C1\u02D0\u02D1\u02E0-\u02E4\u02EE\u0370-\u0373\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0482\u048A-\u052F\u0531-\u0556\u0559-\u0589\u0903-\u0939\u093B\u093D-\u0940\u0949-\u094C\u094E-\u0950\u0958-\u0961\u0964-\u0980\u0982\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD-\u09C0\u09C7\u09C8\u09CB\u09CC\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E1\u09E6-\u09F1\u09F4-\u09FA\u09FC\u09FD\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3E-\u0A40\u0A59-\u0A5C\u0A5E\u0A66-\u0A6F\u0A72-\u0A74\u0A76\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD-\u0AC0\u0AC9\u0ACB\u0ACC\u0AD0\u0AE0\u0AE1\u0AE6-\u0AF0\u0AF9\u0B02\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B3E\u0B40\u0B47\u0B48\u0B4B\u0B4C\u0B57\u0B5C\u0B5D\u0B5F-\u0B61\u0B66-\u0B77\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE\u0BBF\u0BC1\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCC\u0BD0\u0BD7\u0BE6-\u0BF2\u0C01-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C41-\u0C44\u0C58-\u0C5A\u0C60\u0C61\u0C66-\u0C6F\u0C77\u0C7F\u0C80\u0C82-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD-\u0CC4\u0CC6-\u0CC8\u0CCA\u0CCB\u0CD5\u0CD6\u0CDE\u0CE0\u0CE1\u0CE6-\u0CEF\u0CF1\u0CF2\u0D02\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D40\u0D46-\u0D48\u0D4A-\u0D4C\u0D4E\u0D4F\u0D54-\u0D61\u0D66-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCF-\u0DD1\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2-\u0DF4\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E4F-\u0E5B\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00-\u0F17\u0F1A-\u0F34\u0F36\u0F38\u0F3E-\u0F47\u0F49-\u0F6C\u0F7F\u0F85\u0F88-\u0F8C\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE-\u0FDA\u1000-\u102C\u1031\u1038\u103B\u103C\u103F-\u1057\u105A-\u105D\u1061-\u1070\u1075-\u1081\u1083\u1084\u1087-\u108C\u108E-\u109C\u109E-\u10C5\u10C7\u10CD\u10D0-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1360-\u137C\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u167F\u1681-\u169A\u16A0-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1735\u1736\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17B6\u17BE-\u17C5\u17C7\u17C8\u17D4-\u17DA\u17DC\u17E0-\u17E9\u1810-\u1819\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1923-\u1926\u1929-\u192B\u1930\u1931\u1933-\u1938\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A16\u1A19\u1A1A\u1A1E-\u1A55\u1A57\u1A61\u1A63\u1A64\u1A6D-\u1A72\u1A80-\u1A89\u1A90-\u1A99\u1AA0-\u1AAD\u1B04-\u1B33\u1B35\u1B3B\u1B3D-\u1B41\u1B43-\u1B4B\u1B50-\u1B6A\u1B74-\u1B7C\u1B82-\u1BA1\u1BA6\u1BA7\u1BAA\u1BAE-\u1BE5\u1BE7\u1BEA-\u1BEC\u1BEE\u1BF2\u1BF3\u1BFC-\u1C2B\u1C34\u1C35\u1C3B-\u1C49\u1C4D-\u1C88\u1C90-\u1CBA\u1CBD-\u1CC7\u1CD3\u1CE1\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5-\u1CF7\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200E\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u214F\u2160-\u2188\u2336-\u237A\u2395\u249C-\u24E9\u26AC\u2800-\u28FF\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D70\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u302E\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u3190-\u31BA\u31F0-\u321C\u3220-\u324F\u3260-\u327B\u327F-\u32B0\u32C0-\u32CB\u32D0-\u3376\u337B-\u33DD\u33E0-\u33FE\u3400-\u4DB5\u4E00-\u9FEF\uA000-\uA48C\uA4D0-\uA60C\uA610-\uA62B\uA640-\uA66E\uA680-\uA69D\uA6A0-\uA6EF\uA6F2-\uA6F7\uA722-\uA787\uA789-\uA7BF\uA7C2-\uA7C6\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA824\uA827\uA830-\uA837\uA840-\uA873\uA880-\uA8C3\uA8CE-\uA8D9\uA8F2-\uA8FE\uA900-\uA925\uA92E-\uA946\uA952\uA953\uA95F-\uA97C\uA983-\uA9B2\uA9B4\uA9B5\uA9BA\uA9BB\uA9BE-\uA9CD\uA9CF-\uA9D9\uA9DE-\uA9E4\uA9E6-\uA9FE\uAA00-\uAA28\uAA2F\uAA30\uAA33\uAA34\uAA40-\uAA42\uAA44-\uAA4B\uAA4D\uAA50-\uAA59\uAA5C-\uAA7B\uAA7D-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAAEB\uAAEE-\uAAF5\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB67\uAB70-\uABE4\uABE6\uABE7\uABE9-\uABEC\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uD800-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC\u{10000}-\u{1000B}\u{1000D}-\u{10026}\u{10028}-\u{1003A}\u{1003C}\u{1003D}\u{1003F}-\u{1004D}\u{10050}-\u{1005D}\u{10080}-\u{100FA}\u{10100}\u{10102}\u{10107}-\u{10133}\u{10137}-\u{1013F}\u{1018D}\u{1018E}\u{101D0}-\u{101FC}\u{10280}-\u{1029C}\u{102A0}-\u{102D0}\u{10300}-\u{10323}\u{1032D}-\u{1034A}\u{10350}-\u{10375}\u{10380}-\u{1039D}\u{1039F}-\u{103C3}\u{103C8}-\u{103D5}\u{10400}-\u{1049D}\u{104A0}-\u{104A9}\u{104B0}-\u{104D3}\u{104D8}-\u{104FB}\u{10500}-\u{10527}\u{10530}-\u{10563}\u{1056F}\u{10600}-\u{10736}\u{10740}-\u{10755}\u{10760}-\u{10767}\u{11000}\u{11002}-\u{11037}\u{11047}-\u{1104D}\u{11066}-\u{1106F}\u{11082}-\u{110B2}\u{110B7}\u{110B8}\u{110BB}-\u{110C1}\u{110CD}\u{110D0}-\u{110E8}\u{110F0}-\u{110F9}\u{11103}-\u{11126}\u{1112C}\u{11136}-\u{11146}\u{11150}-\u{11172}\u{11174}-\u{11176}\u{11182}-\u{111B5}\u{111BF}-\u{111C8}\u{111CD}\u{111D0}-\u{111DF}\u{111E1}-\u{111F4}\u{11200}-\u{11211}\u{11213}-\u{1122E}\u{11232}\u{11233}\u{11235}\u{11238}-\u{1123D}\u{11280}-\u{11286}\u{11288}\u{1128A}-\u{1128D}\u{1128F}-\u{1129D}\u{1129F}-\u{112A9}\u{112B0}-\u{112DE}\u{112E0}-\u{112E2}\u{112F0}-\u{112F9}\u{11302}\u{11303}\u{11305}-\u{1130C}\u{1130F}\u{11310}\u{11313}-\u{11328}\u{1132A}-\u{11330}\u{11332}\u{11333}\u{11335}-\u{11339}\u{1133D}-\u{1133F}\u{11341}-\u{11344}\u{11347}\u{11348}\u{1134B}-\u{1134D}\u{11350}\u{11357}\u{1135D}-\u{11363}\u{11400}-\u{11437}\u{11440}\u{11441}\u{11445}\u{11447}-\u{11459}\u{1145B}\u{1145D}\u{1145F}\u{11480}-\u{114B2}\u{114B9}\u{114BB}-\u{114BE}\u{114C1}\u{114C4}-\u{114C7}\u{114D0}-\u{114D9}\u{11580}-\u{115B1}\u{115B8}-\u{115BB}\u{115BE}\u{115C1}-\u{115DB}\u{11600}-\u{11632}\u{1163B}\u{1163C}\u{1163E}\u{11641}-\u{11644}\u{11650}-\u{11659}\u{11680}-\u{116AA}\u{116AC}\u{116AE}\u{116AF}\u{116B6}\u{116B8}\u{116C0}-\u{116C9}\u{11700}-\u{1171A}\u{11720}\u{11721}\u{11726}\u{11730}-\u{1173F}\u{11800}-\u{1182E}\u{11838}\u{1183B}\u{118A0}-\u{118F2}\u{118FF}\u{119A0}-\u{119A7}\u{119AA}-\u{119D3}\u{119DC}-\u{119DF}\u{119E1}-\u{119E4}\u{11A00}\u{11A07}\u{11A08}\u{11A0B}-\u{11A32}\u{11A39}\u{11A3A}\u{11A3F}-\u{11A46}\u{11A50}\u{11A57}\u{11A58}\u{11A5C}-\u{11A89}\u{11A97}\u{11A9A}-\u{11AA2}\u{11AC0}-\u{11AF8}\u{11C00}-\u{11C08}\u{11C0A}-\u{11C2F}\u{11C3E}-\u{11C45}\u{11C50}-\u{11C6C}\u{11C70}-\u{11C8F}\u{11CA9}\u{11CB1}\u{11CB4}\u{11D00}-\u{11D06}\u{11D08}\u{11D09}\u{11D0B}-\u{11D30}\u{11D46}\u{11D50}-\u{11D59}\u{11D60}-\u{11D65}\u{11D67}\u{11D68}\u{11D6A}-\u{11D8E}\u{11D93}\u{11D94}\u{11D96}\u{11D98}\u{11DA0}-\u{11DA9}\u{11EE0}-\u{11EF2}\u{11EF5}-\u{11EF8}\u{11FC0}-\u{11FD4}\u{11FFF}-\u{12399}\u{12400}-\u{1246E}\u{12470}-\u{12474}\u{12480}-\u{12543}\u{13000}-\u{1342E}\u{13430}-\u{13438}\u{14400}-\u{14646}\u{16800}-\u{16A38}\u{16A40}-\u{16A5E}\u{16A60}-\u{16A69}\u{16A6E}\u{16A6F}\u{16AD0}-\u{16AED}\u{16AF5}\u{16B00}-\u{16B2F}\u{16B37}-\u{16B45}\u{16B50}-\u{16B59}\u{16B5B}-\u{16B61}\u{16B63}-\u{16B77}\u{16B7D}-\u{16B8F}\u{16E40}-\u{16E9A}\u{16F00}-\u{16F4A}\u{16F50}-\u{16F87}\u{16F93}-\u{16F9F}\u{16FE0}\u{16FE1}\u{16FE3}\u{17000}-\u{187F7}\u{18800}-\u{18AF2}\u{1B000}-\u{1B11E}\u{1B150}-\u{1B152}\u{1B164}-\u{1B167}\u{1B170}-\u{1B2FB}\u{1BC00}-\u{1BC6A}\u{1BC70}-\u{1BC7C}\u{1BC80}-\u{1BC88}\u{1BC90}-\u{1BC99}\u{1BC9C}\u{1BC9F}\u{1D000}-\u{1D0F5}\u{1D100}-\u{1D126}\u{1D129}-\u{1D166}\u{1D16A}-\u{1D172}\u{1D183}\u{1D184}\u{1D18C}-\u{1D1A9}\u{1D1AE}-\u{1D1E8}\u{1D2E0}-\u{1D2F3}\u{1D360}-\u{1D378}\u{1D400}-\u{1D454}\u{1D456}-\u{1D49C}\u{1D49E}\u{1D49F}\u{1D4A2}\u{1D4A5}\u{1D4A6}\u{1D4A9}-\u{1D4AC}\u{1D4AE}-\u{1D4B9}\u{1D4BB}\u{1D4BD}-\u{1D4C3}\u{1D4C5}-\u{1D505}\u{1D507}-\u{1D50A}\u{1D50D}-\u{1D514}\u{1D516}-\u{1D51C}\u{1D51E}-\u{1D539}\u{1D53B}-\u{1D53E}\u{1D540}-\u{1D544}\u{1D546}\u{1D54A}-\u{1D550}\u{1D552}-\u{1D6A5}\u{1D6A8}-\u{1D6DA}\u{1D6DC}-\u{1D714}\u{1D716}-\u{1D74E}\u{1D750}-\u{1D788}\u{1D78A}-\u{1D7C2}\u{1D7C4}-\u{1D7CB}\u{1D800}-\u{1D9FF}\u{1DA37}-\u{1DA3A}\u{1DA6D}-\u{1DA74}\u{1DA76}-\u{1DA83}\u{1DA85}-\u{1DA8B}\u{1E100}-\u{1E12C}\u{1E137}-\u{1E13D}\u{1E140}-\u{1E149}\u{1E14E}\u{1E14F}\u{1E2C0}-\u{1E2EB}\u{1E2F0}-\u{1E2F9}\u{1F110}-\u{1F12E}\u{1F130}-\u{1F169}\u{1F170}-\u{1F1AC}\u{1F1E6}-\u{1F202}\u{1F210}-\u{1F23B}\u{1F240}-\u{1F248}\u{1F250}\u{1F251}\u{20000}-\u{2A6D6}\u{2A700}-\u{2B734}\u{2B740}-\u{2B81D}\u{2B820}-\u{2CEA1}\u{2CEB0}-\u{2EBE0}\u{2F800}-\u{2FA1D}\u{F0000}-\u{FFFFD}\u{100000}-\u{10FFFD}]/u;
const bidiS1RTL = /[\u05BE\u05C0\u05C3\u05C6\u05D0-\u05EA\u05EF-\u05F4\u0608\u060B\u060D\u061B\u061C\u061E-\u064A\u066D-\u066F\u0671-\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u070D\u070F\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07C0-\u07EA\u07F4\u07F5\u07FA\u07FE-\u0815\u081A\u0824\u0828\u0830-\u083E\u0840-\u0858\u085E\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u200F\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBC1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFC\uFE70-\uFE74\uFE76-\uFEFC\u{10800}-\u{10805}\u{10808}\u{1080A}-\u{10835}\u{10837}\u{10838}\u{1083C}\u{1083F}-\u{10855}\u{10857}-\u{1089E}\u{108A7}-\u{108AF}\u{108E0}-\u{108F2}\u{108F4}\u{108F5}\u{108FB}-\u{1091B}\u{10920}-\u{10939}\u{1093F}\u{10980}-\u{109B7}\u{109BC}-\u{109CF}\u{109D2}-\u{10A00}\u{10A10}-\u{10A13}\u{10A15}-\u{10A17}\u{10A19}-\u{10A35}\u{10A40}-\u{10A48}\u{10A50}-\u{10A58}\u{10A60}-\u{10A9F}\u{10AC0}-\u{10AE4}\u{10AEB}-\u{10AF6}\u{10B00}-\u{10B35}\u{10B40}-\u{10B55}\u{10B58}-\u{10B72}\u{10B78}-\u{10B91}\u{10B99}-\u{10B9C}\u{10BA9}-\u{10BAF}\u{10C00}-\u{10C48}\u{10C80}-\u{10CB2}\u{10CC0}-\u{10CF2}\u{10CFA}-\u{10D23}\u{10F00}-\u{10F27}\u{10F30}-\u{10F45}\u{10F51}-\u{10F59}\u{10FE0}-\u{10FF6}\u{1E800}-\u{1E8C4}\u{1E8C7}-\u{1E8CF}\u{1E900}-\u{1E943}\u{1E94B}\u{1E950}-\u{1E959}\u{1E95E}\u{1E95F}\u{1EC71}-\u{1ECB4}\u{1ED01}-\u{1ED3D}\u{1EE00}-\u{1EE03}\u{1EE05}-\u{1EE1F}\u{1EE21}\u{1EE22}\u{1EE24}\u{1EE27}\u{1EE29}-\u{1EE32}\u{1EE34}-\u{1EE37}\u{1EE39}\u{1EE3B}\u{1EE42}\u{1EE47}\u{1EE49}\u{1EE4B}\u{1EE4D}-\u{1EE4F}\u{1EE51}\u{1EE52}\u{1EE54}\u{1EE57}\u{1EE59}\u{1EE5B}\u{1EE5D}\u{1EE5F}\u{1EE61}\u{1EE62}\u{1EE64}\u{1EE67}-\u{1EE6A}\u{1EE6C}-\u{1EE72}\u{1EE74}-\u{1EE77}\u{1EE79}-\u{1EE7C}\u{1EE7E}\u{1EE80}-\u{1EE89}\u{1EE8B}-\u{1EE9B}\u{1EEA1}-\u{1EEA3}\u{1EEA5}-\u{1EEA9}\u{1EEAB}-\u{1EEBB}]/u;
const bidiS2 = /^[\0-\x08\x0E-\x1B!-@\[-`\{-\x84\x86-\xA9\xAB-\xB4\xB6-\xB9\xBB-\xBF\xD7\xF7\u02B9\u02BA\u02C2-\u02CF\u02D2-\u02DF\u02E5-\u02ED\u02EF-\u036F\u0374\u0375\u037E\u0384\u0385\u0387\u03F6\u0483-\u0489\u058A\u058D-\u058F\u0591-\u05C7\u05D0-\u05EA\u05EF-\u05F4\u0600-\u061C\u061E-\u070D\u070F-\u074A\u074D-\u07B1\u07C0-\u07FA\u07FD-\u082D\u0830-\u083E\u0840-\u085B\u085E\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u08D3-\u0902\u093A\u093C\u0941-\u0948\u094D\u0951-\u0957\u0962\u0963\u0981\u09BC\u09C1-\u09C4\u09CD\u09E2\u09E3\u09F2\u09F3\u09FB\u09FE\u0A01\u0A02\u0A3C\u0A41\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81\u0A82\u0ABC\u0AC1-\u0AC5\u0AC7\u0AC8\u0ACD\u0AE2\u0AE3\u0AF1\u0AFA-\u0AFF\u0B01\u0B3C\u0B3F\u0B41-\u0B44\u0B4D\u0B56\u0B62\u0B63\u0B82\u0BC0\u0BCD\u0BF3-\u0BFA\u0C00\u0C04\u0C3E-\u0C40\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C78-\u0C7E\u0C81\u0CBC\u0CCC\u0CCD\u0CE2\u0CE3\u0D00\u0D01\u0D3B\u0D3C\u0D41-\u0D44\u0D4D\u0D62\u0D63\u0DCA\u0DD2-\u0DD4\u0DD6\u0E31\u0E34-\u0E3A\u0E3F\u0E47-\u0E4E\u0EB1\u0EB4-\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39-\u0F3D\u0F71-\u0F7E\u0F80-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102D-\u1030\u1032-\u1037\u1039\u103A\u103D\u103E\u1058\u1059\u105E-\u1060\u1071-\u1074\u1082\u1085\u1086\u108D\u109D\u135D-\u135F\u1390-\u1399\u1400\u169B\u169C\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4\u17B5\u17B7-\u17BD\u17C6\u17C9-\u17D3\u17DB\u17DD\u17F0-\u17F9\u1800-\u180E\u1885\u1886\u18A9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193B\u1940\u1944\u1945\u19DE-\u19FF\u1A17\u1A18\u1A1B\u1A56\u1A58-\u1A5E\u1A60\u1A62\u1A65-\u1A6C\u1A73-\u1A7C\u1A7F\u1AB0-\u1ABE\u1B00-\u1B03\u1B34\u1B36-\u1B3A\u1B3C\u1B42\u1B6B-\u1B73\u1B80\u1B81\u1BA2-\u1BA5\u1BA8\u1BA9\u1BAB-\u1BAD\u1BE6\u1BE8\u1BE9\u1BED\u1BEF-\u1BF1\u1C2C-\u1C33\u1C36\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE0\u1CE2-\u1CE8\u1CED\u1CF4\u1CF8\u1CF9\u1DC0-\u1DF9\u1DFB-\u1DFF\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u200B-\u200D\u200F-\u2027\u202F-\u205E\u2060-\u2064\u206A-\u2070\u2074-\u207E\u2080-\u208E\u20A0-\u20BF\u20D0-\u20F0\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u2150-\u215F\u2189-\u218B\u2190-\u2335\u237B-\u2394\u2396-\u2426\u2440-\u244A\u2460-\u249B\u24EA-\u26AB\u26AD-\u27FF\u2900-\u2B73\u2B76-\u2B95\u2B98-\u2BFF\u2CE5-\u2CEA\u2CEF-\u2CF1\u2CF9-\u2CFF\u2D7F\u2DE0-\u2E4F\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFB\u3001-\u3004\u3008-\u3020\u302A-\u302D\u3030\u3036\u3037\u303D-\u303F\u3099-\u309C\u30A0\u30FB\u31C0-\u31E3\u321D\u321E\u3250-\u325F\u327C-\u327E\u32B1-\u32BF\u32CC-\u32CF\u3377-\u337A\u33DE\u33DF\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA60D-\uA60F\uA66F-\uA67F\uA69E\uA69F\uA6F0\uA6F1\uA700-\uA721\uA788\uA802\uA806\uA80B\uA825\uA826\uA828-\uA82B\uA838\uA839\uA874-\uA877\uA8C4\uA8C5\uA8E0-\uA8F1\uA8FF\uA926-\uA92D\uA947-\uA951\uA980-\uA982\uA9B3\uA9B6-\uA9B9\uA9BC\uA9BD\uA9E5\uAA29-\uAA2E\uAA31\uAA32\uAA35\uAA36\uAA43\uAA4C\uAA7C\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEC\uAAED\uAAF6\uABE5\uABE8\uABED\uFB1D-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBC1\uFBD3-\uFD3F\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFD\uFE00-\uFE19\uFE20-\uFE52\uFE54-\uFE66\uFE68-\uFE6B\uFE70-\uFE74\uFE76-\uFEFC\uFEFF\uFF01-\uFF20\uFF3B-\uFF40\uFF5B-\uFF65\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFF9-\uFFFD\u{10101}\u{10140}-\u{1018C}\u{10190}-\u{1019B}\u{101A0}\u{101FD}\u{102E0}-\u{102FB}\u{10376}-\u{1037A}\u{10800}-\u{10805}\u{10808}\u{1080A}-\u{10835}\u{10837}\u{10838}\u{1083C}\u{1083F}-\u{10855}\u{10857}-\u{1089E}\u{108A7}-\u{108AF}\u{108E0}-\u{108F2}\u{108F4}\u{108F5}\u{108FB}-\u{1091B}\u{1091F}-\u{10939}\u{1093F}\u{10980}-\u{109B7}\u{109BC}-\u{109CF}\u{109D2}-\u{10A03}\u{10A05}\u{10A06}\u{10A0C}-\u{10A13}\u{10A15}-\u{10A17}\u{10A19}-\u{10A35}\u{10A38}-\u{10A3A}\u{10A3F}-\u{10A48}\u{10A50}-\u{10A58}\u{10A60}-\u{10A9F}\u{10AC0}-\u{10AE6}\u{10AEB}-\u{10AF6}\u{10B00}-\u{10B35}\u{10B39}-\u{10B55}\u{10B58}-\u{10B72}\u{10B78}-\u{10B91}\u{10B99}-\u{10B9C}\u{10BA9}-\u{10BAF}\u{10C00}-\u{10C48}\u{10C80}-\u{10CB2}\u{10CC0}-\u{10CF2}\u{10CFA}-\u{10D27}\u{10D30}-\u{10D39}\u{10E60}-\u{10E7E}\u{10F00}-\u{10F27}\u{10F30}-\u{10F59}\u{10FE0}-\u{10FF6}\u{11001}\u{11038}-\u{11046}\u{11052}-\u{11065}\u{1107F}-\u{11081}\u{110B3}-\u{110B6}\u{110B9}\u{110BA}\u{11100}-\u{11102}\u{11127}-\u{1112B}\u{1112D}-\u{11134}\u{11173}\u{11180}\u{11181}\u{111B6}-\u{111BE}\u{111C9}-\u{111CC}\u{1122F}-\u{11231}\u{11234}\u{11236}\u{11237}\u{1123E}\u{112DF}\u{112E3}-\u{112EA}\u{11300}\u{11301}\u{1133B}\u{1133C}\u{11340}\u{11366}-\u{1136C}\u{11370}-\u{11374}\u{11438}-\u{1143F}\u{11442}-\u{11444}\u{11446}\u{1145E}\u{114B3}-\u{114B8}\u{114BA}\u{114BF}\u{114C0}\u{114C2}\u{114C3}\u{115B2}-\u{115B5}\u{115BC}\u{115BD}\u{115BF}\u{115C0}\u{115DC}\u{115DD}\u{11633}-\u{1163A}\u{1163D}\u{1163F}\u{11640}\u{11660}-\u{1166C}\u{116AB}\u{116AD}\u{116B0}-\u{116B5}\u{116B7}\u{1171D}-\u{1171F}\u{11722}-\u{11725}\u{11727}-\u{1172B}\u{1182F}-\u{11837}\u{11839}\u{1183A}\u{119D4}-\u{119D7}\u{119DA}\u{119DB}\u{119E0}\u{11A01}-\u{11A06}\u{11A09}\u{11A0A}\u{11A33}-\u{11A38}\u{11A3B}-\u{11A3E}\u{11A47}\u{11A51}-\u{11A56}\u{11A59}-\u{11A5B}\u{11A8A}-\u{11A96}\u{11A98}\u{11A99}\u{11C30}-\u{11C36}\u{11C38}-\u{11C3D}\u{11C92}-\u{11CA7}\u{11CAA}-\u{11CB0}\u{11CB2}\u{11CB3}\u{11CB5}\u{11CB6}\u{11D31}-\u{11D36}\u{11D3A}\u{11D3C}\u{11D3D}\u{11D3F}-\u{11D45}\u{11D47}\u{11D90}\u{11D91}\u{11D95}\u{11D97}\u{11EF3}\u{11EF4}\u{11FD5}-\u{11FF1}\u{16AF0}-\u{16AF4}\u{16B30}-\u{16B36}\u{16F4F}\u{16F8F}-\u{16F92}\u{16FE2}\u{1BC9D}\u{1BC9E}\u{1BCA0}-\u{1BCA3}\u{1D167}-\u{1D169}\u{1D173}-\u{1D182}\u{1D185}-\u{1D18B}\u{1D1AA}-\u{1D1AD}\u{1D200}-\u{1D245}\u{1D300}-\u{1D356}\u{1D6DB}\u{1D715}\u{1D74F}\u{1D789}\u{1D7C3}\u{1D7CE}-\u{1D7FF}\u{1DA00}-\u{1DA36}\u{1DA3B}-\u{1DA6C}\u{1DA75}\u{1DA84}\u{1DA9B}-\u{1DA9F}\u{1DAA1}-\u{1DAAF}\u{1E000}-\u{1E006}\u{1E008}-\u{1E018}\u{1E01B}-\u{1E021}\u{1E023}\u{1E024}\u{1E026}-\u{1E02A}\u{1E130}-\u{1E136}\u{1E2EC}-\u{1E2EF}\u{1E2FF}\u{1E800}-\u{1E8C4}\u{1E8C7}-\u{1E8D6}\u{1E900}-\u{1E94B}\u{1E950}-\u{1E959}\u{1E95E}\u{1E95F}\u{1EC71}-\u{1ECB4}\u{1ED01}-\u{1ED3D}\u{1EE00}-\u{1EE03}\u{1EE05}-\u{1EE1F}\u{1EE21}\u{1EE22}\u{1EE24}\u{1EE27}\u{1EE29}-\u{1EE32}\u{1EE34}-\u{1EE37}\u{1EE39}\u{1EE3B}\u{1EE42}\u{1EE47}\u{1EE49}\u{1EE4B}\u{1EE4D}-\u{1EE4F}\u{1EE51}\u{1EE52}\u{1EE54}\u{1EE57}\u{1EE59}\u{1EE5B}\u{1EE5D}\u{1EE5F}\u{1EE61}\u{1EE62}\u{1EE64}\u{1EE67}-\u{1EE6A}\u{1EE6C}-\u{1EE72}\u{1EE74}-\u{1EE77}\u{1EE79}-\u{1EE7C}\u{1EE7E}\u{1EE80}-\u{1EE89}\u{1EE8B}-\u{1EE9B}\u{1EEA1}-\u{1EEA3}\u{1EEA5}-\u{1EEA9}\u{1EEAB}-\u{1EEBB}\u{1EEF0}\u{1EEF1}\u{1F000}-\u{1F02B}\u{1F030}-\u{1F093}\u{1F0A0}-\u{1F0AE}\u{1F0B1}-\u{1F0BF}\u{1F0C1}-\u{1F0CF}\u{1F0D1}-\u{1F0F5}\u{1F100}-\u{1F10C}\u{1F12F}\u{1F16A}-\u{1F16C}\u{1F260}-\u{1F265}\u{1F300}-\u{1F6D5}\u{1F6E0}-\u{1F6EC}\u{1F6F0}-\u{1F6FA}\u{1F700}-\u{1F773}\u{1F780}-\u{1F7D8}\u{1F7E0}-\u{1F7EB}\u{1F800}-\u{1F80B}\u{1F810}-\u{1F847}\u{1F850}-\u{1F859}\u{1F860}-\u{1F887}\u{1F890}-\u{1F8AD}\u{1F900}-\u{1F90B}\u{1F90D}-\u{1F971}\u{1F973}-\u{1F976}\u{1F97A}-\u{1F9A2}\u{1F9A5}-\u{1F9AA}\u{1F9AE}-\u{1F9CA}\u{1F9CD}-\u{1FA53}\u{1FA60}-\u{1FA6D}\u{1FA70}-\u{1FA73}\u{1FA78}-\u{1FA7A}\u{1FA80}-\u{1FA82}\u{1FA90}-\u{1FA95}\u{E0001}\u{E0020}-\u{E007F}\u{E0100}-\u{E01EF}]*$/u;
const bidiS3 = /[0-9\xB2\xB3\xB9\u05BE\u05C0\u05C3\u05C6\u05D0-\u05EA\u05EF-\u05F4\u0600-\u0605\u0608\u060B\u060D\u061B\u061C\u061E-\u064A\u0660-\u0669\u066B-\u066F\u0671-\u06D5\u06DD\u06E5\u06E6\u06EE-\u070D\u070F\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07C0-\u07EA\u07F4\u07F5\u07FA\u07FE-\u0815\u081A\u0824\u0828\u0830-\u083E\u0840-\u0858\u085E\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u08E2\u200F\u2070\u2074-\u2079\u2080-\u2089\u2488-\u249B\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBC1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFC\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\u{102E1}-\u{102FB}\u{10800}-\u{10805}\u{10808}\u{1080A}-\u{10835}\u{10837}\u{10838}\u{1083C}\u{1083F}-\u{10855}\u{10857}-\u{1089E}\u{108A7}-\u{108AF}\u{108E0}-\u{108F2}\u{108F4}\u{108F5}\u{108FB}-\u{1091B}\u{10920}-\u{10939}\u{1093F}\u{10980}-\u{109B7}\u{109BC}-\u{109CF}\u{109D2}-\u{10A00}\u{10A10}-\u{10A13}\u{10A15}-\u{10A17}\u{10A19}-\u{10A35}\u{10A40}-\u{10A48}\u{10A50}-\u{10A58}\u{10A60}-\u{10A9F}\u{10AC0}-\u{10AE4}\u{10AEB}-\u{10AF6}\u{10B00}-\u{10B35}\u{10B40}-\u{10B55}\u{10B58}-\u{10B72}\u{10B78}-\u{10B91}\u{10B99}-\u{10B9C}\u{10BA9}-\u{10BAF}\u{10C00}-\u{10C48}\u{10C80}-\u{10CB2}\u{10CC0}-\u{10CF2}\u{10CFA}-\u{10D23}\u{10D30}-\u{10D39}\u{10E60}-\u{10E7E}\u{10F00}-\u{10F27}\u{10F30}-\u{10F45}\u{10F51}-\u{10F59}\u{10FE0}-\u{10FF6}\u{1D7CE}-\u{1D7FF}\u{1E800}-\u{1E8C4}\u{1E8C7}-\u{1E8CF}\u{1E900}-\u{1E943}\u{1E94B}\u{1E950}-\u{1E959}\u{1E95E}\u{1E95F}\u{1EC71}-\u{1ECB4}\u{1ED01}-\u{1ED3D}\u{1EE00}-\u{1EE03}\u{1EE05}-\u{1EE1F}\u{1EE21}\u{1EE22}\u{1EE24}\u{1EE27}\u{1EE29}-\u{1EE32}\u{1EE34}-\u{1EE37}\u{1EE39}\u{1EE3B}\u{1EE42}\u{1EE47}\u{1EE49}\u{1EE4B}\u{1EE4D}-\u{1EE4F}\u{1EE51}\u{1EE52}\u{1EE54}\u{1EE57}\u{1EE59}\u{1EE5B}\u{1EE5D}\u{1EE5F}\u{1EE61}\u{1EE62}\u{1EE64}\u{1EE67}-\u{1EE6A}\u{1EE6C}-\u{1EE72}\u{1EE74}-\u{1EE77}\u{1EE79}-\u{1EE7C}\u{1EE7E}\u{1EE80}-\u{1EE89}\u{1EE8B}-\u{1EE9B}\u{1EEA1}-\u{1EEA3}\u{1EEA5}-\u{1EEA9}\u{1EEAB}-\u{1EEBB}\u{1F100}-\u{1F10A}][\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D3-\u08E1\u08E3-\u0902\u093A\u093C\u0941-\u0948\u094D\u0951-\u0957\u0962\u0963\u0981\u09BC\u09C1-\u09C4\u09CD\u09E2\u09E3\u09FE\u0A01\u0A02\u0A3C\u0A41\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81\u0A82\u0ABC\u0AC1-\u0AC5\u0AC7\u0AC8\u0ACD\u0AE2\u0AE3\u0AFA-\u0AFF\u0B01\u0B3C\u0B3F\u0B41-\u0B44\u0B4D\u0B56\u0B62\u0B63\u0B82\u0BC0\u0BCD\u0C00\u0C04\u0C3E-\u0C40\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81\u0CBC\u0CCC\u0CCD\u0CE2\u0CE3\u0D00\u0D01\u0D3B\u0D3C\u0D41-\u0D44\u0D4D\u0D62\u0D63\u0DCA\u0DD2-\u0DD4\u0DD6\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F71-\u0F7E\u0F80-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102D-\u1030\u1032-\u1037\u1039\u103A\u103D\u103E\u1058\u1059\u105E-\u1060\u1071-\u1074\u1082\u1085\u1086\u108D\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4\u17B5\u17B7-\u17BD\u17C6\u17C9-\u17D3\u17DD\u180B-\u180D\u1885\u1886\u18A9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193B\u1A17\u1A18\u1A1B\u1A56\u1A58-\u1A5E\u1A60\u1A62\u1A65-\u1A6C\u1A73-\u1A7C\u1A7F\u1AB0-\u1ABE\u1B00-\u1B03\u1B34\u1B36-\u1B3A\u1B3C\u1B42\u1B6B-\u1B73\u1B80\u1B81\u1BA2-\u1BA5\u1BA8\u1BA9\u1BAB-\u1BAD\u1BE6\u1BE8\u1BE9\u1BED\u1BEF-\u1BF1\u1C2C-\u1C33\u1C36\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE0\u1CE2-\u1CE8\u1CED\u1CF4\u1CF8\u1CF9\u1DC0-\u1DF9\u1DFB-\u1DFF\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302D\u3099\u309A\uA66F-\uA672\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA825\uA826\uA8C4\uA8C5\uA8E0-\uA8F1\uA8FF\uA926-\uA92D\uA947-\uA951\uA980-\uA982\uA9B3\uA9B6-\uA9B9\uA9BC\uA9BD\uA9E5\uAA29-\uAA2E\uAA31\uAA32\uAA35\uAA36\uAA43\uAA4C\uAA7C\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEC\uAAED\uAAF6\uABE5\uABE8\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\u{101FD}\u{102E0}\u{10376}-\u{1037A}\u{10A01}-\u{10A03}\u{10A05}\u{10A06}\u{10A0C}-\u{10A0F}\u{10A38}-\u{10A3A}\u{10A3F}\u{10AE5}\u{10AE6}\u{10D24}-\u{10D27}\u{10F46}-\u{10F50}\u{11001}\u{11038}-\u{11046}\u{1107F}-\u{11081}\u{110B3}-\u{110B6}\u{110B9}\u{110BA}\u{11100}-\u{11102}\u{11127}-\u{1112B}\u{1112D}-\u{11134}\u{11173}\u{11180}\u{11181}\u{111B6}-\u{111BE}\u{111C9}-\u{111CC}\u{1122F}-\u{11231}\u{11234}\u{11236}\u{11237}\u{1123E}\u{112DF}\u{112E3}-\u{112EA}\u{11300}\u{11301}\u{1133B}\u{1133C}\u{11340}\u{11366}-\u{1136C}\u{11370}-\u{11374}\u{11438}-\u{1143F}\u{11442}-\u{11444}\u{11446}\u{1145E}\u{114B3}-\u{114B8}\u{114BA}\u{114BF}\u{114C0}\u{114C2}\u{114C3}\u{115B2}-\u{115B5}\u{115BC}\u{115BD}\u{115BF}\u{115C0}\u{115DC}\u{115DD}\u{11633}-\u{1163A}\u{1163D}\u{1163F}\u{11640}\u{116AB}\u{116AD}\u{116B0}-\u{116B5}\u{116B7}\u{1171D}-\u{1171F}\u{11722}-\u{11725}\u{11727}-\u{1172B}\u{1182F}-\u{11837}\u{11839}\u{1183A}\u{119D4}-\u{119D7}\u{119DA}\u{119DB}\u{119E0}\u{11A01}-\u{11A06}\u{11A09}\u{11A0A}\u{11A33}-\u{11A38}\u{11A3B}-\u{11A3E}\u{11A47}\u{11A51}-\u{11A56}\u{11A59}-\u{11A5B}\u{11A8A}-\u{11A96}\u{11A98}\u{11A99}\u{11C30}-\u{11C36}\u{11C38}-\u{11C3D}\u{11C92}-\u{11CA7}\u{11CAA}-\u{11CB0}\u{11CB2}\u{11CB3}\u{11CB5}\u{11CB6}\u{11D31}-\u{11D36}\u{11D3A}\u{11D3C}\u{11D3D}\u{11D3F}-\u{11D45}\u{11D47}\u{11D90}\u{11D91}\u{11D95}\u{11D97}\u{11EF3}\u{11EF4}\u{16AF0}-\u{16AF4}\u{16B30}-\u{16B36}\u{16F4F}\u{16F8F}-\u{16F92}\u{1BC9D}\u{1BC9E}\u{1D167}-\u{1D169}\u{1D17B}-\u{1D182}\u{1D185}-\u{1D18B}\u{1D1AA}-\u{1D1AD}\u{1D242}-\u{1D244}\u{1DA00}-\u{1DA36}\u{1DA3B}-\u{1DA6C}\u{1DA75}\u{1DA84}\u{1DA9B}-\u{1DA9F}\u{1DAA1}-\u{1DAAF}\u{1E000}-\u{1E006}\u{1E008}-\u{1E018}\u{1E01B}-\u{1E021}\u{1E023}\u{1E024}\u{1E026}-\u{1E02A}\u{1E130}-\u{1E136}\u{1E2EC}-\u{1E2EF}\u{1E8D0}-\u{1E8D6}\u{1E944}-\u{1E94A}\u{E0100}-\u{E01EF}]*$/u;
const bidiS4EN = /[0-9\xB2\xB3\xB9\u06F0-\u06F9\u2070\u2074-\u2079\u2080-\u2089\u2488-\u249B\uFF10-\uFF19\u{102E1}-\u{102FB}\u{1D7CE}-\u{1D7FF}\u{1F100}-\u{1F10A}]/u;
const bidiS4AN = /[\u0600-\u0605\u0660-\u0669\u066B\u066C\u06DD\u08E2\u{10D30}-\u{10D39}\u{10E60}-\u{10E7E}]/u;
const bidiS5 = /^[\0-\x08\x0E-\x1B!-\x84\x86-\u0377\u037A-\u037F\u0384-\u038A\u038C\u038E-\u03A1\u03A3-\u052F\u0531-\u0556\u0559-\u058A\u058D-\u058F\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0606\u0607\u0609\u060A\u060C\u060E-\u061A\u064B-\u065F\u066A\u0670\u06D6-\u06DC\u06DE-\u06E4\u06E7-\u06ED\u06F0-\u06F9\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u07F6-\u07F9\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D3-\u08E1\u08E3-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09FE\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A76\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AF1\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B77\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BFA\u0C00-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C77-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D00-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4F\u0D54-\u0D63\u0D66-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2-\u0DF4\u0E01-\u0E3A\u0E3F-\u0E5B\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00-\u0F47\u0F49-\u0F6C\u0F71-\u0F97\u0F99-\u0FBC\u0FBE-\u0FCC\u0FCE-\u0FDA\u1000-\u10C5\u10C7\u10CD\u10D0-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u137C\u1380-\u1399\u13A0-\u13F5\u13F8-\u13FD\u1400-\u167F\u1681-\u169C\u16A0-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1736\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17DD\u17E0-\u17E9\u17F0-\u17F9\u1800-\u180E\u1810-\u1819\u1820-\u1878\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1940\u1944-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u19DE-\u1A1B\u1A1E-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA0-\u1AAD\u1AB0-\u1ABE\u1B00-\u1B4B\u1B50-\u1B7C\u1B80-\u1BF3\u1BFC-\u1C37\u1C3B-\u1C49\u1C4D-\u1C88\u1C90-\u1CBA\u1CBD-\u1CC7\u1CD0-\u1CFA\u1D00-\u1DF9\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FC4\u1FC6-\u1FD3\u1FD6-\u1FDB\u1FDD-\u1FEF\u1FF2-\u1FF4\u1FF6-\u1FFE\u200B-\u200E\u2010-\u2027\u202F-\u205E\u2060-\u2064\u206A-\u2071\u2074-\u208E\u2090-\u209C\u20A0-\u20BF\u20D0-\u20F0\u2100-\u218B\u2190-\u2426\u2440-\u244A\u2460-\u2B73\u2B76-\u2B95\u2B98-\u2C2E\u2C30-\u2C5E\u2C60-\u2CF3\u2CF9-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D70\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2E4F\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFB\u3001-\u303F\u3041-\u3096\u3099-\u30FF\u3105-\u312F\u3131-\u318E\u3190-\u31BA\u31C0-\u31E3\u31F0-\u321E\u3220-\u4DB5\u4DC0-\u9FEF\uA000-\uA48C\uA490-\uA4C6\uA4D0-\uA62B\uA640-\uA6F7\uA700-\uA7BF\uA7C2-\uA7C6\uA7F7-\uA82B\uA830-\uA839\uA840-\uA877\uA880-\uA8C5\uA8CE-\uA8D9\uA8E0-\uA953\uA95F-\uA97C\uA980-\uA9CD\uA9CF-\uA9D9\uA9DE-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA5C-\uAAC2\uAADB-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB67\uAB70-\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uD800-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1E\uFB29\uFD3E\uFD3F\uFDFD\uFE00-\uFE19\uFE20-\uFE52\uFE54-\uFE66\uFE68-\uFE6B\uFEFF\uFF01-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFF9-\uFFFD\u{10000}-\u{1000B}\u{1000D}-\u{10026}\u{10028}-\u{1003A}\u{1003C}\u{1003D}\u{1003F}-\u{1004D}\u{10050}-\u{1005D}\u{10080}-\u{100FA}\u{10100}-\u{10102}\u{10107}-\u{10133}\u{10137}-\u{1018E}\u{10190}-\u{1019B}\u{101A0}\u{101D0}-\u{101FD}\u{10280}-\u{1029C}\u{102A0}-\u{102D0}\u{102E0}-\u{102FB}\u{10300}-\u{10323}\u{1032D}-\u{1034A}\u{10350}-\u{1037A}\u{10380}-\u{1039D}\u{1039F}-\u{103C3}\u{103C8}-\u{103D5}\u{10400}-\u{1049D}\u{104A0}-\u{104A9}\u{104B0}-\u{104D3}\u{104D8}-\u{104FB}\u{10500}-\u{10527}\u{10530}-\u{10563}\u{1056F}\u{10600}-\u{10736}\u{10740}-\u{10755}\u{10760}-\u{10767}\u{1091F}\u{10A01}-\u{10A03}\u{10A05}\u{10A06}\u{10A0C}-\u{10A0F}\u{10A38}-\u{10A3A}\u{10A3F}\u{10AE5}\u{10AE6}\u{10B39}-\u{10B3F}\u{10D24}-\u{10D27}\u{10F46}-\u{10F50}\u{11000}-\u{1104D}\u{11052}-\u{1106F}\u{1107F}-\u{110C1}\u{110CD}\u{110D0}-\u{110E8}\u{110F0}-\u{110F9}\u{11100}-\u{11134}\u{11136}-\u{11146}\u{11150}-\u{11176}\u{11180}-\u{111CD}\u{111D0}-\u{111DF}\u{111E1}-\u{111F4}\u{11200}-\u{11211}\u{11213}-\u{1123E}\u{11280}-\u{11286}\u{11288}\u{1128A}-\u{1128D}\u{1128F}-\u{1129D}\u{1129F}-\u{112A9}\u{112B0}-\u{112EA}\u{112F0}-\u{112F9}\u{11300}-\u{11303}\u{11305}-\u{1130C}\u{1130F}\u{11310}\u{11313}-\u{11328}\u{1132A}-\u{11330}\u{11332}\u{11333}\u{11335}-\u{11339}\u{1133B}-\u{11344}\u{11347}\u{11348}\u{1134B}-\u{1134D}\u{11350}\u{11357}\u{1135D}-\u{11363}\u{11366}-\u{1136C}\u{11370}-\u{11374}\u{11400}-\u{11459}\u{1145B}\u{1145D}-\u{1145F}\u{11480}-\u{114C7}\u{114D0}-\u{114D9}\u{11580}-\u{115B5}\u{115B8}-\u{115DD}\u{11600}-\u{11644}\u{11650}-\u{11659}\u{11660}-\u{1166C}\u{11680}-\u{116B8}\u{116C0}-\u{116C9}\u{11700}-\u{1171A}\u{1171D}-\u{1172B}\u{11730}-\u{1173F}\u{11800}-\u{1183B}\u{118A0}-\u{118F2}\u{118FF}\u{119A0}-\u{119A7}\u{119AA}-\u{119D7}\u{119DA}-\u{119E4}\u{11A00}-\u{11A47}\u{11A50}-\u{11AA2}\u{11AC0}-\u{11AF8}\u{11C00}-\u{11C08}\u{11C0A}-\u{11C36}\u{11C38}-\u{11C45}\u{11C50}-\u{11C6C}\u{11C70}-\u{11C8F}\u{11C92}-\u{11CA7}\u{11CA9}-\u{11CB6}\u{11D00}-\u{11D06}\u{11D08}\u{11D09}\u{11D0B}-\u{11D36}\u{11D3A}\u{11D3C}\u{11D3D}\u{11D3F}-\u{11D47}\u{11D50}-\u{11D59}\u{11D60}-\u{11D65}\u{11D67}\u{11D68}\u{11D6A}-\u{11D8E}\u{11D90}\u{11D91}\u{11D93}-\u{11D98}\u{11DA0}-\u{11DA9}\u{11EE0}-\u{11EF8}\u{11FC0}-\u{11FF1}\u{11FFF}-\u{12399}\u{12400}-\u{1246E}\u{12470}-\u{12474}\u{12480}-\u{12543}\u{13000}-\u{1342E}\u{13430}-\u{13438}\u{14400}-\u{14646}\u{16800}-\u{16A38}\u{16A40}-\u{16A5E}\u{16A60}-\u{16A69}\u{16A6E}\u{16A6F}\u{16AD0}-\u{16AED}\u{16AF0}-\u{16AF5}\u{16B00}-\u{16B45}\u{16B50}-\u{16B59}\u{16B5B}-\u{16B61}\u{16B63}-\u{16B77}\u{16B7D}-\u{16B8F}\u{16E40}-\u{16E9A}\u{16F00}-\u{16F4A}\u{16F4F}-\u{16F87}\u{16F8F}-\u{16F9F}\u{16FE0}-\u{16FE3}\u{17000}-\u{187F7}\u{18800}-\u{18AF2}\u{1B000}-\u{1B11E}\u{1B150}-\u{1B152}\u{1B164}-\u{1B167}\u{1B170}-\u{1B2FB}\u{1BC00}-\u{1BC6A}\u{1BC70}-\u{1BC7C}\u{1BC80}-\u{1BC88}\u{1BC90}-\u{1BC99}\u{1BC9C}-\u{1BCA3}\u{1D000}-\u{1D0F5}\u{1D100}-\u{1D126}\u{1D129}-\u{1D1E8}\u{1D200}-\u{1D245}\u{1D2E0}-\u{1D2F3}\u{1D300}-\u{1D356}\u{1D360}-\u{1D378}\u{1D400}-\u{1D454}\u{1D456}-\u{1D49C}\u{1D49E}\u{1D49F}\u{1D4A2}\u{1D4A5}\u{1D4A6}\u{1D4A9}-\u{1D4AC}\u{1D4AE}-\u{1D4B9}\u{1D4BB}\u{1D4BD}-\u{1D4C3}\u{1D4C5}-\u{1D505}\u{1D507}-\u{1D50A}\u{1D50D}-\u{1D514}\u{1D516}-\u{1D51C}\u{1D51E}-\u{1D539}\u{1D53B}-\u{1D53E}\u{1D540}-\u{1D544}\u{1D546}\u{1D54A}-\u{1D550}\u{1D552}-\u{1D6A5}\u{1D6A8}-\u{1D7CB}\u{1D7CE}-\u{1DA8B}\u{1DA9B}-\u{1DA9F}\u{1DAA1}-\u{1DAAF}\u{1E000}-\u{1E006}\u{1E008}-\u{1E018}\u{1E01B}-\u{1E021}\u{1E023}\u{1E024}\u{1E026}-\u{1E02A}\u{1E100}-\u{1E12C}\u{1E130}-\u{1E13D}\u{1E140}-\u{1E149}\u{1E14E}\u{1E14F}\u{1E2C0}-\u{1E2F9}\u{1E2FF}\u{1E8D0}-\u{1E8D6}\u{1E944}-\u{1E94A}\u{1EEF0}\u{1EEF1}\u{1F000}-\u{1F02B}\u{1F030}-\u{1F093}\u{1F0A0}-\u{1F0AE}\u{1F0B1}-\u{1F0BF}\u{1F0C1}-\u{1F0CF}\u{1F0D1}-\u{1F0F5}\u{1F100}-\u{1F10C}\u{1F110}-\u{1F16C}\u{1F170}-\u{1F1AC}\u{1F1E6}-\u{1F202}\u{1F210}-\u{1F23B}\u{1F240}-\u{1F248}\u{1F250}\u{1F251}\u{1F260}-\u{1F265}\u{1F300}-\u{1F6D5}\u{1F6E0}-\u{1F6EC}\u{1F6F0}-\u{1F6FA}\u{1F700}-\u{1F773}\u{1F780}-\u{1F7D8}\u{1F7E0}-\u{1F7EB}\u{1F800}-\u{1F80B}\u{1F810}-\u{1F847}\u{1F850}-\u{1F859}\u{1F860}-\u{1F887}\u{1F890}-\u{1F8AD}\u{1F900}-\u{1F90B}\u{1F90D}-\u{1F971}\u{1F973}-\u{1F976}\u{1F97A}-\u{1F9A2}\u{1F9A5}-\u{1F9AA}\u{1F9AE}-\u{1F9CA}\u{1F9CD}-\u{1FA53}\u{1FA60}-\u{1FA6D}\u{1FA70}-\u{1FA73}\u{1FA78}-\u{1FA7A}\u{1FA80}-\u{1FA82}\u{1FA90}-\u{1FA95}\u{20000}-\u{2A6D6}\u{2A700}-\u{2B734}\u{2B740}-\u{2B81D}\u{2B820}-\u{2CEA1}\u{2CEB0}-\u{2EBE0}\u{2F800}-\u{2FA1D}\u{E0001}\u{E0020}-\u{E007F}\u{E0100}-\u{E01EF}\u{F0000}-\u{FFFFD}\u{100000}-\u{10FFFD}]*$/u;
const bidiS6 = /[0-9A-Za-z\xAA\xB2\xB3\xB5\xB9\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02B8\u02BB-\u02C1\u02D0\u02D1\u02E0-\u02E4\u02EE\u0370-\u0373\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0482\u048A-\u052F\u0531-\u0556\u0559-\u0589\u06F0-\u06F9\u0903-\u0939\u093B\u093D-\u0940\u0949-\u094C\u094E-\u0950\u0958-\u0961\u0964-\u0980\u0982\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD-\u09C0\u09C7\u09C8\u09CB\u09CC\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E1\u09E6-\u09F1\u09F4-\u09FA\u09FC\u09FD\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3E-\u0A40\u0A59-\u0A5C\u0A5E\u0A66-\u0A6F\u0A72-\u0A74\u0A76\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD-\u0AC0\u0AC9\u0ACB\u0ACC\u0AD0\u0AE0\u0AE1\u0AE6-\u0AF0\u0AF9\u0B02\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B3E\u0B40\u0B47\u0B48\u0B4B\u0B4C\u0B57\u0B5C\u0B5D\u0B5F-\u0B61\u0B66-\u0B77\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE\u0BBF\u0BC1\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCC\u0BD0\u0BD7\u0BE6-\u0BF2\u0C01-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C41-\u0C44\u0C58-\u0C5A\u0C60\u0C61\u0C66-\u0C6F\u0C77\u0C7F\u0C80\u0C82-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD-\u0CC4\u0CC6-\u0CC8\u0CCA\u0CCB\u0CD5\u0CD6\u0CDE\u0CE0\u0CE1\u0CE6-\u0CEF\u0CF1\u0CF2\u0D02\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D40\u0D46-\u0D48\u0D4A-\u0D4C\u0D4E\u0D4F\u0D54-\u0D61\u0D66-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCF-\u0DD1\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2-\u0DF4\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E4F-\u0E5B\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00-\u0F17\u0F1A-\u0F34\u0F36\u0F38\u0F3E-\u0F47\u0F49-\u0F6C\u0F7F\u0F85\u0F88-\u0F8C\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE-\u0FDA\u1000-\u102C\u1031\u1038\u103B\u103C\u103F-\u1057\u105A-\u105D\u1061-\u1070\u1075-\u1081\u1083\u1084\u1087-\u108C\u108E-\u109C\u109E-\u10C5\u10C7\u10CD\u10D0-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1360-\u137C\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u167F\u1681-\u169A\u16A0-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1735\u1736\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17B6\u17BE-\u17C5\u17C7\u17C8\u17D4-\u17DA\u17DC\u17E0-\u17E9\u1810-\u1819\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1923-\u1926\u1929-\u192B\u1930\u1931\u1933-\u1938\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A16\u1A19\u1A1A\u1A1E-\u1A55\u1A57\u1A61\u1A63\u1A64\u1A6D-\u1A72\u1A80-\u1A89\u1A90-\u1A99\u1AA0-\u1AAD\u1B04-\u1B33\u1B35\u1B3B\u1B3D-\u1B41\u1B43-\u1B4B\u1B50-\u1B6A\u1B74-\u1B7C\u1B82-\u1BA1\u1BA6\u1BA7\u1BAA\u1BAE-\u1BE5\u1BE7\u1BEA-\u1BEC\u1BEE\u1BF2\u1BF3\u1BFC-\u1C2B\u1C34\u1C35\u1C3B-\u1C49\u1C4D-\u1C88\u1C90-\u1CBA\u1CBD-\u1CC7\u1CD3\u1CE1\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5-\u1CF7\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200E\u2070\u2071\u2074-\u2079\u207F-\u2089\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u214F\u2160-\u2188\u2336-\u237A\u2395\u2488-\u24E9\u26AC\u2800-\u28FF\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D70\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u302E\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u3190-\u31BA\u31F0-\u321C\u3220-\u324F\u3260-\u327B\u327F-\u32B0\u32C0-\u32CB\u32D0-\u3376\u337B-\u33DD\u33E0-\u33FE\u3400-\u4DB5\u4E00-\u9FEF\uA000-\uA48C\uA4D0-\uA60C\uA610-\uA62B\uA640-\uA66E\uA680-\uA69D\uA6A0-\uA6EF\uA6F2-\uA6F7\uA722-\uA787\uA789-\uA7BF\uA7C2-\uA7C6\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA824\uA827\uA830-\uA837\uA840-\uA873\uA880-\uA8C3\uA8CE-\uA8D9\uA8F2-\uA8FE\uA900-\uA925\uA92E-\uA946\uA952\uA953\uA95F-\uA97C\uA983-\uA9B2\uA9B4\uA9B5\uA9BA\uA9BB\uA9BE-\uA9CD\uA9CF-\uA9D9\uA9DE-\uA9E4\uA9E6-\uA9FE\uAA00-\uAA28\uAA2F\uAA30\uAA33\uAA34\uAA40-\uAA42\uAA44-\uAA4B\uAA4D\uAA50-\uAA59\uAA5C-\uAA7B\uAA7D-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAAEB\uAAEE-\uAAF5\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB67\uAB70-\uABE4\uABE6\uABE7\uABE9-\uABEC\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uD800-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC\u{10000}-\u{1000B}\u{1000D}-\u{10026}\u{10028}-\u{1003A}\u{1003C}\u{1003D}\u{1003F}-\u{1004D}\u{10050}-\u{1005D}\u{10080}-\u{100FA}\u{10100}\u{10102}\u{10107}-\u{10133}\u{10137}-\u{1013F}\u{1018D}\u{1018E}\u{101D0}-\u{101FC}\u{10280}-\u{1029C}\u{102A0}-\u{102D0}\u{102E1}-\u{102FB}\u{10300}-\u{10323}\u{1032D}-\u{1034A}\u{10350}-\u{10375}\u{10380}-\u{1039D}\u{1039F}-\u{103C3}\u{103C8}-\u{103D5}\u{10400}-\u{1049D}\u{104A0}-\u{104A9}\u{104B0}-\u{104D3}\u{104D8}-\u{104FB}\u{10500}-\u{10527}\u{10530}-\u{10563}\u{1056F}\u{10600}-\u{10736}\u{10740}-\u{10755}\u{10760}-\u{10767}\u{11000}\u{11002}-\u{11037}\u{11047}-\u{1104D}\u{11066}-\u{1106F}\u{11082}-\u{110B2}\u{110B7}\u{110B8}\u{110BB}-\u{110C1}\u{110CD}\u{110D0}-\u{110E8}\u{110F0}-\u{110F9}\u{11103}-\u{11126}\u{1112C}\u{11136}-\u{11146}\u{11150}-\u{11172}\u{11174}-\u{11176}\u{11182}-\u{111B5}\u{111BF}-\u{111C8}\u{111CD}\u{111D0}-\u{111DF}\u{111E1}-\u{111F4}\u{11200}-\u{11211}\u{11213}-\u{1122E}\u{11232}\u{11233}\u{11235}\u{11238}-\u{1123D}\u{11280}-\u{11286}\u{11288}\u{1128A}-\u{1128D}\u{1128F}-\u{1129D}\u{1129F}-\u{112A9}\u{112B0}-\u{112DE}\u{112E0}-\u{112E2}\u{112F0}-\u{112F9}\u{11302}\u{11303}\u{11305}-\u{1130C}\u{1130F}\u{11310}\u{11313}-\u{11328}\u{1132A}-\u{11330}\u{11332}\u{11333}\u{11335}-\u{11339}\u{1133D}-\u{1133F}\u{11341}-\u{11344}\u{11347}\u{11348}\u{1134B}-\u{1134D}\u{11350}\u{11357}\u{1135D}-\u{11363}\u{11400}-\u{11437}\u{11440}\u{11441}\u{11445}\u{11447}-\u{11459}\u{1145B}\u{1145D}\u{1145F}\u{11480}-\u{114B2}\u{114B9}\u{114BB}-\u{114BE}\u{114C1}\u{114C4}-\u{114C7}\u{114D0}-\u{114D9}\u{11580}-\u{115B1}\u{115B8}-\u{115BB}\u{115BE}\u{115C1}-\u{115DB}\u{11600}-\u{11632}\u{1163B}\u{1163C}\u{1163E}\u{11641}-\u{11644}\u{11650}-\u{11659}\u{11680}-\u{116AA}\u{116AC}\u{116AE}\u{116AF}\u{116B6}\u{116B8}\u{116C0}-\u{116C9}\u{11700}-\u{1171A}\u{11720}\u{11721}\u{11726}\u{11730}-\u{1173F}\u{11800}-\u{1182E}\u{11838}\u{1183B}\u{118A0}-\u{118F2}\u{118FF}\u{119A0}-\u{119A7}\u{119AA}-\u{119D3}\u{119DC}-\u{119DF}\u{119E1}-\u{119E4}\u{11A00}\u{11A07}\u{11A08}\u{11A0B}-\u{11A32}\u{11A39}\u{11A3A}\u{11A3F}-\u{11A46}\u{11A50}\u{11A57}\u{11A58}\u{11A5C}-\u{11A89}\u{11A97}\u{11A9A}-\u{11AA2}\u{11AC0}-\u{11AF8}\u{11C00}-\u{11C08}\u{11C0A}-\u{11C2F}\u{11C3E}-\u{11C45}\u{11C50}-\u{11C6C}\u{11C70}-\u{11C8F}\u{11CA9}\u{11CB1}\u{11CB4}\u{11D00}-\u{11D06}\u{11D08}\u{11D09}\u{11D0B}-\u{11D30}\u{11D46}\u{11D50}-\u{11D59}\u{11D60}-\u{11D65}\u{11D67}\u{11D68}\u{11D6A}-\u{11D8E}\u{11D93}\u{11D94}\u{11D96}\u{11D98}\u{11DA0}-\u{11DA9}\u{11EE0}-\u{11EF2}\u{11EF5}-\u{11EF8}\u{11FC0}-\u{11FD4}\u{11FFF}-\u{12399}\u{12400}-\u{1246E}\u{12470}-\u{12474}\u{12480}-\u{12543}\u{13000}-\u{1342E}\u{13430}-\u{13438}\u{14400}-\u{14646}\u{16800}-\u{16A38}\u{16A40}-\u{16A5E}\u{16A60}-\u{16A69}\u{16A6E}\u{16A6F}\u{16AD0}-\u{16AED}\u{16AF5}\u{16B00}-\u{16B2F}\u{16B37}-\u{16B45}\u{16B50}-\u{16B59}\u{16B5B}-\u{16B61}\u{16B63}-\u{16B77}\u{16B7D}-\u{16B8F}\u{16E40}-\u{16E9A}\u{16F00}-\u{16F4A}\u{16F50}-\u{16F87}\u{16F93}-\u{16F9F}\u{16FE0}\u{16FE1}\u{16FE3}\u{17000}-\u{187F7}\u{18800}-\u{18AF2}\u{1B000}-\u{1B11E}\u{1B150}-\u{1B152}\u{1B164}-\u{1B167}\u{1B170}-\u{1B2FB}\u{1BC00}-\u{1BC6A}\u{1BC70}-\u{1BC7C}\u{1BC80}-\u{1BC88}\u{1BC90}-\u{1BC99}\u{1BC9C}\u{1BC9F}\u{1D000}-\u{1D0F5}\u{1D100}-\u{1D126}\u{1D129}-\u{1D166}\u{1D16A}-\u{1D172}\u{1D183}\u{1D184}\u{1D18C}-\u{1D1A9}\u{1D1AE}-\u{1D1E8}\u{1D2E0}-\u{1D2F3}\u{1D360}-\u{1D378}\u{1D400}-\u{1D454}\u{1D456}-\u{1D49C}\u{1D49E}\u{1D49F}\u{1D4A2}\u{1D4A5}\u{1D4A6}\u{1D4A9}-\u{1D4AC}\u{1D4AE}-\u{1D4B9}\u{1D4BB}\u{1D4BD}-\u{1D4C3}\u{1D4C5}-\u{1D505}\u{1D507}-\u{1D50A}\u{1D50D}-\u{1D514}\u{1D516}-\u{1D51C}\u{1D51E}-\u{1D539}\u{1D53B}-\u{1D53E}\u{1D540}-\u{1D544}\u{1D546}\u{1D54A}-\u{1D550}\u{1D552}-\u{1D6A5}\u{1D6A8}-\u{1D6DA}\u{1D6DC}-\u{1D714}\u{1D716}-\u{1D74E}\u{1D750}-\u{1D788}\u{1D78A}-\u{1D7C2}\u{1D7C4}-\u{1D7CB}\u{1D7CE}-\u{1D9FF}\u{1DA37}-\u{1DA3A}\u{1DA6D}-\u{1DA74}\u{1DA76}-\u{1DA83}\u{1DA85}-\u{1DA8B}\u{1E100}-\u{1E12C}\u{1E137}-\u{1E13D}\u{1E140}-\u{1E149}\u{1E14E}\u{1E14F}\u{1E2C0}-\u{1E2EB}\u{1E2F0}-\u{1E2F9}\u{1F100}-\u{1F10A}\u{1F110}-\u{1F12E}\u{1F130}-\u{1F169}\u{1F170}-\u{1F1AC}\u{1F1E6}-\u{1F202}\u{1F210}-\u{1F23B}\u{1F240}-\u{1F248}\u{1F250}\u{1F251}\u{20000}-\u{2A6D6}\u{2A700}-\u{2B734}\u{2B740}-\u{2B81D}\u{2B820}-\u{2CEA1}\u{2CEB0}-\u{2EBE0}\u{2F800}-\u{2FA1D}\u{F0000}-\u{FFFFD}\u{100000}-\u{10FFFD}][\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D3-\u08E1\u08E3-\u0902\u093A\u093C\u0941-\u0948\u094D\u0951-\u0957\u0962\u0963\u0981\u09BC\u09C1-\u09C4\u09CD\u09E2\u09E3\u09FE\u0A01\u0A02\u0A3C\u0A41\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81\u0A82\u0ABC\u0AC1-\u0AC5\u0AC7\u0AC8\u0ACD\u0AE2\u0AE3\u0AFA-\u0AFF\u0B01\u0B3C\u0B3F\u0B41-\u0B44\u0B4D\u0B56\u0B62\u0B63\u0B82\u0BC0\u0BCD\u0C00\u0C04\u0C3E-\u0C40\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81\u0CBC\u0CCC\u0CCD\u0CE2\u0CE3\u0D00\u0D01\u0D3B\u0D3C\u0D41-\u0D44\u0D4D\u0D62\u0D63\u0DCA\u0DD2-\u0DD4\u0DD6\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F71-\u0F7E\u0F80-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102D-\u1030\u1032-\u1037\u1039\u103A\u103D\u103E\u1058\u1059\u105E-\u1060\u1071-\u1074\u1082\u1085\u1086\u108D\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4\u17B5\u17B7-\u17BD\u17C6\u17C9-\u17D3\u17DD\u180B-\u180D\u1885\u1886\u18A9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193B\u1A17\u1A18\u1A1B\u1A56\u1A58-\u1A5E\u1A60\u1A62\u1A65-\u1A6C\u1A73-\u1A7C\u1A7F\u1AB0-\u1ABE\u1B00-\u1B03\u1B34\u1B36-\u1B3A\u1B3C\u1B42\u1B6B-\u1B73\u1B80\u1B81\u1BA2-\u1BA5\u1BA8\u1BA9\u1BAB-\u1BAD\u1BE6\u1BE8\u1BE9\u1BED\u1BEF-\u1BF1\u1C2C-\u1C33\u1C36\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE0\u1CE2-\u1CE8\u1CED\u1CF4\u1CF8\u1CF9\u1DC0-\u1DF9\u1DFB-\u1DFF\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302D\u3099\u309A\uA66F-\uA672\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA825\uA826\uA8C4\uA8C5\uA8E0-\uA8F1\uA8FF\uA926-\uA92D\uA947-\uA951\uA980-\uA982\uA9B3\uA9B6-\uA9B9\uA9BC\uA9BD\uA9E5\uAA29-\uAA2E\uAA31\uAA32\uAA35\uAA36\uAA43\uAA4C\uAA7C\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEC\uAAED\uAAF6\uABE5\uABE8\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\u{101FD}\u{102E0}\u{10376}-\u{1037A}\u{10A01}-\u{10A03}\u{10A05}\u{10A06}\u{10A0C}-\u{10A0F}\u{10A38}-\u{10A3A}\u{10A3F}\u{10AE5}\u{10AE6}\u{10D24}-\u{10D27}\u{10F46}-\u{10F50}\u{11001}\u{11038}-\u{11046}\u{1107F}-\u{11081}\u{110B3}-\u{110B6}\u{110B9}\u{110BA}\u{11100}-\u{11102}\u{11127}-\u{1112B}\u{1112D}-\u{11134}\u{11173}\u{11180}\u{11181}\u{111B6}-\u{111BE}\u{111C9}-\u{111CC}\u{1122F}-\u{11231}\u{11234}\u{11236}\u{11237}\u{1123E}\u{112DF}\u{112E3}-\u{112EA}\u{11300}\u{11301}\u{1133B}\u{1133C}\u{11340}\u{11366}-\u{1136C}\u{11370}-\u{11374}\u{11438}-\u{1143F}\u{11442}-\u{11444}\u{11446}\u{1145E}\u{114B3}-\u{114B8}\u{114BA}\u{114BF}\u{114C0}\u{114C2}\u{114C3}\u{115B2}-\u{115B5}\u{115BC}\u{115BD}\u{115BF}\u{115C0}\u{115DC}\u{115DD}\u{11633}-\u{1163A}\u{1163D}\u{1163F}\u{11640}\u{116AB}\u{116AD}\u{116B0}-\u{116B5}\u{116B7}\u{1171D}-\u{1171F}\u{11722}-\u{11725}\u{11727}-\u{1172B}\u{1182F}-\u{11837}\u{11839}\u{1183A}\u{119D4}-\u{119D7}\u{119DA}\u{119DB}\u{119E0}\u{11A01}-\u{11A06}\u{11A09}\u{11A0A}\u{11A33}-\u{11A38}\u{11A3B}-\u{11A3E}\u{11A47}\u{11A51}-\u{11A56}\u{11A59}-\u{11A5B}\u{11A8A}-\u{11A96}\u{11A98}\u{11A99}\u{11C30}-\u{11C36}\u{11C38}-\u{11C3D}\u{11C92}-\u{11CA7}\u{11CAA}-\u{11CB0}\u{11CB2}\u{11CB3}\u{11CB5}\u{11CB6}\u{11D31}-\u{11D36}\u{11D3A}\u{11D3C}\u{11D3D}\u{11D3F}-\u{11D45}\u{11D47}\u{11D90}\u{11D91}\u{11D95}\u{11D97}\u{11EF3}\u{11EF4}\u{16AF0}-\u{16AF4}\u{16B30}-\u{16B36}\u{16F4F}\u{16F8F}-\u{16F92}\u{1BC9D}\u{1BC9E}\u{1D167}-\u{1D169}\u{1D17B}-\u{1D182}\u{1D185}-\u{1D18B}\u{1D1AA}-\u{1D1AD}\u{1D242}-\u{1D244}\u{1DA00}-\u{1DA36}\u{1DA3B}-\u{1DA6C}\u{1DA75}\u{1DA84}\u{1DA9B}-\u{1DA9F}\u{1DAA1}-\u{1DAAF}\u{1E000}-\u{1E006}\u{1E008}-\u{1E018}\u{1E01B}-\u{1E021}\u{1E023}\u{1E024}\u{1E026}-\u{1E02A}\u{1E130}-\u{1E136}\u{1E2EC}-\u{1E2EF}\u{1E8D0}-\u{1E8D6}\u{1E944}-\u{1E94A}\u{E0100}-\u{E01EF}]*$/u;

module.exports = {
  combiningMarks,
  combiningClassVirama,
  validZWNJ,
  bidiDomain,
  bidiS1LTR,
  bidiS1RTL,
  bidiS2,
  bidiS3,
  bidiS4EN,
  bidiS4AN,
  bidiS5,
  bidiS6
};


/***/ }),

/***/ 8644:
/***/ ((module) => {

"use strict";


module.exports.STATUS_MAPPING = {
  mapped: 1,
  valid: 2,
  disallowed: 3,
  disallowed_STD3_valid: 4, // eslint-disable-line camelcase
  disallowed_STD3_mapped: 5, // eslint-disable-line camelcase
  deviation: 6,
  ignored: 7
};


/***/ }),

/***/ 4886:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


function makeException(ErrorType, message, opts = {}) {
    if (opts.globals) {
        ErrorType = opts.globals[ErrorType.name];
    }
    return new ErrorType(`${opts.context ? opts.context : "Value"} ${message}.`);
}

function toNumber(value, opts = {}) {
    if (!opts.globals) {
        return +value;
    }
    if (typeof value === "bigint") {
        throw opts.globals.TypeError("Cannot convert a BigInt value to a number");
    }
    return opts.globals.Number(value);
}

function type(V) {
    if (V === null) {
        return "Null";
    }
    switch (typeof V) {
        case "undefined":
            return "Undefined";
        case "boolean":
            return "Boolean";
        case "number":
            return "Number";
        case "string":
            return "String";
        case "symbol":
            return "Symbol";
        case "bigint":
            return "BigInt";
        case "object":
            // Falls through
        case "function":
            // Falls through
        default:
            // Per ES spec, typeof returns an implemention-defined value that is not any of the existing ones for
            // uncallable non-standard exotic objects. Yet Type() which the Web IDL spec depends on returns Object for
            // such cases. So treat the default case as an object.
            return "Object";
    }
}

// Round x to the nearest integer, choosing the even integer if it lies halfway between two.
function evenRound(x) {
    // There are four cases for numbers with fractional part being .5:
    //
    // case |     x     | floor(x) | round(x) | expected | x <> 0 | x % 1 | x & 1 |   example
    //   1  |  2n + 0.5 |  2n      |  2n + 1  |  2n      |   >    |  0.5  |   0   |  0.5 ->  0
    //   2  |  2n + 1.5 |  2n + 1  |  2n + 2  |  2n + 2  |   >    |  0.5  |   1   |  1.5 ->  2
    //   3  | -2n - 0.5 | -2n - 1  | -2n      | -2n      |   <    | -0.5  |   0   | -0.5 ->  0
    //   4  | -2n - 1.5 | -2n - 2  | -2n - 1  | -2n - 2  |   <    | -0.5  |   1   | -1.5 -> -2
    // (where n is a non-negative integer)
    //
    // Branch here for cases 1 and 4
    if ((x > 0 && (x % 1) === +0.5 && (x & 1) === 0) ||
        (x < 0 && (x % 1) === -0.5 && (x & 1) === 1)) {
        return censorNegativeZero(Math.floor(x));
    }

    return censorNegativeZero(Math.round(x));
}

function integerPart(n) {
    return censorNegativeZero(Math.trunc(n));
}

function sign(x) {
    return x < 0 ? -1 : 1;
}

function modulo(x, y) {
    // https://tc39.github.io/ecma262/#eqn-modulo
    // Note that http://stackoverflow.com/a/4467559/3191 does NOT work for large modulos
    const signMightNotMatch = x % y;
    if (sign(y) !== sign(signMightNotMatch)) {
        return signMightNotMatch + y;
    }
    return signMightNotMatch;
}

function censorNegativeZero(x) {
    return x === 0 ? 0 : x;
}

function createIntegerConversion(bitLength, typeOpts) {
    const isSigned = !typeOpts.unsigned;

    let lowerBound;
    let upperBound;
    if (bitLength === 64) {
        upperBound = Number.MAX_SAFE_INTEGER;
        lowerBound = !isSigned ? 0 : Number.MIN_SAFE_INTEGER;
    } else if (!isSigned) {
        lowerBound = 0;
        upperBound = Math.pow(2, bitLength) - 1;
    } else {
        lowerBound = -Math.pow(2, bitLength - 1);
        upperBound = Math.pow(2, bitLength - 1) - 1;
    }

    const twoToTheBitLength = Math.pow(2, bitLength);
    const twoToOneLessThanTheBitLength = Math.pow(2, bitLength - 1);

    return (V, opts = {}) => {
        let x = toNumber(V, opts);
        x = censorNegativeZero(x);

        if (opts.enforceRange) {
            if (!Number.isFinite(x)) {
                throw makeException(TypeError, "is not a finite number", opts);
            }

            x = integerPart(x);

            if (x < lowerBound || x > upperBound) {
                throw makeException(TypeError,
                    `is outside the accepted range of ${lowerBound} to ${upperBound}, inclusive`, opts);
            }

            return x;
        }

        if (!Number.isNaN(x) && opts.clamp) {
            x = Math.min(Math.max(x, lowerBound), upperBound);
            x = evenRound(x);
            return x;
        }

        if (!Number.isFinite(x) || x === 0) {
            return 0;
        }
        x = integerPart(x);

        // Math.pow(2, 64) is not accurately representable in JavaScript, so try to avoid these per-spec operations if
        // possible. Hopefully it's an optimization for the non-64-bitLength cases too.
        if (x >= lowerBound && x <= upperBound) {
            return x;
        }

        // These will not work great for bitLength of 64, but oh well. See the README for more details.
        x = modulo(x, twoToTheBitLength);
        if (isSigned && x >= twoToOneLessThanTheBitLength) {
            return x - twoToTheBitLength;
        }
        return x;
    };
}

function createLongLongConversion(bitLength, { unsigned }) {
    const upperBound = Number.MAX_SAFE_INTEGER;
    const lowerBound = unsigned ? 0 : Number.MIN_SAFE_INTEGER;
    const asBigIntN = unsigned ? BigInt.asUintN : BigInt.asIntN;

    return (V, opts = {}) => {
        if (opts === undefined) {
            opts = {};
        }

        let x = toNumber(V, opts);
        x = censorNegativeZero(x);

        if (opts.enforceRange) {
            if (!Number.isFinite(x)) {
                throw makeException(TypeError, "is not a finite number", opts);
            }

            x = integerPart(x);

            if (x < lowerBound || x > upperBound) {
                throw makeException(TypeError,
                    `is outside the accepted range of ${lowerBound} to ${upperBound}, inclusive`, opts);
            }

            return x;
        }

        if (!Number.isNaN(x) && opts.clamp) {
            x = Math.min(Math.max(x, lowerBound), upperBound);
            x = evenRound(x);
            return x;
        }

        if (!Number.isFinite(x) || x === 0) {
            return 0;
        }

        let xBigInt = BigInt(integerPart(x));
        xBigInt = asBigIntN(bitLength, xBigInt);
        return Number(xBigInt);
    };
}

exports.any = V => {
    return V;
};

exports.void = function () {
    return undefined;
};

exports.boolean = function (val) {
    return !!val;
};

exports.byte = createIntegerConversion(8, { unsigned: false });
exports.octet = createIntegerConversion(8, { unsigned: true });

exports.short = createIntegerConversion(16, { unsigned: false });
exports["unsigned short"] = createIntegerConversion(16, { unsigned: true });

exports.long = createIntegerConversion(32, { unsigned: false });
exports["unsigned long"] = createIntegerConversion(32, { unsigned: true });

exports["long long"] = createLongLongConversion(64, { unsigned: false });
exports["unsigned long long"] = createLongLongConversion(64, { unsigned: true });

exports.double = (V, opts) => {
    const x = toNumber(V, opts);

    if (!Number.isFinite(x)) {
        throw makeException(TypeError, "is not a finite floating-point value", opts);
    }

    return x;
};

exports["unrestricted double"] = (V, opts) => {
    const x = toNumber(V, opts);

    return x;
};

exports.float = (V, opts) => {
    const x = toNumber(V, opts);

    if (!Number.isFinite(x)) {
        throw makeException(TypeError, "is not a finite floating-point value", opts);
    }

    if (Object.is(x, -0)) {
        return x;
    }

    const y = Math.fround(x);

    if (!Number.isFinite(y)) {
        throw makeException(TypeError, "is outside the range of a single-precision floating-point value", opts);
    }

    return y;
};

exports["unrestricted float"] = (V, opts) => {
    const x = toNumber(V, opts);

    if (isNaN(x)) {
        return x;
    }

    if (Object.is(x, -0)) {
        return x;
    }

    return Math.fround(x);
};

exports.DOMString = function (V, opts = {}) {
    if (opts.treatNullAsEmptyString && V === null) {
        return "";
    }

    if (typeof V === "symbol") {
        throw makeException(TypeError, "is a symbol, which cannot be converted to a string", opts);
    }

    const StringCtor = opts.globals ? opts.globals.String : String;
    return StringCtor(V);
};

exports.ByteString = (V, opts) => {
    const x = exports.DOMString(V, opts);
    let c;
    for (let i = 0; (c = x.codePointAt(i)) !== undefined; ++i) {
        if (c > 255) {
            throw makeException(TypeError, "is not a valid ByteString", opts);
        }
    }

    return x;
};

exports.USVString = (V, opts) => {
    const S = exports.DOMString(V, opts);
    const n = S.length;
    const U = [];
    for (let i = 0; i < n; ++i) {
        const c = S.charCodeAt(i);
        if (c < 0xD800 || c > 0xDFFF) {
            U.push(String.fromCodePoint(c));
        } else if (0xDC00 <= c && c <= 0xDFFF) {
            U.push(String.fromCodePoint(0xFFFD));
        } else if (i === n - 1) {
            U.push(String.fromCodePoint(0xFFFD));
        } else {
            const d = S.charCodeAt(i + 1);
            if (0xDC00 <= d && d <= 0xDFFF) {
                const a = c & 0x3FF;
                const b = d & 0x3FF;
                U.push(String.fromCodePoint((2 << 15) + ((2 << 9) * a) + b));
                ++i;
            } else {
                U.push(String.fromCodePoint(0xFFFD));
            }
        }
    }

    return U.join("");
};

exports.object = (V, opts) => {
    if (type(V) !== "Object") {
        throw makeException(TypeError, "is not an object", opts);
    }

    return V;
};

// Not exported, but used in Function and VoidFunction.

// Neither Function nor VoidFunction is defined with [TreatNonObjectAsNull], so
// handling for that is omitted.
function convertCallbackFunction(V, opts) {
    if (typeof V !== "function") {
        throw makeException(TypeError, "is not a function", opts);
    }
    return V;
}

const abByteLengthGetter =
    Object.getOwnPropertyDescriptor(ArrayBuffer.prototype, "byteLength").get;
const sabByteLengthGetter =
    Object.getOwnPropertyDescriptor(SharedArrayBuffer.prototype, "byteLength").get;

function isNonSharedArrayBuffer(V) {
    try {
        // This will throw on SharedArrayBuffers, but not detached ArrayBuffers.
        // (The spec says it should throw, but the spec conflicts with implementations: https://github.com/tc39/ecma262/issues/678)
        abByteLengthGetter.call(V);

        return true;
    } catch {
        return false;
    }
}

function isSharedArrayBuffer(V) {
    try {
        sabByteLengthGetter.call(V);
        return true;
    } catch {
        return false;
    }
}

function isArrayBufferDetached(V) {
    try {
        // eslint-disable-next-line no-new
        new Uint8Array(V);
        return false;
    } catch {
        return true;
    }
}

exports.ArrayBuffer = (V, opts = {}) => {
    if (!isNonSharedArrayBuffer(V)) {
        if (opts.allowShared && !isSharedArrayBuffer(V)) {
            throw makeException(TypeError, "is not an ArrayBuffer or SharedArrayBuffer", opts);
        }
        throw makeException(TypeError, "is not an ArrayBuffer", opts);
    }
    if (isArrayBufferDetached(V)) {
        throw makeException(TypeError, "is a detached ArrayBuffer", opts);
    }

    return V;
};

const dvByteLengthGetter =
    Object.getOwnPropertyDescriptor(DataView.prototype, "byteLength").get;
exports.DataView = (V, opts = {}) => {
    try {
        dvByteLengthGetter.call(V);
    } catch (e) {
        throw makeException(TypeError, "is not a DataView", opts);
    }

    if (!opts.allowShared && isSharedArrayBuffer(V.buffer)) {
        throw makeException(TypeError, "is backed by a SharedArrayBuffer, which is not allowed", opts);
    }
    if (isArrayBufferDetached(V.buffer)) {
        throw makeException(TypeError, "is backed by a detached ArrayBuffer", opts);
    }

    return V;
};

// Returns the unforgeable `TypedArray` constructor name or `undefined`,
// if the `this` value isn't a valid `TypedArray` object.
//
// https://tc39.es/ecma262/#sec-get-%typedarray%.prototype-@@tostringtag
const typedArrayNameGetter = Object.getOwnPropertyDescriptor(
    Object.getPrototypeOf(Uint8Array).prototype,
    Symbol.toStringTag
).get;
[
    Int8Array, Int16Array, Int32Array, Uint8Array,
    Uint16Array, Uint32Array, Uint8ClampedArray, Float32Array, Float64Array
].forEach(func => {
    const name = func.name;
    const article = /^[AEIOU]/.test(name) ? "an" : "a";
    exports[name] = (V, opts = {}) => {
        if (!ArrayBuffer.isView(V) || typedArrayNameGetter.call(V) !== name) {
            throw makeException(TypeError, `is not ${article} ${name} object`, opts);
        }
        if (!opts.allowShared && isSharedArrayBuffer(V.buffer)) {
            throw makeException(TypeError, "is a view on a SharedArrayBuffer, which is not allowed", opts);
        }
        if (isArrayBufferDetached(V.buffer)) {
            throw makeException(TypeError, "is a view on a detached ArrayBuffer", opts);
        }

        return V;
    };
});

// Common definitions

exports.ArrayBufferView = (V, opts = {}) => {
    if (!ArrayBuffer.isView(V)) {
        throw makeException(TypeError, "is not a view on an ArrayBuffer or SharedArrayBuffer", opts);
    }

    if (!opts.allowShared && isSharedArrayBuffer(V.buffer)) {
        throw makeException(TypeError, "is a view on a SharedArrayBuffer, which is not allowed", opts);
    }

    if (isArrayBufferDetached(V.buffer)) {
        throw makeException(TypeError, "is a view on a detached ArrayBuffer", opts);
    }
    return V;
};

exports.BufferSource = (V, opts = {}) => {
    if (ArrayBuffer.isView(V)) {
        if (!opts.allowShared && isSharedArrayBuffer(V.buffer)) {
            throw makeException(TypeError, "is a view on a SharedArrayBuffer, which is not allowed", opts);
        }

        if (isArrayBufferDetached(V.buffer)) {
            throw makeException(TypeError, "is a view on a detached ArrayBuffer", opts);
        }
        return V;
    }

    if (!opts.allowShared && !isNonSharedArrayBuffer(V)) {
        throw makeException(TypeError, "is not an ArrayBuffer or a view on one", opts);
    }
    if (opts.allowShared && !isSharedArrayBuffer(V) && !isNonSharedArrayBuffer(V)) {
        throw makeException(TypeError, "is not an ArrayBuffer, SharedArrayBufer, or a view on one", opts);
    }
    if (isArrayBufferDetached(V)) {
        throw makeException(TypeError, "is a detached ArrayBuffer", opts);
    }

    return V;
};

exports.DOMTimeStamp = exports["unsigned long long"];

exports.Function = convertCallbackFunction;

exports.VoidFunction = convertCallbackFunction;


/***/ }),

/***/ 5358:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const conversions = __webpack_require__(4886);
const utils = __webpack_require__(6012);

exports.convert = (value, { context = "The provided value" } = {}) => {
  if (typeof value !== "function") {
    throw new TypeError(context + " is not a function");
  }

  function invokeTheCallbackFunction(...args) {
    if (new.target !== undefined) {
      throw new Error("Internal error: invokeTheCallbackFunction is not a constructor");
    }

    const thisArg = utils.tryWrapperForImpl(this);
    let callResult;

    for (let i = 0; i < args.length; i++) {
      args[i] = utils.tryWrapperForImpl(args[i]);
    }

    callResult = Reflect.apply(value, thisArg, args);

    callResult = conversions["any"](callResult, { context: context });

    return callResult;
  }

  invokeTheCallbackFunction.construct = (...args) => {
    for (let i = 0; i < args.length; i++) {
      args[i] = utils.tryWrapperForImpl(args[i]);
    }

    let callResult = Reflect.construct(value, args);

    callResult = conversions["any"](callResult, { context: context });

    return callResult;
  };

  invokeTheCallbackFunction[utils.wrapperSymbol] = value;
  invokeTheCallbackFunction.objectReference = value;

  return invokeTheCallbackFunction;
};


/***/ }),

/***/ 257:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

const usm = __webpack_require__(919);
const urlencoded = __webpack_require__(9377);
const URLSearchParams = __webpack_require__(9044);

exports.implementation = class URLImpl {
  constructor(globalObject, constructorArgs) {
    const url = constructorArgs[0];
    const base = constructorArgs[1];

    let parsedBase = null;
    if (base !== undefined) {
      parsedBase = usm.basicURLParse(base);
      if (parsedBase === null) {
        throw new TypeError(`Invalid base URL: ${base}`);
      }
    }

    const parsedURL = usm.basicURLParse(url, { baseURL: parsedBase });
    if (parsedURL === null) {
      throw new TypeError(`Invalid URL: ${url}`);
    }

    const query = parsedURL.query !== null ? parsedURL.query : "";

    this._url = parsedURL;

    // We cannot invoke the "new URLSearchParams object" algorithm without going through the constructor, which strips
    // question mark by default. Therefore the doNotStripQMark hack is used.
    this._query = URLSearchParams.createImpl(globalObject, [query], { doNotStripQMark: true });
    this._query._url = this;
  }

  get href() {
    return usm.serializeURL(this._url);
  }

  set href(v) {
    const parsedURL = usm.basicURLParse(v);
    if (parsedURL === null) {
      throw new TypeError(`Invalid URL: ${v}`);
    }

    this._url = parsedURL;

    this._query._list.splice(0);
    const { query } = parsedURL;
    if (query !== null) {
      this._query._list = urlencoded.parseUrlencodedString(query);
    }
  }

  get origin() {
    return usm.serializeURLOrigin(this._url);
  }

  get protocol() {
    return this._url.scheme + ":";
  }

  set protocol(v) {
    usm.basicURLParse(v + ":", { url: this._url, stateOverride: "scheme start" });
  }

  get username() {
    return this._url.username;
  }

  set username(v) {
    if (usm.cannotHaveAUsernamePasswordPort(this._url)) {
      return;
    }

    usm.setTheUsername(this._url, v);
  }

  get password() {
    return this._url.password;
  }

  set password(v) {
    if (usm.cannotHaveAUsernamePasswordPort(this._url)) {
      return;
    }

    usm.setThePassword(this._url, v);
  }

  get host() {
    const url = this._url;

    if (url.host === null) {
      return "";
    }

    if (url.port === null) {
      return usm.serializeHost(url.host);
    }

    return usm.serializeHost(url.host) + ":" + usm.serializeInteger(url.port);
  }

  set host(v) {
    if (this._url.cannotBeABaseURL) {
      return;
    }

    usm.basicURLParse(v, { url: this._url, stateOverride: "host" });
  }

  get hostname() {
    if (this._url.host === null) {
      return "";
    }

    return usm.serializeHost(this._url.host);
  }

  set hostname(v) {
    if (this._url.cannotBeABaseURL) {
      return;
    }

    usm.basicURLParse(v, { url: this._url, stateOverride: "hostname" });
  }

  get port() {
    if (this._url.port === null) {
      return "";
    }

    return usm.serializeInteger(this._url.port);
  }

  set port(v) {
    if (usm.cannotHaveAUsernamePasswordPort(this._url)) {
      return;
    }

    if (v === "") {
      this._url.port = null;
    } else {
      usm.basicURLParse(v, { url: this._url, stateOverride: "port" });
    }
  }

  get pathname() {
    if (this._url.cannotBeABaseURL) {
      return this._url.path[0];
    }

    if (this._url.path.length === 0) {
      return "";
    }

    return "/" + this._url.path.join("/");
  }

  set pathname(v) {
    if (this._url.cannotBeABaseURL) {
      return;
    }

    this._url.path = [];
    usm.basicURLParse(v, { url: this._url, stateOverride: "path start" });
  }

  get search() {
    if (this._url.query === null || this._url.query === "") {
      return "";
    }

    return "?" + this._url.query;
  }

  set search(v) {
    const url = this._url;

    if (v === "") {
      url.query = null;
      this._query._list = [];
      return;
    }

    const input = v[0] === "?" ? v.substring(1) : v;
    url.query = "";
    usm.basicURLParse(input, { url, stateOverride: "query" });
    this._query._list = urlencoded.parseUrlencodedString(input);
  }

  get searchParams() {
    return this._query;
  }

  get hash() {
    if (this._url.fragment === null || this._url.fragment === "") {
      return "";
    }

    return "#" + this._url.fragment;
  }

  set hash(v) {
    if (v === "") {
      this._url.fragment = null;
      return;
    }

    const input = v[0] === "#" ? v.substring(1) : v;
    this._url.fragment = "";
    usm.basicURLParse(input, { url: this._url, stateOverride: "fragment" });
  }

  toJSON() {
    return this.href;
  }
};


/***/ }),

/***/ 2503:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const conversions = __webpack_require__(4886);
const utils = __webpack_require__(6012);

const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;

const interfaceName = "URL";

exports.is = value => {
  return utils.isObject(value) && utils.hasOwn(value, implSymbol) && value[implSymbol] instanceof Impl.implementation;
};
exports.isImpl = value => {
  return utils.isObject(value) && value instanceof Impl.implementation;
};
exports.convert = (value, { context = "The provided value" } = {}) => {
  if (exports.is(value)) {
    return utils.implForWrapper(value);
  }
  throw new TypeError(`${context} is not of type 'URL'.`);
};

function makeWrapper(globalObject) {
  if (globalObject[ctorRegistrySymbol] === undefined) {
    throw new Error("Internal error: invalid global object");
  }

  const ctor = globalObject[ctorRegistrySymbol]["URL"];
  if (ctor === undefined) {
    throw new Error("Internal error: constructor URL is not installed on the passed global object");
  }

  return Object.create(ctor.prototype);
}

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = makeWrapper(globalObject);
  return exports.setup(wrapper, globalObject, constructorArgs, privateData);
};

exports.createImpl = (globalObject, constructorArgs, privateData) => {
  const wrapper = exports.create(globalObject, constructorArgs, privateData);
  return utils.implForWrapper(wrapper);
};

exports._internalSetup = (wrapper, globalObject) => {};

exports.setup = (wrapper, globalObject, constructorArgs = [], privateData = {}) => {
  privateData.wrapper = wrapper;

  exports._internalSetup(wrapper, globalObject);
  Object.defineProperty(wrapper, implSymbol, {
    value: new Impl.implementation(globalObject, constructorArgs, privateData),
    configurable: true
  });

  wrapper[implSymbol][utils.wrapperSymbol] = wrapper;
  if (Impl.init) {
    Impl.init(wrapper[implSymbol]);
  }
  return wrapper;
};

exports.new = globalObject => {
  const wrapper = makeWrapper(globalObject);

  exports._internalSetup(wrapper, globalObject);
  Object.defineProperty(wrapper, implSymbol, {
    value: Object.create(Impl.implementation.prototype),
    configurable: true
  });

  wrapper[implSymbol][utils.wrapperSymbol] = wrapper;
  if (Impl.init) {
    Impl.init(wrapper[implSymbol]);
  }
  return wrapper[implSymbol];
};

const exposed = new Set(["Window", "Worker"]);

exports.install = (globalObject, globalNames) => {
  if (!globalNames.some(globalName => exposed.has(globalName))) {
    return;
  }
  class URL {
    constructor(url) {
      if (arguments.length < 1) {
        throw new TypeError(
          "Failed to construct 'URL': 1 argument required, but only " + arguments.length + " present."
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = conversions["USVString"](curArg, { context: "Failed to construct 'URL': parameter 1" });
        args.push(curArg);
      }
      {
        let curArg = arguments[1];
        if (curArg !== undefined) {
          curArg = conversions["USVString"](curArg, { context: "Failed to construct 'URL': parameter 2" });
        }
        args.push(curArg);
      }
      return exports.setup(Object.create(new.target.prototype), globalObject, args);
    }

    toJSON() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new TypeError("'toJSON' called on an object that is not a valid instance of URL.");
      }

      return esValue[implSymbol].toJSON();
    }

    get href() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError("'get href' called on an object that is not a valid instance of URL.");
      }

      return esValue[implSymbol]["href"];
    }

    set href(V) {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError("'set href' called on an object that is not a valid instance of URL.");
      }

      V = conversions["USVString"](V, { context: "Failed to set the 'href' property on 'URL': The provided value" });

      esValue[implSymbol]["href"] = V;
    }

    toString() {
      const esValue = this;
      if (!exports.is(esValue)) {
        throw new TypeError("'toString' called on an object that is not a valid instance of URL.");
      }

      return esValue[implSymbol]["href"];
    }

    get origin() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError("'get origin' called on an object that is not a valid instance of URL.");
      }

      return esValue[implSymbol]["origin"];
    }

    get protocol() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError("'get protocol' called on an object that is not a valid instance of URL.");
      }

      return esValue[implSymbol]["protocol"];
    }

    set protocol(V) {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError("'set protocol' called on an object that is not a valid instance of URL.");
      }

      V = conversions["USVString"](V, {
        context: "Failed to set the 'protocol' property on 'URL': The provided value"
      });

      esValue[implSymbol]["protocol"] = V;
    }

    get username() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError("'get username' called on an object that is not a valid instance of URL.");
      }

      return esValue[implSymbol]["username"];
    }

    set username(V) {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError("'set username' called on an object that is not a valid instance of URL.");
      }

      V = conversions["USVString"](V, {
        context: "Failed to set the 'username' property on 'URL': The provided value"
      });

      esValue[implSymbol]["username"] = V;
    }

    get password() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError("'get password' called on an object that is not a valid instance of URL.");
      }

      return esValue[implSymbol]["password"];
    }

    set password(V) {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError("'set password' called on an object that is not a valid instance of URL.");
      }

      V = conversions["USVString"](V, {
        context: "Failed to set the 'password' property on 'URL': The provided value"
      });

      esValue[implSymbol]["password"] = V;
    }

    get host() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError("'get host' called on an object that is not a valid instance of URL.");
      }

      return esValue[implSymbol]["host"];
    }

    set host(V) {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError("'set host' called on an object that is not a valid instance of URL.");
      }

      V = conversions["USVString"](V, { context: "Failed to set the 'host' property on 'URL': The provided value" });

      esValue[implSymbol]["host"] = V;
    }

    get hostname() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError("'get hostname' called on an object that is not a valid instance of URL.");
      }

      return esValue[implSymbol]["hostname"];
    }

    set hostname(V) {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError("'set hostname' called on an object that is not a valid instance of URL.");
      }

      V = conversions["USVString"](V, {
        context: "Failed to set the 'hostname' property on 'URL': The provided value"
      });

      esValue[implSymbol]["hostname"] = V;
    }

    get port() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError("'get port' called on an object that is not a valid instance of URL.");
      }

      return esValue[implSymbol]["port"];
    }

    set port(V) {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError("'set port' called on an object that is not a valid instance of URL.");
      }

      V = conversions["USVString"](V, { context: "Failed to set the 'port' property on 'URL': The provided value" });

      esValue[implSymbol]["port"] = V;
    }

    get pathname() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError("'get pathname' called on an object that is not a valid instance of URL.");
      }

      return esValue[implSymbol]["pathname"];
    }

    set pathname(V) {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError("'set pathname' called on an object that is not a valid instance of URL.");
      }

      V = conversions["USVString"](V, {
        context: "Failed to set the 'pathname' property on 'URL': The provided value"
      });

      esValue[implSymbol]["pathname"] = V;
    }

    get search() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError("'get search' called on an object that is not a valid instance of URL.");
      }

      return esValue[implSymbol]["search"];
    }

    set search(V) {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError("'set search' called on an object that is not a valid instance of URL.");
      }

      V = conversions["USVString"](V, { context: "Failed to set the 'search' property on 'URL': The provided value" });

      esValue[implSymbol]["search"] = V;
    }

    get searchParams() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError("'get searchParams' called on an object that is not a valid instance of URL.");
      }

      return utils.getSameObject(this, "searchParams", () => {
        return utils.tryWrapperForImpl(esValue[implSymbol]["searchParams"]);
      });
    }

    get hash() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError("'get hash' called on an object that is not a valid instance of URL.");
      }

      return esValue[implSymbol]["hash"];
    }

    set hash(V) {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new TypeError("'set hash' called on an object that is not a valid instance of URL.");
      }

      V = conversions["USVString"](V, { context: "Failed to set the 'hash' property on 'URL': The provided value" });

      esValue[implSymbol]["hash"] = V;
    }
  }
  Object.defineProperties(URL.prototype, {
    toJSON: { enumerable: true },
    href: { enumerable: true },
    toString: { enumerable: true },
    origin: { enumerable: true },
    protocol: { enumerable: true },
    username: { enumerable: true },
    password: { enumerable: true },
    host: { enumerable: true },
    hostname: { enumerable: true },
    port: { enumerable: true },
    pathname: { enumerable: true },
    search: { enumerable: true },
    searchParams: { enumerable: true },
    hash: { enumerable: true },
    [Symbol.toStringTag]: { value: "URL", configurable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = URL;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: URL
  });

  if (globalNames.includes("Window")) {
    Object.defineProperty(globalObject, "webkitURL", {
      configurable: true,
      writable: true,
      value: URL
    });
  }
};

const Impl = __webpack_require__(257);


/***/ }),

/***/ 9554:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

const stableSortBy = __webpack_require__(254);
const urlencoded = __webpack_require__(9377);

exports.implementation = class URLSearchParamsImpl {
  constructor(globalObject, constructorArgs, { doNotStripQMark = false }) {
    let init = constructorArgs[0];
    this._list = [];
    this._url = null;

    if (!doNotStripQMark && typeof init === "string" && init[0] === "?") {
      init = init.slice(1);
    }

    if (Array.isArray(init)) {
      for (const pair of init) {
        if (pair.length !== 2) {
          throw new TypeError("Failed to construct 'URLSearchParams': parameter 1 sequence's element does not " +
                              "contain exactly two elements.");
        }
        this._list.push([pair[0], pair[1]]);
      }
    } else if (typeof init === "object" && Object.getPrototypeOf(init) === null) {
      for (const name of Object.keys(init)) {
        const value = init[name];
        this._list.push([name, value]);
      }
    } else {
      this._list = urlencoded.parseUrlencodedString(init);
    }
  }

  _updateSteps() {
    if (this._url !== null) {
      let query = urlencoded.serializeUrlencoded(this._list);
      if (query === "") {
        query = null;
      }
      this._url._url.query = query;
    }
  }

  append(name, value) {
    this._list.push([name, value]);
    this._updateSteps();
  }

  delete(name) {
    let i = 0;
    while (i < this._list.length) {
      if (this._list[i][0] === name) {
        this._list.splice(i, 1);
      } else {
        i++;
      }
    }
    this._updateSteps();
  }

  get(name) {
    for (const tuple of this._list) {
      if (tuple[0] === name) {
        return tuple[1];
      }
    }
    return null;
  }

  getAll(name) {
    const output = [];
    for (const tuple of this._list) {
      if (tuple[0] === name) {
        output.push(tuple[1]);
      }
    }
    return output;
  }

  has(name) {
    for (const tuple of this._list) {
      if (tuple[0] === name) {
        return true;
      }
    }
    return false;
  }

  set(name, value) {
    let found = false;
    let i = 0;
    while (i < this._list.length) {
      if (this._list[i][0] === name) {
        if (found) {
          this._list.splice(i, 1);
        } else {
          found = true;
          this._list[i][1] = value;
          i++;
        }
      } else {
        i++;
      }
    }
    if (!found) {
      this._list.push([name, value]);
    }
    this._updateSteps();
  }

  sort() {
    this._list = stableSortBy(this._list, [0]);
    this._updateSteps();
  }

  [Symbol.iterator]() {
    return this._list[Symbol.iterator]();
  }

  toString() {
    return urlencoded.serializeUrlencoded(this._list);
  }
};


/***/ }),

/***/ 9044:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const conversions = __webpack_require__(4886);
const utils = __webpack_require__(6012);

const Function = __webpack_require__(5358);
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;

const interfaceName = "URLSearchParams";

const IteratorPrototype = Object.create(utils.IteratorPrototype, {
  next: {
    value: function next() {
      const internal = this && this[utils.iterInternalSymbol];
      if (!internal) {
        throw new TypeError("next() called on a value that is not an iterator prototype object");
      }

      const { target, kind, index } = internal;
      const values = Array.from(target[implSymbol]);
      const len = values.length;
      if (index >= len) {
        return { value: undefined, done: true };
      }

      const pair = values[index];
      internal.index = index + 1;
      return utils.iteratorResult(pair.map(utils.tryWrapperForImpl), kind);
    },
    writable: true,
    enumerable: true,
    configurable: true
  },
  [Symbol.toStringTag]: {
    value: "URLSearchParams Iterator",
    configurable: true
  }
});

exports.is = value => {
  return utils.isObject(value) && utils.hasOwn(value, implSymbol) && value[implSymbol] instanceof Impl.implementation;
};
exports.isImpl = value => {
  return utils.isObject(value) && value instanceof Impl.implementation;
};
exports.convert = (value, { context = "The provided value" } = {}) => {
  if (exports.is(value)) {
    return utils.implForWrapper(value);
  }
  throw new TypeError(`${context} is not of type 'URLSearchParams'.`);
};

exports.createDefaultIterator = (target, kind) => {
  const iterator = Object.create(IteratorPrototype);
  Object.defineProperty(iterator, utils.iterInternalSymbol, {
    value: { target, kind, index: 0 },
    configurable: true
  });
  return iterator;
};

function makeWrapper(globalObject) {
  if (globalObject[ctorRegistrySymbol] === undefined) {
    throw new Error("Internal error: invalid global object");
  }

  const ctor = globalObject[ctorRegistrySymbol]["URLSearchParams"];
  if (ctor === undefined) {
    throw new Error("Internal error: constructor URLSearchParams is not installed on the passed global object");
  }

  return Object.create(ctor.prototype);
}

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = makeWrapper(globalObject);
  return exports.setup(wrapper, globalObject, constructorArgs, privateData);
};

exports.createImpl = (globalObject, constructorArgs, privateData) => {
  const wrapper = exports.create(globalObject, constructorArgs, privateData);
  return utils.implForWrapper(wrapper);
};

exports._internalSetup = (wrapper, globalObject) => {};

exports.setup = (wrapper, globalObject, constructorArgs = [], privateData = {}) => {
  privateData.wrapper = wrapper;

  exports._internalSetup(wrapper, globalObject);
  Object.defineProperty(wrapper, implSymbol, {
    value: new Impl.implementation(globalObject, constructorArgs, privateData),
    configurable: true
  });

  wrapper[implSymbol][utils.wrapperSymbol] = wrapper;
  if (Impl.init) {
    Impl.init(wrapper[implSymbol]);
  }
  return wrapper;
};

exports.new = globalObject => {
  const wrapper = makeWrapper(globalObject);

  exports._internalSetup(wrapper, globalObject);
  Object.defineProperty(wrapper, implSymbol, {
    value: Object.create(Impl.implementation.prototype),
    configurable: true
  });

  wrapper[implSymbol][utils.wrapperSymbol] = wrapper;
  if (Impl.init) {
    Impl.init(wrapper[implSymbol]);
  }
  return wrapper[implSymbol];
};

const exposed = new Set(["Window", "Worker"]);

exports.install = (globalObject, globalNames) => {
  if (!globalNames.some(globalName => exposed.has(globalName))) {
    return;
  }
  class URLSearchParams {
    constructor() {
      const args = [];
      {
        let curArg = arguments[0];
        if (curArg !== undefined) {
          if (utils.isObject(curArg)) {
            if (curArg[Symbol.iterator] !== undefined) {
              if (!utils.isObject(curArg)) {
                throw new TypeError(
                  "Failed to construct 'URLSearchParams': parameter 1" + " sequence" + " is not an iterable object."
                );
              } else {
                const V = [];
                const tmp = curArg;
                for (let nextItem of tmp) {
                  if (!utils.isObject(nextItem)) {
                    throw new TypeError(
                      "Failed to construct 'URLSearchParams': parameter 1" +
                        " sequence" +
                        "'s element" +
                        " is not an iterable object."
                    );
                  } else {
                    const V = [];
                    const tmp = nextItem;
                    for (let nextItem of tmp) {
                      nextItem = conversions["USVString"](nextItem, {
                        context:
                          "Failed to construct 'URLSearchParams': parameter 1" +
                          " sequence" +
                          "'s element" +
                          "'s element"
                      });

                      V.push(nextItem);
                    }
                    nextItem = V;
                  }

                  V.push(nextItem);
                }
                curArg = V;
              }
            } else {
              if (!utils.isObject(curArg)) {
                throw new TypeError(
                  "Failed to construct 'URLSearchParams': parameter 1" + " record" + " is not an object."
                );
              } else {
                const result = Object.create(null);
                for (const key of Reflect.ownKeys(curArg)) {
                  const desc = Object.getOwnPropertyDescriptor(curArg, key);
                  if (desc && desc.enumerable) {
                    let typedKey = key;

                    typedKey = conversions["USVString"](typedKey, {
                      context: "Failed to construct 'URLSearchParams': parameter 1" + " record" + "'s key"
                    });

                    let typedValue = curArg[key];

                    typedValue = conversions["USVString"](typedValue, {
                      context: "Failed to construct 'URLSearchParams': parameter 1" + " record" + "'s value"
                    });

                    result[typedKey] = typedValue;
                  }
                }
                curArg = result;
              }
            }
          } else {
            curArg = conversions["USVString"](curArg, {
              context: "Failed to construct 'URLSearchParams': parameter 1"
            });
          }
        } else {
          curArg = "";
        }
        args.push(curArg);
      }
      return exports.setup(Object.create(new.target.prototype), globalObject, args);
    }

    append(name, value) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new TypeError("'append' called on an object that is not a valid instance of URLSearchParams.");
      }

      if (arguments.length < 2) {
        throw new TypeError(
          "Failed to execute 'append' on 'URLSearchParams': 2 arguments required, but only " +
            arguments.length +
            " present."
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = conversions["USVString"](curArg, {
          context: "Failed to execute 'append' on 'URLSearchParams': parameter 1"
        });
        args.push(curArg);
      }
      {
        let curArg = arguments[1];
        curArg = conversions["USVString"](curArg, {
          context: "Failed to execute 'append' on 'URLSearchParams': parameter 2"
        });
        args.push(curArg);
      }
      return esValue[implSymbol].append(...args);
    }

    delete(name) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new TypeError("'delete' called on an object that is not a valid instance of URLSearchParams.");
      }

      if (arguments.length < 1) {
        throw new TypeError(
          "Failed to execute 'delete' on 'URLSearchParams': 1 argument required, but only " +
            arguments.length +
            " present."
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = conversions["USVString"](curArg, {
          context: "Failed to execute 'delete' on 'URLSearchParams': parameter 1"
        });
        args.push(curArg);
      }
      return esValue[implSymbol].delete(...args);
    }

    get(name) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new TypeError("'get' called on an object that is not a valid instance of URLSearchParams.");
      }

      if (arguments.length < 1) {
        throw new TypeError(
          "Failed to execute 'get' on 'URLSearchParams': 1 argument required, but only " +
            arguments.length +
            " present."
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = conversions["USVString"](curArg, {
          context: "Failed to execute 'get' on 'URLSearchParams': parameter 1"
        });
        args.push(curArg);
      }
      return esValue[implSymbol].get(...args);
    }

    getAll(name) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new TypeError("'getAll' called on an object that is not a valid instance of URLSearchParams.");
      }

      if (arguments.length < 1) {
        throw new TypeError(
          "Failed to execute 'getAll' on 'URLSearchParams': 1 argument required, but only " +
            arguments.length +
            " present."
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = conversions["USVString"](curArg, {
          context: "Failed to execute 'getAll' on 'URLSearchParams': parameter 1"
        });
        args.push(curArg);
      }
      return utils.tryWrapperForImpl(esValue[implSymbol].getAll(...args));
    }

    has(name) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new TypeError("'has' called on an object that is not a valid instance of URLSearchParams.");
      }

      if (arguments.length < 1) {
        throw new TypeError(
          "Failed to execute 'has' on 'URLSearchParams': 1 argument required, but only " +
            arguments.length +
            " present."
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = conversions["USVString"](curArg, {
          context: "Failed to execute 'has' on 'URLSearchParams': parameter 1"
        });
        args.push(curArg);
      }
      return esValue[implSymbol].has(...args);
    }

    set(name, value) {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new TypeError("'set' called on an object that is not a valid instance of URLSearchParams.");
      }

      if (arguments.length < 2) {
        throw new TypeError(
          "Failed to execute 'set' on 'URLSearchParams': 2 arguments required, but only " +
            arguments.length +
            " present."
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = conversions["USVString"](curArg, {
          context: "Failed to execute 'set' on 'URLSearchParams': parameter 1"
        });
        args.push(curArg);
      }
      {
        let curArg = arguments[1];
        curArg = conversions["USVString"](curArg, {
          context: "Failed to execute 'set' on 'URLSearchParams': parameter 2"
        });
        args.push(curArg);
      }
      return esValue[implSymbol].set(...args);
    }

    sort() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new TypeError("'sort' called on an object that is not a valid instance of URLSearchParams.");
      }

      return esValue[implSymbol].sort();
    }

    toString() {
      const esValue = this !== null && this !== undefined ? this : globalObject;
      if (!exports.is(esValue)) {
        throw new TypeError("'toString' called on an object that is not a valid instance of URLSearchParams.");
      }

      return esValue[implSymbol].toString();
    }

    keys() {
      if (!exports.is(this)) {
        throw new TypeError("'keys' called on an object that is not a valid instance of URLSearchParams.");
      }
      return exports.createDefaultIterator(this, "key");
    }

    values() {
      if (!exports.is(this)) {
        throw new TypeError("'values' called on an object that is not a valid instance of URLSearchParams.");
      }
      return exports.createDefaultIterator(this, "value");
    }

    entries() {
      if (!exports.is(this)) {
        throw new TypeError("'entries' called on an object that is not a valid instance of URLSearchParams.");
      }
      return exports.createDefaultIterator(this, "key+value");
    }

    forEach(callback) {
      if (!exports.is(this)) {
        throw new TypeError("'forEach' called on an object that is not a valid instance of URLSearchParams.");
      }
      if (arguments.length < 1) {
        throw new TypeError("Failed to execute 'forEach' on 'iterable': 1 argument required, " + "but only 0 present.");
      }
      callback = Function.convert(callback, {
        context: "Failed to execute 'forEach' on 'iterable': The callback provided as parameter 1"
      });
      const thisArg = arguments[1];
      let pairs = Array.from(this[implSymbol]);
      let i = 0;
      while (i < pairs.length) {
        const [key, value] = pairs[i].map(utils.tryWrapperForImpl);
        callback.call(thisArg, value, key, this);
        pairs = Array.from(this[implSymbol]);
        i++;
      }
    }
  }
  Object.defineProperties(URLSearchParams.prototype, {
    append: { enumerable: true },
    delete: { enumerable: true },
    get: { enumerable: true },
    getAll: { enumerable: true },
    has: { enumerable: true },
    set: { enumerable: true },
    sort: { enumerable: true },
    toString: { enumerable: true },
    keys: { enumerable: true },
    values: { enumerable: true },
    entries: { enumerable: true },
    forEach: { enumerable: true },
    [Symbol.toStringTag]: { value: "URLSearchParams", configurable: true },
    [Symbol.iterator]: { value: URLSearchParams.prototype.entries, configurable: true, writable: true }
  });
  if (globalObject[ctorRegistrySymbol] === undefined) {
    globalObject[ctorRegistrySymbol] = Object.create(null);
  }
  globalObject[ctorRegistrySymbol][interfaceName] = URLSearchParams;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: URLSearchParams
  });
};

const Impl = __webpack_require__(9554);


/***/ }),

/***/ 2941:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

let { TextEncoder, TextDecoder } = __webpack_require__(1669);
// Handle browserify's lack of support (https://github.com/browserify/node-util/issues/46), which
// is important for the live viewer:
if (!TextEncoder) {
  TextEncoder = global.TextEncoder;
}
if (!TextDecoder) {
  TextDecoder = global.TextDecoder;
}

const utf8Encoder = new TextEncoder();
const utf8Decoder = new TextDecoder("utf-8", { ignoreBOM: true });

function utf8Encode(string) {
  return utf8Encoder.encode(string);
}

function utf8DecodeWithoutBOM(bytes) {
  return utf8Decoder.decode(bytes);
}

module.exports = {
  utf8Encode,
  utf8DecodeWithoutBOM
};


/***/ }),

/***/ 9067:
/***/ ((module) => {

"use strict";


// Note that we take code points as JS numbers, not JS strings.

function isASCIIDigit(c) {
  return c >= 0x30 && c <= 0x39;
}

function isASCIIAlpha(c) {
  return (c >= 0x41 && c <= 0x5A) || (c >= 0x61 && c <= 0x7A);
}

function isASCIIAlphanumeric(c) {
  return isASCIIAlpha(c) || isASCIIDigit(c);
}

function isASCIIHex(c) {
  return isASCIIDigit(c) || (c >= 0x41 && c <= 0x46) || (c >= 0x61 && c <= 0x66);
}

module.exports = {
  isASCIIDigit,
  isASCIIAlpha,
  isASCIIAlphanumeric,
  isASCIIHex
};


/***/ }),

/***/ 5687:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const { isASCIIHex } = __webpack_require__(9067);
const { utf8Encode } = __webpack_require__(2941);

// https://url.spec.whatwg.org/#percent-encode
function percentEncode(c) {
  let hex = c.toString(16).toUpperCase();
  if (hex.length === 1) {
    hex = "0" + hex;
  }

  return "%" + hex;
}

// https://url.spec.whatwg.org/#percent-decode
function percentDecodeBytes(input) {
  const output = new Uint8Array(input.byteLength);
  let outputIndex = 0;
  for (let i = 0; i < input.byteLength; ++i) {
    const byte = input[i];
    if (byte !== 0x25) {
      output[outputIndex++] = byte;
    } else if (byte === 0x25 && (!isASCIIHex(input[i + 1]) || !isASCIIHex(input[i + 2]))) {
      output[outputIndex++] = byte;
    } else {
      const bytePoint = parseInt(String.fromCodePoint(input[i + 1], input[i + 2]), 16);
      output[outputIndex++] = bytePoint;
      i += 2;
    }
  }

  // TODO: remove the Buffer.from in the next major version; it's only needed for back-compat, and sticking to standard
  // typed arrays is nicer and simpler.
  // See https://github.com/jsdom/data-urls/issues/17 for background.
  return Buffer.from(output.slice(0, outputIndex));
}

// https://url.spec.whatwg.org/#string-percent-decode
function percentDecodeString(input) {
  const bytes = utf8Encode(input);
  return percentDecodeBytes(bytes);
}

// https://url.spec.whatwg.org/#c0-control-percent-encode-set
function isC0ControlPercentEncode(c) {
  return c <= 0x1F || c > 0x7E;
}

// https://url.spec.whatwg.org/#fragment-percent-encode-set
const extraFragmentPercentEncodeSet = new Set([32, 34, 60, 62, 96]);
function isFragmentPercentEncode(c) {
  return isC0ControlPercentEncode(c) || extraFragmentPercentEncodeSet.has(c);
}

// https://url.spec.whatwg.org/#query-percent-encode-set
const extraQueryPercentEncodeSet = new Set([32, 34, 35, 60, 62]);
function isQueryPercentEncode(c) {
  return isC0ControlPercentEncode(c) || extraQueryPercentEncodeSet.has(c);
}

// https://url.spec.whatwg.org/#special-query-percent-encode-set
function isSpecialQueryPercentEncode(c) {
  return isQueryPercentEncode(c) || c === 39;
}

// https://url.spec.whatwg.org/#path-percent-encode-set
const extraPathPercentEncodeSet = new Set([63, 96, 123, 125]);
function isPathPercentEncode(c) {
  return isQueryPercentEncode(c) || extraPathPercentEncodeSet.has(c);
}

// https://url.spec.whatwg.org/#userinfo-percent-encode-set
const extraUserinfoPercentEncodeSet =
  new Set([47, 58, 59, 61, 64, 91, 92, 93, 94, 124]);
function isUserinfoPercentEncode(c) {
  return isPathPercentEncode(c) || extraUserinfoPercentEncodeSet.has(c);
}

// https://url.spec.whatwg.org/#component-percent-encode-set
const extraComponentPercentEncodeSet = new Set([36, 37, 38, 43, 44]);
function isComponentPercentEncode(c) {
  return isUserinfoPercentEncode(c) || extraComponentPercentEncodeSet.has(c);
}

// https://url.spec.whatwg.org/#application-x-www-form-urlencoded-percent-encode-set
const extraURLEncodedPercentEncodeSet = new Set([33, 39, 40, 41, 126]);
function isURLEncodedPercentEncode(c) {
  return isComponentPercentEncode(c) || extraURLEncodedPercentEncodeSet.has(c);
}

// https://url.spec.whatwg.org/#code-point-percent-encode-after-encoding
// https://url.spec.whatwg.org/#utf-8-percent-encode
// Assuming encoding is always utf-8 allows us to trim one of the logic branches. TODO: support encoding.
// The "-Internal" variant here has code points as JS strings. The external version used by other files has code points
// as JS numbers, like the rest of the codebase.
function utf8PercentEncodeCodePointInternal(codePoint, percentEncodePredicate) {
  const bytes = utf8Encode(codePoint);
  let output = "";
  for (const byte of bytes) {
    // Our percentEncodePredicate operates on bytes, not code points, so this is slightly different from the spec.
    if (!percentEncodePredicate(byte)) {
      output += String.fromCharCode(byte);
    } else {
      output += percentEncode(byte);
    }
  }

  return output;
}

function utf8PercentEncodeCodePoint(codePoint, percentEncodePredicate) {
  return utf8PercentEncodeCodePointInternal(String.fromCodePoint(codePoint), percentEncodePredicate);
}

// https://url.spec.whatwg.org/#string-percent-encode-after-encoding
// https://url.spec.whatwg.org/#string-utf-8-percent-encode
function utf8PercentEncodeString(input, percentEncodePredicate, spaceAsPlus = false) {
  let output = "";
  for (const codePoint of input) {
    if (spaceAsPlus && codePoint === " ") {
      output += "+";
    } else {
      output += utf8PercentEncodeCodePointInternal(codePoint, percentEncodePredicate);
    }
  }
  return output;
}

module.exports = {
  isC0ControlPercentEncode,
  isFragmentPercentEncode,
  isQueryPercentEncode,
  isSpecialQueryPercentEncode,
  isPathPercentEncode,
  isUserinfoPercentEncode,
  isURLEncodedPercentEncode,
  percentDecodeString,
  percentDecodeBytes,
  utf8PercentEncodeString,
  utf8PercentEncodeCodePoint
};


/***/ }),

/***/ 919:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const punycode = __webpack_require__(4213);
const tr46 = __webpack_require__(4256);

const infra = __webpack_require__(9067);
const { utf8DecodeWithoutBOM } = __webpack_require__(2941);
const { percentDecodeString, utf8PercentEncodeCodePoint, utf8PercentEncodeString, isC0ControlPercentEncode,
  isFragmentPercentEncode, isQueryPercentEncode, isSpecialQueryPercentEncode, isPathPercentEncode,
  isUserinfoPercentEncode } = __webpack_require__(5687);

const specialSchemes = {
  ftp: 21,
  file: null,
  http: 80,
  https: 443,
  ws: 80,
  wss: 443
};

const failure = Symbol("failure");

function countSymbols(str) {
  return [...str].length;
}

function at(input, idx) {
  const c = input[idx];
  return isNaN(c) ? undefined : String.fromCodePoint(c);
}

function isSingleDot(buffer) {
  return buffer === "." || buffer.toLowerCase() === "%2e";
}

function isDoubleDot(buffer) {
  buffer = buffer.toLowerCase();
  return buffer === ".." || buffer === "%2e." || buffer === ".%2e" || buffer === "%2e%2e";
}

function isWindowsDriveLetterCodePoints(cp1, cp2) {
  return infra.isASCIIAlpha(cp1) && (cp2 === 58 || cp2 === 124);
}

function isWindowsDriveLetterString(string) {
  return string.length === 2 && infra.isASCIIAlpha(string.codePointAt(0)) && (string[1] === ":" || string[1] === "|");
}

function isNormalizedWindowsDriveLetterString(string) {
  return string.length === 2 && infra.isASCIIAlpha(string.codePointAt(0)) && string[1] === ":";
}

function containsForbiddenHostCodePoint(string) {
  return string.search(/\u0000|\u0009|\u000A|\u000D|\u0020|#|%|\/|:|<|>|\?|@|\[|\\|\]|\^/) !== -1;
}

function containsForbiddenHostCodePointExcludingPercent(string) {
  return string.search(/\u0000|\u0009|\u000A|\u000D|\u0020|#|\/|:|<|>|\?|@|\[|\\|\]|\^/) !== -1;
}

function isSpecialScheme(scheme) {
  return specialSchemes[scheme] !== undefined;
}

function isSpecial(url) {
  return isSpecialScheme(url.scheme);
}

function isNotSpecial(url) {
  return !isSpecialScheme(url.scheme);
}

function defaultPort(scheme) {
  return specialSchemes[scheme];
}

function parseIPv4Number(input) {
  let R = 10;

  if (input.length >= 2 && input.charAt(0) === "0" && input.charAt(1).toLowerCase() === "x") {
    input = input.substring(2);
    R = 16;
  } else if (input.length >= 2 && input.charAt(0) === "0") {
    input = input.substring(1);
    R = 8;
  }

  if (input === "") {
    return 0;
  }

  let regex = /[^0-7]/;
  if (R === 10) {
    regex = /[^0-9]/;
  }
  if (R === 16) {
    regex = /[^0-9A-Fa-f]/;
  }

  if (regex.test(input)) {
    return failure;
  }

  return parseInt(input, R);
}

function parseIPv4(input) {
  const parts = input.split(".");
  if (parts[parts.length - 1] === "") {
    if (parts.length > 1) {
      parts.pop();
    }
  }

  if (parts.length > 4) {
    return input;
  }

  const numbers = [];
  for (const part of parts) {
    if (part === "") {
      return input;
    }
    const n = parseIPv4Number(part);
    if (n === failure) {
      return input;
    }

    numbers.push(n);
  }

  for (let i = 0; i < numbers.length - 1; ++i) {
    if (numbers[i] > 255) {
      return failure;
    }
  }
  if (numbers[numbers.length - 1] >= Math.pow(256, 5 - numbers.length)) {
    return failure;
  }

  let ipv4 = numbers.pop();
  let counter = 0;

  for (const n of numbers) {
    ipv4 += n * Math.pow(256, 3 - counter);
    ++counter;
  }

  return ipv4;
}

function serializeIPv4(address) {
  let output = "";
  let n = address;

  for (let i = 1; i <= 4; ++i) {
    output = String(n % 256) + output;
    if (i !== 4) {
      output = "." + output;
    }
    n = Math.floor(n / 256);
  }

  return output;
}

function parseIPv6(input) {
  const address = [0, 0, 0, 0, 0, 0, 0, 0];
  let pieceIndex = 0;
  let compress = null;
  let pointer = 0;

  input = punycode.ucs2.decode(input);

  if (input[pointer] === 58) {
    if (input[pointer + 1] !== 58) {
      return failure;
    }

    pointer += 2;
    ++pieceIndex;
    compress = pieceIndex;
  }

  while (pointer < input.length) {
    if (pieceIndex === 8) {
      return failure;
    }

    if (input[pointer] === 58) {
      if (compress !== null) {
        return failure;
      }
      ++pointer;
      ++pieceIndex;
      compress = pieceIndex;
      continue;
    }

    let value = 0;
    let length = 0;

    while (length < 4 && infra.isASCIIHex(input[pointer])) {
      value = value * 0x10 + parseInt(at(input, pointer), 16);
      ++pointer;
      ++length;
    }

    if (input[pointer] === 46) {
      if (length === 0) {
        return failure;
      }

      pointer -= length;

      if (pieceIndex > 6) {
        return failure;
      }

      let numbersSeen = 0;

      while (input[pointer] !== undefined) {
        let ipv4Piece = null;

        if (numbersSeen > 0) {
          if (input[pointer] === 46 && numbersSeen < 4) {
            ++pointer;
          } else {
            return failure;
          }
        }

        if (!infra.isASCIIDigit(input[pointer])) {
          return failure;
        }

        while (infra.isASCIIDigit(input[pointer])) {
          const number = parseInt(at(input, pointer));
          if (ipv4Piece === null) {
            ipv4Piece = number;
          } else if (ipv4Piece === 0) {
            return failure;
          } else {
            ipv4Piece = ipv4Piece * 10 + number;
          }
          if (ipv4Piece > 255) {
            return failure;
          }
          ++pointer;
        }

        address[pieceIndex] = address[pieceIndex] * 0x100 + ipv4Piece;

        ++numbersSeen;

        if (numbersSeen === 2 || numbersSeen === 4) {
          ++pieceIndex;
        }
      }

      if (numbersSeen !== 4) {
        return failure;
      }

      break;
    } else if (input[pointer] === 58) {
      ++pointer;
      if (input[pointer] === undefined) {
        return failure;
      }
    } else if (input[pointer] !== undefined) {
      return failure;
    }

    address[pieceIndex] = value;
    ++pieceIndex;
  }

  if (compress !== null) {
    let swaps = pieceIndex - compress;
    pieceIndex = 7;
    while (pieceIndex !== 0 && swaps > 0) {
      const temp = address[compress + swaps - 1];
      address[compress + swaps - 1] = address[pieceIndex];
      address[pieceIndex] = temp;
      --pieceIndex;
      --swaps;
    }
  } else if (compress === null && pieceIndex !== 8) {
    return failure;
  }

  return address;
}

function serializeIPv6(address) {
  let output = "";
  const compress = findLongestZeroSequence(address);
  let ignore0 = false;

  for (let pieceIndex = 0; pieceIndex <= 7; ++pieceIndex) {
    if (ignore0 && address[pieceIndex] === 0) {
      continue;
    } else if (ignore0) {
      ignore0 = false;
    }

    if (compress === pieceIndex) {
      const separator = pieceIndex === 0 ? "::" : ":";
      output += separator;
      ignore0 = true;
      continue;
    }

    output += address[pieceIndex].toString(16);

    if (pieceIndex !== 7) {
      output += ":";
    }
  }

  return output;
}

function parseHost(input, isNotSpecialArg = false) {
  if (input[0] === "[") {
    if (input[input.length - 1] !== "]") {
      return failure;
    }

    return parseIPv6(input.substring(1, input.length - 1));
  }

  if (isNotSpecialArg) {
    return parseOpaqueHost(input);
  }

  const domain = utf8DecodeWithoutBOM(percentDecodeString(input));
  const asciiDomain = domainToASCII(domain);
  if (asciiDomain === failure) {
    return failure;
  }

  if (containsForbiddenHostCodePoint(asciiDomain)) {
    return failure;
  }

  const ipv4Host = parseIPv4(asciiDomain);
  if (typeof ipv4Host === "number" || ipv4Host === failure) {
    return ipv4Host;
  }

  return asciiDomain;
}

function parseOpaqueHost(input) {
  if (containsForbiddenHostCodePointExcludingPercent(input)) {
    return failure;
  }

  return utf8PercentEncodeString(input, isC0ControlPercentEncode);
}

function findLongestZeroSequence(arr) {
  let maxIdx = null;
  let maxLen = 1; // only find elements > 1
  let currStart = null;
  let currLen = 0;

  for (let i = 0; i < arr.length; ++i) {
    if (arr[i] !== 0) {
      if (currLen > maxLen) {
        maxIdx = currStart;
        maxLen = currLen;
      }

      currStart = null;
      currLen = 0;
    } else {
      if (currStart === null) {
        currStart = i;
      }
      ++currLen;
    }
  }

  // if trailing zeros
  if (currLen > maxLen) {
    return currStart;
  }

  return maxIdx;
}

function serializeHost(host) {
  if (typeof host === "number") {
    return serializeIPv4(host);
  }

  // IPv6 serializer
  if (host instanceof Array) {
    return "[" + serializeIPv6(host) + "]";
  }

  return host;
}

function domainToASCII(domain, beStrict = false) {
  const result = tr46.toASCII(domain, {
    checkBidi: true,
    checkHyphens: false,
    checkJoiners: true,
    useSTD3ASCIIRules: beStrict,
    verifyDNSLength: beStrict
  });
  if (result === null || result === "") {
    return failure;
  }
  return result;
}

function trimControlChars(url) {
  return url.replace(/^[\u0000-\u001F\u0020]+|[\u0000-\u001F\u0020]+$/g, "");
}

function trimTabAndNewline(url) {
  return url.replace(/\u0009|\u000A|\u000D/g, "");
}

function shortenPath(url) {
  const { path } = url;
  if (path.length === 0) {
    return;
  }
  if (url.scheme === "file" && path.length === 1 && isNormalizedWindowsDriveLetter(path[0])) {
    return;
  }

  path.pop();
}

function includesCredentials(url) {
  return url.username !== "" || url.password !== "";
}

function cannotHaveAUsernamePasswordPort(url) {
  return url.host === null || url.host === "" || url.cannotBeABaseURL || url.scheme === "file";
}

function isNormalizedWindowsDriveLetter(string) {
  return /^[A-Za-z]:$/.test(string);
}

function URLStateMachine(input, base, encodingOverride, url, stateOverride) {
  this.pointer = 0;
  this.input = input;
  this.base = base || null;
  this.encodingOverride = encodingOverride || "utf-8";
  this.stateOverride = stateOverride;
  this.url = url;
  this.failure = false;
  this.parseError = false;

  if (!this.url) {
    this.url = {
      scheme: "",
      username: "",
      password: "",
      host: null,
      port: null,
      path: [],
      query: null,
      fragment: null,

      cannotBeABaseURL: false
    };

    const res = trimControlChars(this.input);
    if (res !== this.input) {
      this.parseError = true;
    }
    this.input = res;
  }

  const res = trimTabAndNewline(this.input);
  if (res !== this.input) {
    this.parseError = true;
  }
  this.input = res;

  this.state = stateOverride || "scheme start";

  this.buffer = "";
  this.atFlag = false;
  this.arrFlag = false;
  this.passwordTokenSeenFlag = false;

  this.input = punycode.ucs2.decode(this.input);

  for (; this.pointer <= this.input.length; ++this.pointer) {
    const c = this.input[this.pointer];
    const cStr = isNaN(c) ? undefined : String.fromCodePoint(c);

    // exec state machine
    const ret = this["parse " + this.state](c, cStr);
    if (!ret) {
      break; // terminate algorithm
    } else if (ret === failure) {
      this.failure = true;
      break;
    }
  }
}

URLStateMachine.prototype["parse scheme start"] = function parseSchemeStart(c, cStr) {
  if (infra.isASCIIAlpha(c)) {
    this.buffer += cStr.toLowerCase();
    this.state = "scheme";
  } else if (!this.stateOverride) {
    this.state = "no scheme";
    --this.pointer;
  } else {
    this.parseError = true;
    return failure;
  }

  return true;
};

URLStateMachine.prototype["parse scheme"] = function parseScheme(c, cStr) {
  if (infra.isASCIIAlphanumeric(c) || c === 43 || c === 45 || c === 46) {
    this.buffer += cStr.toLowerCase();
  } else if (c === 58) {
    if (this.stateOverride) {
      if (isSpecial(this.url) && !isSpecialScheme(this.buffer)) {
        return false;
      }

      if (!isSpecial(this.url) && isSpecialScheme(this.buffer)) {
        return false;
      }

      if ((includesCredentials(this.url) || this.url.port !== null) && this.buffer === "file") {
        return false;
      }

      if (this.url.scheme === "file" && this.url.host === "") {
        return false;
      }
    }
    this.url.scheme = this.buffer;
    if (this.stateOverride) {
      if (this.url.port === defaultPort(this.url.scheme)) {
        this.url.port = null;
      }
      return false;
    }
    this.buffer = "";
    if (this.url.scheme === "file") {
      if (this.input[this.pointer + 1] !== 47 || this.input[this.pointer + 2] !== 47) {
        this.parseError = true;
      }
      this.state = "file";
    } else if (isSpecial(this.url) && this.base !== null && this.base.scheme === this.url.scheme) {
      this.state = "special relative or authority";
    } else if (isSpecial(this.url)) {
      this.state = "special authority slashes";
    } else if (this.input[this.pointer + 1] === 47) {
      this.state = "path or authority";
      ++this.pointer;
    } else {
      this.url.cannotBeABaseURL = true;
      this.url.path.push("");
      this.state = "cannot-be-a-base-URL path";
    }
  } else if (!this.stateOverride) {
    this.buffer = "";
    this.state = "no scheme";
    this.pointer = -1;
  } else {
    this.parseError = true;
    return failure;
  }

  return true;
};

URLStateMachine.prototype["parse no scheme"] = function parseNoScheme(c) {
  if (this.base === null || (this.base.cannotBeABaseURL && c !== 35)) {
    return failure;
  } else if (this.base.cannotBeABaseURL && c === 35) {
    this.url.scheme = this.base.scheme;
    this.url.path = this.base.path.slice();
    this.url.query = this.base.query;
    this.url.fragment = "";
    this.url.cannotBeABaseURL = true;
    this.state = "fragment";
  } else if (this.base.scheme === "file") {
    this.state = "file";
    --this.pointer;
  } else {
    this.state = "relative";
    --this.pointer;
  }

  return true;
};

URLStateMachine.prototype["parse special relative or authority"] = function parseSpecialRelativeOrAuthority(c) {
  if (c === 47 && this.input[this.pointer + 1] === 47) {
    this.state = "special authority ignore slashes";
    ++this.pointer;
  } else {
    this.parseError = true;
    this.state = "relative";
    --this.pointer;
  }

  return true;
};

URLStateMachine.prototype["parse path or authority"] = function parsePathOrAuthority(c) {
  if (c === 47) {
    this.state = "authority";
  } else {
    this.state = "path";
    --this.pointer;
  }

  return true;
};

URLStateMachine.prototype["parse relative"] = function parseRelative(c) {
  this.url.scheme = this.base.scheme;
  if (c === 47) {
    this.state = "relative slash";
  } else if (isSpecial(this.url) && c === 92) {
    this.parseError = true;
    this.state = "relative slash";
  } else {
    this.url.username = this.base.username;
    this.url.password = this.base.password;
    this.url.host = this.base.host;
    this.url.port = this.base.port;
    this.url.path = this.base.path.slice();
    this.url.query = this.base.query;
    if (c === 63) {
      this.url.query = "";
      this.state = "query";
    } else if (c === 35) {
      this.url.fragment = "";
      this.state = "fragment";
    } else if (!isNaN(c)) {
      this.url.query = null;
      this.url.path.pop();
      this.state = "path";
      --this.pointer;
    }
  }

  return true;
};

URLStateMachine.prototype["parse relative slash"] = function parseRelativeSlash(c) {
  if (isSpecial(this.url) && (c === 47 || c === 92)) {
    if (c === 92) {
      this.parseError = true;
    }
    this.state = "special authority ignore slashes";
  } else if (c === 47) {
    this.state = "authority";
  } else {
    this.url.username = this.base.username;
    this.url.password = this.base.password;
    this.url.host = this.base.host;
    this.url.port = this.base.port;
    this.state = "path";
    --this.pointer;
  }

  return true;
};

URLStateMachine.prototype["parse special authority slashes"] = function parseSpecialAuthoritySlashes(c) {
  if (c === 47 && this.input[this.pointer + 1] === 47) {
    this.state = "special authority ignore slashes";
    ++this.pointer;
  } else {
    this.parseError = true;
    this.state = "special authority ignore slashes";
    --this.pointer;
  }

  return true;
};

URLStateMachine.prototype["parse special authority ignore slashes"] = function parseSpecialAuthorityIgnoreSlashes(c) {
  if (c !== 47 && c !== 92) {
    this.state = "authority";
    --this.pointer;
  } else {
    this.parseError = true;
  }

  return true;
};

URLStateMachine.prototype["parse authority"] = function parseAuthority(c, cStr) {
  if (c === 64) {
    this.parseError = true;
    if (this.atFlag) {
      this.buffer = "%40" + this.buffer;
    }
    this.atFlag = true;

    // careful, this is based on buffer and has its own pointer (this.pointer != pointer) and inner chars
    const len = countSymbols(this.buffer);
    for (let pointer = 0; pointer < len; ++pointer) {
      const codePoint = this.buffer.codePointAt(pointer);

      if (codePoint === 58 && !this.passwordTokenSeenFlag) {
        this.passwordTokenSeenFlag = true;
        continue;
      }
      const encodedCodePoints = utf8PercentEncodeCodePoint(codePoint, isUserinfoPercentEncode);
      if (this.passwordTokenSeenFlag) {
        this.url.password += encodedCodePoints;
      } else {
        this.url.username += encodedCodePoints;
      }
    }
    this.buffer = "";
  } else if (isNaN(c) || c === 47 || c === 63 || c === 35 ||
             (isSpecial(this.url) && c === 92)) {
    if (this.atFlag && this.buffer === "") {
      this.parseError = true;
      return failure;
    }
    this.pointer -= countSymbols(this.buffer) + 1;
    this.buffer = "";
    this.state = "host";
  } else {
    this.buffer += cStr;
  }

  return true;
};

URLStateMachine.prototype["parse hostname"] =
URLStateMachine.prototype["parse host"] = function parseHostName(c, cStr) {
  if (this.stateOverride && this.url.scheme === "file") {
    --this.pointer;
    this.state = "file host";
  } else if (c === 58 && !this.arrFlag) {
    if (this.buffer === "") {
      this.parseError = true;
      return failure;
    }

    const host = parseHost(this.buffer, isNotSpecial(this.url));
    if (host === failure) {
      return failure;
    }

    this.url.host = host;
    this.buffer = "";
    this.state = "port";
    if (this.stateOverride === "hostname") {
      return false;
    }
  } else if (isNaN(c) || c === 47 || c === 63 || c === 35 ||
             (isSpecial(this.url) && c === 92)) {
    --this.pointer;
    if (isSpecial(this.url) && this.buffer === "") {
      this.parseError = true;
      return failure;
    } else if (this.stateOverride && this.buffer === "" &&
               (includesCredentials(this.url) || this.url.port !== null)) {
      this.parseError = true;
      return false;
    }

    const host = parseHost(this.buffer, isNotSpecial(this.url));
    if (host === failure) {
      return failure;
    }

    this.url.host = host;
    this.buffer = "";
    this.state = "path start";
    if (this.stateOverride) {
      return false;
    }
  } else {
    if (c === 91) {
      this.arrFlag = true;
    } else if (c === 93) {
      this.arrFlag = false;
    }
    this.buffer += cStr;
  }

  return true;
};

URLStateMachine.prototype["parse port"] = function parsePort(c, cStr) {
  if (infra.isASCIIDigit(c)) {
    this.buffer += cStr;
  } else if (isNaN(c) || c === 47 || c === 63 || c === 35 ||
             (isSpecial(this.url) && c === 92) ||
             this.stateOverride) {
    if (this.buffer !== "") {
      const port = parseInt(this.buffer);
      if (port > Math.pow(2, 16) - 1) {
        this.parseError = true;
        return failure;
      }
      this.url.port = port === defaultPort(this.url.scheme) ? null : port;
      this.buffer = "";
    }
    if (this.stateOverride) {
      return false;
    }
    this.state = "path start";
    --this.pointer;
  } else {
    this.parseError = true;
    return failure;
  }

  return true;
};

const fileOtherwiseCodePoints = new Set([47, 92, 63, 35]);

function startsWithWindowsDriveLetter(input, pointer) {
  const length = input.length - pointer;
  return length >= 2 &&
    isWindowsDriveLetterCodePoints(input[pointer], input[pointer + 1]) &&
    (length === 2 || fileOtherwiseCodePoints.has(input[pointer + 2]));
}

URLStateMachine.prototype["parse file"] = function parseFile(c) {
  this.url.scheme = "file";
  this.url.host = "";

  if (c === 47 || c === 92) {
    if (c === 92) {
      this.parseError = true;
    }
    this.state = "file slash";
  } else if (this.base !== null && this.base.scheme === "file") {
    this.url.host = this.base.host;
    this.url.path = this.base.path.slice();
    this.url.query = this.base.query;
    if (c === 63) {
      this.url.query = "";
      this.state = "query";
    } else if (c === 35) {
      this.url.fragment = "";
      this.state = "fragment";
    } else if (!isNaN(c)) {
      this.url.query = null;
      if (!startsWithWindowsDriveLetter(this.input, this.pointer)) {
        shortenPath(this.url);
      } else {
        this.parseError = true;
        this.url.path = [];
      }

      this.state = "path";
      --this.pointer;
    }
  } else {
    this.state = "path";
    --this.pointer;
  }

  return true;
};

URLStateMachine.prototype["parse file slash"] = function parseFileSlash(c) {
  if (c === 47 || c === 92) {
    if (c === 92) {
      this.parseError = true;
    }
    this.state = "file host";
  } else {
    if (this.base !== null && this.base.scheme === "file") {
      if (!startsWithWindowsDriveLetter(this.input, this.pointer) &&
          isNormalizedWindowsDriveLetterString(this.base.path[0])) {
        this.url.path.push(this.base.path[0]);
      }
      this.url.host = this.base.host;
    }
    this.state = "path";
    --this.pointer;
  }

  return true;
};

URLStateMachine.prototype["parse file host"] = function parseFileHost(c, cStr) {
  if (isNaN(c) || c === 47 || c === 92 || c === 63 || c === 35) {
    --this.pointer;
    if (!this.stateOverride && isWindowsDriveLetterString(this.buffer)) {
      this.parseError = true;
      this.state = "path";
    } else if (this.buffer === "") {
      this.url.host = "";
      if (this.stateOverride) {
        return false;
      }
      this.state = "path start";
    } else {
      let host = parseHost(this.buffer, isNotSpecial(this.url));
      if (host === failure) {
        return failure;
      }
      if (host === "localhost") {
        host = "";
      }
      this.url.host = host;

      if (this.stateOverride) {
        return false;
      }

      this.buffer = "";
      this.state = "path start";
    }
  } else {
    this.buffer += cStr;
  }

  return true;
};

URLStateMachine.prototype["parse path start"] = function parsePathStart(c) {
  if (isSpecial(this.url)) {
    if (c === 92) {
      this.parseError = true;
    }
    this.state = "path";

    if (c !== 47 && c !== 92) {
      --this.pointer;
    }
  } else if (!this.stateOverride && c === 63) {
    this.url.query = "";
    this.state = "query";
  } else if (!this.stateOverride && c === 35) {
    this.url.fragment = "";
    this.state = "fragment";
  } else if (c !== undefined) {
    this.state = "path";
    if (c !== 47) {
      --this.pointer;
    }
  }

  return true;
};

URLStateMachine.prototype["parse path"] = function parsePath(c) {
  if (isNaN(c) || c === 47 || (isSpecial(this.url) && c === 92) ||
      (!this.stateOverride && (c === 63 || c === 35))) {
    if (isSpecial(this.url) && c === 92) {
      this.parseError = true;
    }

    if (isDoubleDot(this.buffer)) {
      shortenPath(this.url);
      if (c !== 47 && !(isSpecial(this.url) && c === 92)) {
        this.url.path.push("");
      }
    } else if (isSingleDot(this.buffer) && c !== 47 &&
               !(isSpecial(this.url) && c === 92)) {
      this.url.path.push("");
    } else if (!isSingleDot(this.buffer)) {
      if (this.url.scheme === "file" && this.url.path.length === 0 && isWindowsDriveLetterString(this.buffer)) {
        this.buffer = this.buffer[0] + ":";
      }
      this.url.path.push(this.buffer);
    }
    this.buffer = "";
    if (c === 63) {
      this.url.query = "";
      this.state = "query";
    }
    if (c === 35) {
      this.url.fragment = "";
      this.state = "fragment";
    }
  } else {
    // TODO: If c is not a URL code point and not "%", parse error.

    if (c === 37 &&
      (!infra.isASCIIHex(this.input[this.pointer + 1]) ||
        !infra.isASCIIHex(this.input[this.pointer + 2]))) {
      this.parseError = true;
    }

    this.buffer += utf8PercentEncodeCodePoint(c, isPathPercentEncode);
  }

  return true;
};

URLStateMachine.prototype["parse cannot-be-a-base-URL path"] = function parseCannotBeABaseURLPath(c) {
  if (c === 63) {
    this.url.query = "";
    this.state = "query";
  } else if (c === 35) {
    this.url.fragment = "";
    this.state = "fragment";
  } else {
    // TODO: Add: not a URL code point
    if (!isNaN(c) && c !== 37) {
      this.parseError = true;
    }

    if (c === 37 &&
        (!infra.isASCIIHex(this.input[this.pointer + 1]) ||
         !infra.isASCIIHex(this.input[this.pointer + 2]))) {
      this.parseError = true;
    }

    if (!isNaN(c)) {
      this.url.path[0] += utf8PercentEncodeCodePoint(c, isC0ControlPercentEncode);
    }
  }

  return true;
};

URLStateMachine.prototype["parse query"] = function parseQuery(c) {
  if (!isSpecial(this.url) || this.url.scheme === "ws" || this.url.scheme === "wss") {
    this.encodingOverride = "utf-8";
  }

  if (!this.stateOverride & c === 35) {
    this.url.fragment = "";
    this.state = "fragment";
  } else if (!isNaN(c)) {
    // TODO: If c is not a URL code point and not "%", parse error.

    if (c === 37 &&
      (!infra.isASCIIHex(this.input[this.pointer + 1]) ||
        !infra.isASCIIHex(this.input[this.pointer + 2]))) {
      this.parseError = true;
    }

    const queryPercentEncodePredicate = isSpecial(this.url) ? isSpecialQueryPercentEncode : isQueryPercentEncode;
    // TODO: use "percent-encode after encoding" passing in this.encodingOverride
    this.url.query += utf8PercentEncodeCodePoint(c, queryPercentEncodePredicate);
  }

  return true;
};

URLStateMachine.prototype["parse fragment"] = function parseFragment(c) {
  if (!isNaN(c)) {
    // TODO: If c is not a URL code point and not "%", parse error.
    if (c === 37 &&
      (!infra.isASCIIHex(this.input[this.pointer + 1]) ||
        !infra.isASCIIHex(this.input[this.pointer + 2]))) {
      this.parseError = true;
    }

    this.url.fragment += utf8PercentEncodeCodePoint(c, isFragmentPercentEncode);
  }

  return true;
};

function serializeURL(url, excludeFragment) {
  let output = url.scheme + ":";
  if (url.host !== null) {
    output += "//";

    if (url.username !== "" || url.password !== "") {
      output += url.username;
      if (url.password !== "") {
        output += ":" + url.password;
      }
      output += "@";
    }

    output += serializeHost(url.host);

    if (url.port !== null) {
      output += ":" + url.port;
    }
  }

  if (url.cannotBeABaseURL) {
    output += url.path[0];
  } else {
    if (url.host === null && url.path.length > 1 && url.path[0] === "") {
      output += "/.";
    }
    for (const segment of url.path) {
      output += "/" + segment;
    }
  }

  if (url.query !== null) {
    output += "?" + url.query;
  }

  if (!excludeFragment && url.fragment !== null) {
    output += "#" + url.fragment;
  }

  return output;
}

function serializeOrigin(tuple) {
  let result = tuple.scheme + "://";
  result += serializeHost(tuple.host);

  if (tuple.port !== null) {
    result += ":" + tuple.port;
  }

  return result;
}

module.exports.serializeURL = serializeURL;

module.exports.serializeURLOrigin = function (url) {
  // https://url.spec.whatwg.org/#concept-url-origin
  switch (url.scheme) {
    case "blob":
      try {
        return module.exports.serializeURLOrigin(module.exports.parseURL(url.path[0]));
      } catch (e) {
        // serializing an opaque origin returns "null"
        return "null";
      }
    case "ftp":
    case "http":
    case "https":
    case "ws":
    case "wss":
      return serializeOrigin({
        scheme: url.scheme,
        host: url.host,
        port: url.port
      });
    case "file":
      // The spec says:
      // > Unfortunate as it is, this is left as an exercise to the reader. When in doubt, return a new opaque origin.
      // Browsers tested so far:
      // - Chrome says "file://", but treats file: URLs as cross-origin for most (all?) purposes; see e.g.
      //   https://bugs.chromium.org/p/chromium/issues/detail?id=37586
      // - Firefox says "null", but treats file: URLs as same-origin sometimes based on directory stuff; see
      //   https://developer.mozilla.org/en-US/docs/Archive/Misc_top_level/Same-origin_policy_for_file:_URIs
      return "null";
    default:
      // serializing an opaque origin returns "null"
      return "null";
  }
};

module.exports.basicURLParse = function (input, options) {
  if (options === undefined) {
    options = {};
  }

  const usm = new URLStateMachine(input, options.baseURL, options.encodingOverride, options.url, options.stateOverride);
  if (usm.failure) {
    return null;
  }

  return usm.url;
};

module.exports.setTheUsername = function (url, username) {
  url.username = utf8PercentEncodeString(username, isUserinfoPercentEncode);
};

module.exports.setThePassword = function (url, password) {
  url.password = utf8PercentEncodeString(password, isUserinfoPercentEncode);
};

module.exports.serializeHost = serializeHost;

module.exports.cannotHaveAUsernamePasswordPort = cannotHaveAUsernamePasswordPort;

module.exports.serializeInteger = function (integer) {
  return String(integer);
};

module.exports.parseURL = function (input, options) {
  if (options === undefined) {
    options = {};
  }

  // We don't handle blobs, so this just delegates:
  return module.exports.basicURLParse(input, { baseURL: options.baseURL, encodingOverride: options.encodingOverride });
};


/***/ }),

/***/ 9377:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const { utf8Encode, utf8DecodeWithoutBOM } = __webpack_require__(2941);
const { percentDecodeBytes, utf8PercentEncodeString, isURLEncodedPercentEncode } = __webpack_require__(5687);

// https://url.spec.whatwg.org/#concept-urlencoded-parser
function parseUrlencoded(input) {
  const sequences = strictlySplitByteSequence(input, 38);
  const output = [];
  for (const bytes of sequences) {
    if (bytes.length === 0) {
      continue;
    }

    let name;
    let value;
    const indexOfEqual = bytes.indexOf(61);

    if (indexOfEqual >= 0) {
      name = bytes.slice(0, indexOfEqual);
      value = bytes.slice(indexOfEqual + 1);
    } else {
      name = bytes;
      value = new Uint8Array(0);
    }

    name = replaceByteInByteSequence(name, 0x2B, 0x20);
    value = replaceByteInByteSequence(value, 0x2B, 0x20);

    const nameString = utf8DecodeWithoutBOM(percentDecodeBytes(name));
    const valueString = utf8DecodeWithoutBOM(percentDecodeBytes(value));

    output.push([nameString, valueString]);
  }
  return output;
}

// https://url.spec.whatwg.org/#concept-urlencoded-string-parser
function parseUrlencodedString(input) {
  return parseUrlencoded(utf8Encode(input));
}

// https://url.spec.whatwg.org/#concept-urlencoded-serializer
function serializeUrlencoded(tuples, encodingOverride = undefined) {
  let encoding = "utf-8";
  if (encodingOverride !== undefined) {
    // TODO "get the output encoding", i.e. handle encoding labels vs. names.
    encoding = encodingOverride;
  }

  let output = "";
  for (const [i, tuple] of tuples.entries()) {
    // TODO: handle encoding override

    const name = utf8PercentEncodeString(tuple[0], isURLEncodedPercentEncode, true);

    let value = tuple[1];
    if (tuple.length > 2 && tuple[2] !== undefined) {
      if (tuple[2] === "hidden" && name === "_charset_") {
        value = encoding;
      } else if (tuple[2] === "file") {
        // value is a File object
        value = value.name;
      }
    }

    value = utf8PercentEncodeString(value, isURLEncodedPercentEncode, true);

    if (i !== 0) {
      output += "&";
    }
    output += `${name}=${value}`;
  }
  return output;
}

function strictlySplitByteSequence(buf, cp) {
  const list = [];
  let last = 0;
  let i = buf.indexOf(cp);
  while (i >= 0) {
    list.push(buf.slice(last, i));
    last = i + 1;
    i = buf.indexOf(cp, last);
  }
  if (last !== buf.length) {
    list.push(buf.slice(last));
  }
  return list;
}

function replaceByteInByteSequence(buf, from, to) {
  let i = buf.indexOf(from);
  while (i >= 0) {
    buf[i] = to;
    i = buf.indexOf(from, i + 1);
  }
  return buf;
}

module.exports = {
  parseUrlencodedString,
  serializeUrlencoded
};


/***/ }),

/***/ 6012:
/***/ ((module, exports) => {

"use strict";


// Returns "Type(value) is Object" in ES terminology.
function isObject(value) {
  return typeof value === "object" && value !== null || typeof value === "function";
}

const hasOwn = Function.prototype.call.bind(Object.prototype.hasOwnProperty);

const wrapperSymbol = Symbol("wrapper");
const implSymbol = Symbol("impl");
const sameObjectCaches = Symbol("SameObject caches");
const ctorRegistrySymbol = Symbol.for("[webidl2js]  constructor registry");

function getSameObject(wrapper, prop, creator) {
  if (!wrapper[sameObjectCaches]) {
    wrapper[sameObjectCaches] = Object.create(null);
  }

  if (prop in wrapper[sameObjectCaches]) {
    return wrapper[sameObjectCaches][prop];
  }

  wrapper[sameObjectCaches][prop] = creator();
  return wrapper[sameObjectCaches][prop];
}

function wrapperForImpl(impl) {
  return impl ? impl[wrapperSymbol] : null;
}

function implForWrapper(wrapper) {
  return wrapper ? wrapper[implSymbol] : null;
}

function tryWrapperForImpl(impl) {
  const wrapper = wrapperForImpl(impl);
  return wrapper ? wrapper : impl;
}

function tryImplForWrapper(wrapper) {
  const impl = implForWrapper(wrapper);
  return impl ? impl : wrapper;
}

const iterInternalSymbol = Symbol("internal");
const IteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]()));
const AsyncIteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf(async function* () {}).prototype);

function isArrayIndexPropName(P) {
  if (typeof P !== "string") {
    return false;
  }
  const i = P >>> 0;
  if (i === Math.pow(2, 32) - 1) {
    return false;
  }
  const s = `${i}`;
  if (P !== s) {
    return false;
  }
  return true;
}

const byteLengthGetter =
    Object.getOwnPropertyDescriptor(ArrayBuffer.prototype, "byteLength").get;
function isArrayBuffer(value) {
  try {
    byteLengthGetter.call(value);
    return true;
  } catch (e) {
    return false;
  }
}

function iteratorResult([key, value], kind) {
  let result;
  switch (kind) {
    case "key":
      result = key;
      break;
    case "value":
      result = value;
      break;
    case "key+value":
      result = [key, value];
      break;
  }
  return { value: result, done: false };
}

const supportsPropertyIndex = Symbol("supports property index");
const supportedPropertyIndices = Symbol("supported property indices");
const supportsPropertyName = Symbol("supports property name");
const supportedPropertyNames = Symbol("supported property names");
const indexedGet = Symbol("indexed property get");
const indexedSetNew = Symbol("indexed property set new");
const indexedSetExisting = Symbol("indexed property set existing");
const namedGet = Symbol("named property get");
const namedSetNew = Symbol("named property set new");
const namedSetExisting = Symbol("named property set existing");
const namedDelete = Symbol("named property delete");

const asyncIteratorNext = Symbol("async iterator get the next iteration result");
const asyncIteratorReturn = Symbol("async iterator return steps");
const asyncIteratorInit = Symbol("async iterator initialization steps");
const asyncIteratorEOI = Symbol("async iterator end of iteration");

module.exports = exports = {
  isObject,
  hasOwn,
  wrapperSymbol,
  implSymbol,
  getSameObject,
  ctorRegistrySymbol,
  wrapperForImpl,
  implForWrapper,
  tryWrapperForImpl,
  tryImplForWrapper,
  iterInternalSymbol,
  IteratorPrototype,
  AsyncIteratorPrototype,
  isArrayBuffer,
  isArrayIndexPropName,
  supportsPropertyIndex,
  supportedPropertyIndices,
  supportsPropertyName,
  supportedPropertyNames,
  indexedGet,
  indexedSetNew,
  indexedSetExisting,
  namedGet,
  namedSetNew,
  namedSetExisting,
  namedDelete,
  asyncIteratorNext,
  asyncIteratorReturn,
  asyncIteratorInit,
  asyncIteratorEOI,
  iteratorResult
};


/***/ }),

/***/ 6365:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const { URL, URLSearchParams } = __webpack_require__(2107);
const urlStateMachine = __webpack_require__(919);
const percentEncoding = __webpack_require__(5687);

const sharedGlobalObject = {};
URL.install(sharedGlobalObject, ["Window"]);
URLSearchParams.install(sharedGlobalObject, ["Window"]);

exports.URL = sharedGlobalObject.URL;
exports.URLSearchParams = sharedGlobalObject.URLSearchParams;

exports.parseURL = urlStateMachine.parseURL;
exports.basicURLParse = urlStateMachine.basicURLParse;
exports.serializeURL = urlStateMachine.serializeURL;
exports.serializeHost = urlStateMachine.serializeHost;
exports.serializeInteger = urlStateMachine.serializeInteger;
exports.serializeURLOrigin = urlStateMachine.serializeURLOrigin;
exports.setTheUsername = urlStateMachine.setTheUsername;
exports.setThePassword = urlStateMachine.setThePassword;
exports.cannotHaveAUsernamePasswordPort = urlStateMachine.cannotHaveAUsernamePasswordPort;

exports.percentDecode = percentEncoding.percentDecodeBytes;


/***/ }),

/***/ 2107:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


const URL = __webpack_require__(2503);
const URLSearchParams = __webpack_require__(9044);

exports.URL = URL;
exports.URLSearchParams = URLSearchParams;


/***/ }),

/***/ 7195:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
function isNothing(subject) {
    return (typeof subject === 'undefined') || (null === subject);
}
exports.isNothing = isNothing;
function isObject(subject) {
    return (typeof subject === 'object') && (null !== subject);
}
exports.isObject = isObject;
function toArray(sequence) {
    if (Array.isArray(sequence)) {
        return sequence;
    }
    else if (isNothing(sequence)) {
        return [];
    }
    return [sequence];
}
exports.toArray = toArray;
function extend(target, source) {
    var index, length, key, sourceKeys;
    if (source) {
        sourceKeys = Object.keys(source);
        for (index = 0, length = sourceKeys.length; index < length; index += 1) {
            key = sourceKeys[index];
            target[key] = source[key];
        }
    }
    return target;
}
exports.extend = extend;
function repeat(string, count) {
    var result = '', cycle;
    for (cycle = 0; cycle < count; cycle += 1) {
        result += string;
    }
    return result;
}
exports.repeat = repeat;
function isNegativeZero(number) {
    return (0 === number) && (Number.NEGATIVE_INFINITY === 1 / number);
}
exports.isNegativeZero = isNegativeZero;
//# sourceMappingURL=common.js.map

/***/ }),

/***/ 5730:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var common = __webpack_require__(7195);
var YAMLException = __webpack_require__(1629);
var DEFAULT_FULL_SCHEMA = __webpack_require__(5589);
var DEFAULT_SAFE_SCHEMA = __webpack_require__(8518);
var _toString = Object.prototype.toString;
var _hasOwnProperty = Object.prototype.hasOwnProperty;
var CHAR_TAB = 0x09;
var CHAR_LINE_FEED = 0x0A;
var CHAR_CARRIAGE_RETURN = 0x0D;
var CHAR_SPACE = 0x20;
var CHAR_EXCLAMATION = 0x21;
var CHAR_DOUBLE_QUOTE = 0x22;
var CHAR_SHARP = 0x23;
var CHAR_PERCENT = 0x25;
var CHAR_AMPERSAND = 0x26;
var CHAR_SINGLE_QUOTE = 0x27;
var CHAR_ASTERISK = 0x2A;
var CHAR_COMMA = 0x2C;
var CHAR_MINUS = 0x2D;
var CHAR_COLON = 0x3A;
var CHAR_GREATER_THAN = 0x3E;
var CHAR_QUESTION = 0x3F;
var CHAR_COMMERCIAL_AT = 0x40;
var CHAR_LEFT_SQUARE_BRACKET = 0x5B;
var CHAR_RIGHT_SQUARE_BRACKET = 0x5D;
var CHAR_GRAVE_ACCENT = 0x60;
var CHAR_LEFT_CURLY_BRACKET = 0x7B;
var CHAR_VERTICAL_LINE = 0x7C;
var CHAR_RIGHT_CURLY_BRACKET = 0x7D;
var ESCAPE_SEQUENCES = {};
ESCAPE_SEQUENCES[0x00] = '\\0';
ESCAPE_SEQUENCES[0x07] = '\\a';
ESCAPE_SEQUENCES[0x08] = '\\b';
ESCAPE_SEQUENCES[0x09] = '\\t';
ESCAPE_SEQUENCES[0x0A] = '\\n';
ESCAPE_SEQUENCES[0x0B] = '\\v';
ESCAPE_SEQUENCES[0x0C] = '\\f';
ESCAPE_SEQUENCES[0x0D] = '\\r';
ESCAPE_SEQUENCES[0x1B] = '\\e';
ESCAPE_SEQUENCES[0x22] = '\\"';
ESCAPE_SEQUENCES[0x5C] = '\\\\';
ESCAPE_SEQUENCES[0x85] = '\\N';
ESCAPE_SEQUENCES[0xA0] = '\\_';
ESCAPE_SEQUENCES[0x2028] = '\\L';
ESCAPE_SEQUENCES[0x2029] = '\\P';
var DEPRECATED_BOOLEANS_SYNTAX = [
    'y', 'Y', 'yes', 'Yes', 'YES', 'on', 'On', 'ON',
    'n', 'N', 'no', 'No', 'NO', 'off', 'Off', 'OFF'
];
function compileStyleMap(schema, map) {
    var result, keys, index, length, tag, style, type;
    if (null === map) {
        return {};
    }
    result = {};
    keys = Object.keys(map);
    for (index = 0, length = keys.length; index < length; index += 1) {
        tag = keys[index];
        style = String(map[tag]);
        if ('!!' === tag.slice(0, 2)) {
            tag = 'tag:yaml.org,2002:' + tag.slice(2);
        }
        type = schema.compiledTypeMap[tag];
        if (type && _hasOwnProperty.call(type.styleAliases, style)) {
            style = type.styleAliases[style];
        }
        result[tag] = style;
    }
    return result;
}
function encodeHex(character) {
    var string, handle, length;
    string = character.toString(16).toUpperCase();
    if (character <= 0xFF) {
        handle = 'x';
        length = 2;
    }
    else if (character <= 0xFFFF) {
        handle = 'u';
        length = 4;
    }
    else if (character <= 0xFFFFFFFF) {
        handle = 'U';
        length = 8;
    }
    else {
        throw new YAMLException('code point within a string may not be greater than 0xFFFFFFFF');
    }
    return '\\' + handle + common.repeat('0', length - string.length) + string;
}
function State(options) {
    this.schema = options['schema'] || DEFAULT_FULL_SCHEMA;
    this.indent = Math.max(1, (options['indent'] || 2));
    this.skipInvalid = options['skipInvalid'] || false;
    this.flowLevel = (common.isNothing(options['flowLevel']) ? -1 : options['flowLevel']);
    this.styleMap = compileStyleMap(this.schema, options['styles'] || null);
    this.implicitTypes = this.schema.compiledImplicit;
    this.explicitTypes = this.schema.compiledExplicit;
    this.tag = null;
    this.result = '';
    this.duplicates = [];
    this.usedDuplicates = null;
}
function indentString(string, spaces) {
    var ind = common.repeat(' ', spaces), position = 0, next = -1, result = '', line, length = string.length;
    while (position < length) {
        next = string.indexOf('\n', position);
        if (next === -1) {
            line = string.slice(position);
            position = length;
        }
        else {
            line = string.slice(position, next + 1);
            position = next + 1;
        }
        if (line.length && line !== '\n') {
            result += ind;
        }
        result += line;
    }
    return result;
}
function generateNextLine(state, level) {
    return '\n' + common.repeat(' ', state.indent * level);
}
function testImplicitResolving(state, str) {
    var index, length, type;
    for (index = 0, length = state.implicitTypes.length; index < length; index += 1) {
        type = state.implicitTypes[index];
        if (type.resolve(str)) {
            return true;
        }
    }
    return false;
}
function StringBuilder(source) {
    this.source = source;
    this.result = '';
    this.checkpoint = 0;
}
StringBuilder.prototype.takeUpTo = function (position) {
    var er;
    if (position < this.checkpoint) {
        er = new Error('position should be > checkpoint');
        er.position = position;
        er.checkpoint = this.checkpoint;
        throw er;
    }
    this.result += this.source.slice(this.checkpoint, position);
    this.checkpoint = position;
    return this;
};
StringBuilder.prototype.escapeChar = function () {
    var character, esc;
    character = this.source.charCodeAt(this.checkpoint);
    esc = ESCAPE_SEQUENCES[character] || encodeHex(character);
    this.result += esc;
    this.checkpoint += 1;
    return this;
};
StringBuilder.prototype.finish = function () {
    if (this.source.length > this.checkpoint) {
        this.takeUpTo(this.source.length);
    }
};
function writeScalar(state, object, level) {
    var simple, first, spaceWrap, folded, literal, single, double, sawLineFeed, linePosition, longestLine, indent, max, character, position, escapeSeq, hexEsc, previous, lineLength, modifier, trailingLineBreaks, result;
    if (0 === object.length) {
        state.dump = "''";
        return;
    }
    if (object.indexOf("!include") == 0) {
        state.dump = "" + object;
        return;
    }
    if (object.indexOf("!$$$novalue") == 0) {
        state.dump = "";
        return;
    }
    if (-1 !== DEPRECATED_BOOLEANS_SYNTAX.indexOf(object)) {
        state.dump = "'" + object + "'";
        return;
    }
    simple = true;
    first = object.length ? object.charCodeAt(0) : 0;
    spaceWrap = (CHAR_SPACE === first ||
        CHAR_SPACE === object.charCodeAt(object.length - 1));
    if (CHAR_MINUS === first ||
        CHAR_QUESTION === first ||
        CHAR_COMMERCIAL_AT === first ||
        CHAR_GRAVE_ACCENT === first) {
        simple = false;
    }
    if (spaceWrap) {
        simple = false;
        folded = false;
        literal = false;
    }
    else {
        folded = true;
        literal = true;
    }
    single = true;
    double = new StringBuilder(object);
    sawLineFeed = false;
    linePosition = 0;
    longestLine = 0;
    indent = state.indent * level;
    max = 80;
    if (indent < 40) {
        max -= indent;
    }
    else {
        max = 40;
    }
    for (position = 0; position < object.length; position++) {
        character = object.charCodeAt(position);
        if (simple) {
            if (!simpleChar(character)) {
                simple = false;
            }
            else {
                continue;
            }
        }
        if (single && character === CHAR_SINGLE_QUOTE) {
            single = false;
        }
        escapeSeq = ESCAPE_SEQUENCES[character];
        hexEsc = needsHexEscape(character);
        if (!escapeSeq && !hexEsc) {
            continue;
        }
        if (character !== CHAR_LINE_FEED &&
            character !== CHAR_DOUBLE_QUOTE &&
            character !== CHAR_SINGLE_QUOTE) {
            folded = false;
            literal = false;
        }
        else if (character === CHAR_LINE_FEED) {
            sawLineFeed = true;
            single = false;
            if (position > 0) {
                previous = object.charCodeAt(position - 1);
                if (previous === CHAR_SPACE) {
                    literal = false;
                    folded = false;
                }
            }
            if (folded) {
                lineLength = position - linePosition;
                linePosition = position;
                if (lineLength > longestLine) {
                    longestLine = lineLength;
                }
            }
        }
        if (character !== CHAR_DOUBLE_QUOTE) {
            single = false;
        }
        double.takeUpTo(position);
        double.escapeChar();
    }
    if (simple && testImplicitResolving(state, object)) {
        simple = false;
    }
    modifier = '';
    if (folded || literal) {
        trailingLineBreaks = 0;
        if (object.charCodeAt(object.length - 1) === CHAR_LINE_FEED) {
            trailingLineBreaks += 1;
            if (object.charCodeAt(object.length - 2) === CHAR_LINE_FEED) {
                trailingLineBreaks += 1;
            }
        }
        if (trailingLineBreaks === 0) {
            modifier = '-';
        }
        else if (trailingLineBreaks === 2) {
            modifier = '+';
        }
    }
    if (literal && longestLine < max) {
        folded = false;
    }
    if (!sawLineFeed) {
        literal = false;
    }
    if (simple) {
        state.dump = object;
    }
    else if (single) {
        state.dump = '\'' + object + '\'';
    }
    else if (folded) {
        result = fold(object, max);
        state.dump = '>' + modifier + '\n' + indentString(result, indent);
    }
    else if (literal) {
        if (!modifier) {
            object = object.replace(/\n$/, '');
        }
        state.dump = '|' + modifier + '\n' + indentString(object, indent);
    }
    else if (double) {
        double.finish();
        state.dump = '"' + double.result + '"';
    }
    else {
        throw new Error('Failed to dump scalar value');
    }
    return;
}
function fold(object, max) {
    var result = '', position = 0, length = object.length, trailing = /\n+$/.exec(object), newLine;
    if (trailing) {
        length = trailing.index + 1;
    }
    while (position < length) {
        newLine = object.indexOf('\n', position);
        if (newLine > length || newLine === -1) {
            if (result) {
                result += '\n\n';
            }
            result += foldLine(object.slice(position, length), max);
            position = length;
        }
        else {
            if (result) {
                result += '\n\n';
            }
            result += foldLine(object.slice(position, newLine), max);
            position = newLine + 1;
        }
    }
    if (trailing && trailing[0] !== '\n') {
        result += trailing[0];
    }
    return result;
}
function foldLine(line, max) {
    if (line === '') {
        return line;
    }
    var foldRe = /[^\s] [^\s]/g, result = '', prevMatch = 0, foldStart = 0, match = foldRe.exec(line), index, foldEnd, folded;
    while (match) {
        index = match.index;
        if (index - foldStart > max) {
            if (prevMatch !== foldStart) {
                foldEnd = prevMatch;
            }
            else {
                foldEnd = index;
            }
            if (result) {
                result += '\n';
            }
            folded = line.slice(foldStart, foldEnd);
            result += folded;
            foldStart = foldEnd + 1;
        }
        prevMatch = index + 1;
        match = foldRe.exec(line);
    }
    if (result) {
        result += '\n';
    }
    if (foldStart !== prevMatch && line.length - foldStart > max) {
        result += line.slice(foldStart, prevMatch) + '\n' +
            line.slice(prevMatch + 1);
    }
    else {
        result += line.slice(foldStart);
    }
    return result;
}
function simpleChar(character) {
    return CHAR_TAB !== character &&
        CHAR_LINE_FEED !== character &&
        CHAR_CARRIAGE_RETURN !== character &&
        CHAR_COMMA !== character &&
        CHAR_LEFT_SQUARE_BRACKET !== character &&
        CHAR_RIGHT_SQUARE_BRACKET !== character &&
        CHAR_LEFT_CURLY_BRACKET !== character &&
        CHAR_RIGHT_CURLY_BRACKET !== character &&
        CHAR_SHARP !== character &&
        CHAR_AMPERSAND !== character &&
        CHAR_ASTERISK !== character &&
        CHAR_EXCLAMATION !== character &&
        CHAR_VERTICAL_LINE !== character &&
        CHAR_GREATER_THAN !== character &&
        CHAR_SINGLE_QUOTE !== character &&
        CHAR_DOUBLE_QUOTE !== character &&
        CHAR_PERCENT !== character &&
        CHAR_COLON !== character &&
        !ESCAPE_SEQUENCES[character] &&
        !needsHexEscape(character);
}
function needsHexEscape(character) {
    return !((0x00020 <= character && character <= 0x00007E) ||
        (0x00085 === character) ||
        (0x000A0 <= character && character <= 0x00D7FF) ||
        (0x0E000 <= character && character <= 0x00FFFD) ||
        (0x10000 <= character && character <= 0x10FFFF));
}
function writeFlowSequence(state, level, object) {
    var _result = '', _tag = state.tag, index, length;
    for (index = 0, length = object.length; index < length; index += 1) {
        if (writeNode(state, level, object[index], false, false)) {
            if (0 !== index) {
                _result += ', ';
            }
            _result += state.dump;
        }
    }
    state.tag = _tag;
    state.dump = '[' + _result + ']';
}
function writeBlockSequence(state, level, object, compact) {
    var _result = '', _tag = state.tag, index, length;
    for (index = 0, length = object.length; index < length; index += 1) {
        if (writeNode(state, level + 1, object[index], true, true)) {
            if (!compact || 0 !== index) {
                _result += generateNextLine(state, level);
            }
            _result += '- ' + state.dump;
        }
    }
    state.tag = _tag;
    state.dump = _result || '[]';
}
function writeFlowMapping(state, level, object) {
    var _result = '', _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, pairBuffer;
    for (index = 0, length = objectKeyList.length; index < length; index += 1) {
        pairBuffer = '';
        if (0 !== index) {
            pairBuffer += ', ';
        }
        objectKey = objectKeyList[index];
        objectValue = object[objectKey];
        if (!writeNode(state, level, objectKey, false, false)) {
            continue;
        }
        if (state.dump.length > 1024) {
            pairBuffer += '? ';
        }
        pairBuffer += state.dump + ': ';
        if (!writeNode(state, level, objectValue, false, false)) {
            continue;
        }
        pairBuffer += state.dump;
        _result += pairBuffer;
    }
    state.tag = _tag;
    state.dump = '{' + _result + '}';
}
function writeBlockMapping(state, level, object, compact) {
    var _result = '', _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, explicitPair, pairBuffer;
    for (index = 0, length = objectKeyList.length; index < length; index += 1) {
        pairBuffer = '';
        if (!compact || 0 !== index) {
            pairBuffer += generateNextLine(state, level);
        }
        objectKey = objectKeyList[index];
        objectValue = object[objectKey];
        if (!writeNode(state, level + 1, objectKey, true, true)) {
            continue;
        }
        explicitPair = (null !== state.tag && '?' !== state.tag) ||
            (state.dump && state.dump.length > 1024);
        if (explicitPair) {
            if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
                pairBuffer += '?';
            }
            else {
                pairBuffer += '? ';
            }
        }
        pairBuffer += state.dump;
        if (explicitPair) {
            pairBuffer += generateNextLine(state, level);
        }
        if (!writeNode(state, level + 1, objectValue, true, explicitPair)) {
            continue;
        }
        if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
            pairBuffer += ':';
        }
        else {
            pairBuffer += ': ';
        }
        pairBuffer += state.dump;
        _result += pairBuffer;
    }
    state.tag = _tag;
    state.dump = _result || '{}';
}
function detectType(state, object, explicit) {
    var _result, typeList, index, length, type, style;
    typeList = explicit ? state.explicitTypes : state.implicitTypes;
    for (index = 0, length = typeList.length; index < length; index += 1) {
        type = typeList[index];
        if ((type.instanceOf || type.predicate) &&
            (!type.instanceOf || (('object' === typeof object) && (object instanceof type.instanceOf))) &&
            (!type.predicate || type.predicate(object))) {
            state.tag = explicit ? type.tag : '?';
            if (type.represent) {
                style = state.styleMap[type.tag] || type.defaultStyle;
                if ('[object Function]' === _toString.call(type.represent)) {
                    _result = type.represent(object, style);
                }
                else if (_hasOwnProperty.call(type.represent, style)) {
                    _result = type.represent[style](object, style);
                }
                else {
                    throw new YAMLException('!<' + type.tag + '> tag resolver accepts not "' + style + '" style');
                }
                state.dump = _result;
            }
            return true;
        }
    }
    return false;
}
function writeNode(state, level, object, block, compact) {
    state.tag = null;
    state.dump = object;
    if (!detectType(state, object, false)) {
        detectType(state, object, true);
    }
    var type = _toString.call(state.dump);
    if (block) {
        block = (0 > state.flowLevel || state.flowLevel > level);
    }
    if ((null !== state.tag && '?' !== state.tag) || (2 !== state.indent && level > 0)) {
        compact = false;
    }
    var objectOrArray = '[object Object]' === type || '[object Array]' === type, duplicateIndex, duplicate;
    if (objectOrArray) {
        duplicateIndex = state.duplicates.indexOf(object);
        duplicate = duplicateIndex !== -1;
    }
    if (duplicate && state.usedDuplicates[duplicateIndex]) {
        state.dump = '*ref_' + duplicateIndex;
    }
    else {
        if (objectOrArray && duplicate && !state.usedDuplicates[duplicateIndex]) {
            state.usedDuplicates[duplicateIndex] = true;
        }
        if ('[object Object]' === type) {
            if (block && (0 !== Object.keys(state.dump).length)) {
                writeBlockMapping(state, level, state.dump, compact);
                if (duplicate) {
                    state.dump = '&ref_' + duplicateIndex + (0 === level ? '\n' : '') + state.dump;
                }
            }
            else {
                writeFlowMapping(state, level, state.dump);
                if (duplicate) {
                    state.dump = '&ref_' + duplicateIndex + ' ' + state.dump;
                }
            }
        }
        else if ('[object Array]' === type) {
            if (block && (0 !== state.dump.length)) {
                writeBlockSequence(state, level, state.dump, compact);
                if (duplicate) {
                    state.dump = '&ref_' + duplicateIndex + (0 === level ? '\n' : '') + state.dump;
                }
            }
            else {
                writeFlowSequence(state, level, state.dump);
                if (duplicate) {
                    state.dump = '&ref_' + duplicateIndex + ' ' + state.dump;
                }
            }
        }
        else if ('[object String]' === type) {
            if ('?' !== state.tag) {
                writeScalar(state, state.dump, level);
            }
        }
        else {
            if (state.skipInvalid) {
                return false;
            }
            throw new YAMLException('unacceptable kind of an object to dump ' + type);
        }
        if (null !== state.tag && '?' !== state.tag) {
            state.dump = '!<' + state.tag + '> ' + state.dump;
        }
    }
    return true;
}
function getDuplicateReferences(object, state) {
    var objects = [], duplicatesIndexes = [], index, length;
    inspectNode(object, objects, duplicatesIndexes);
    for (index = 0, length = duplicatesIndexes.length; index < length; index += 1) {
        state.duplicates.push(objects[duplicatesIndexes[index]]);
    }
    state.usedDuplicates = new Array(length);
}
function inspectNode(object, objects, duplicatesIndexes) {
    var type = _toString.call(object), objectKeyList, index, length;
    if (null !== object && 'object' === typeof object) {
        index = objects.indexOf(object);
        if (-1 !== index) {
            if (-1 === duplicatesIndexes.indexOf(index)) {
                duplicatesIndexes.push(index);
            }
        }
        else {
            objects.push(object);
            if (Array.isArray(object)) {
                for (index = 0, length = object.length; index < length; index += 1) {
                    inspectNode(object[index], objects, duplicatesIndexes);
                }
            }
            else {
                objectKeyList = Object.keys(object);
                for (index = 0, length = objectKeyList.length; index < length; index += 1) {
                    inspectNode(object[objectKeyList[index]], objects, duplicatesIndexes);
                }
            }
        }
    }
}
function dump(input, options) {
    options = options || {};
    var state = new State(options);
    getDuplicateReferences(input, state);
    if (writeNode(state, 0, input, true, true)) {
        return state.dump + '\n';
    }
    return '';
}
exports.dump = dump;
function safeDump(input, options) {
    return dump(input, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options));
}
exports.safeDump = safeDump;
//# sourceMappingURL=dumper.js.map

/***/ }),

/***/ 1629:
/***/ ((module) => {

"use strict";

var YAMLException = (function () {
    function YAMLException(reason, mark, isWarning) {
        if (mark === void 0) { mark = null; }
        if (isWarning === void 0) { isWarning = false; }
        this.name = 'YAMLException';
        this.reason = reason;
        this.mark = mark;
        this.message = this.toString(false);
        this.isWarning = isWarning;
    }
    YAMLException.isInstance = function (instance) {
        if (instance != null && instance.getClassIdentifier
            && typeof (instance.getClassIdentifier) == "function") {
            for (var _i = 0, _a = instance.getClassIdentifier(); _i < _a.length; _i++) {
                var currentIdentifier = _a[_i];
                if (currentIdentifier == YAMLException.CLASS_IDENTIFIER)
                    return true;
            }
        }
        return false;
    };
    YAMLException.prototype.getClassIdentifier = function () {
        var superIdentifiers = [];
        return superIdentifiers.concat(YAMLException.CLASS_IDENTIFIER);
    };
    YAMLException.prototype.toString = function (compact) {
        if (compact === void 0) { compact = false; }
        var result;
        result = 'JS-YAML: ' + (this.reason || '(unknown reason)');
        if (!compact && this.mark) {
            result += ' ' + this.mark.toString();
        }
        return result;
    };
    YAMLException.CLASS_IDENTIFIER = "yaml-ast-parser.YAMLException";
    return YAMLException;
}());
module.exports = YAMLException;
//# sourceMappingURL=exception.js.map

/***/ }),

/***/ 8342:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", ({ value: true }));
var loader_1 = __webpack_require__(8729);
exports.load = loader_1.load;
exports.loadAll = loader_1.loadAll;
exports.safeLoad = loader_1.safeLoad;
exports.safeLoadAll = loader_1.safeLoadAll;
var dumper_1 = __webpack_require__(5730);
exports.dump = dumper_1.dump;
exports.safeDump = dumper_1.safeDump;
exports.YAMLException = __webpack_require__(1629);
__export(__webpack_require__(9421));
function deprecated(name) {
    return function () {
        throw new Error('Function ' + name + ' is deprecated and cannot be used.');
    };
}
__export(__webpack_require__(2434));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 8729:
/***/ ((module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var ast = __webpack_require__(9421);
'use strict';
var common = __webpack_require__(7195);
var YAMLException = __webpack_require__(1629);
var Mark = __webpack_require__(6324);
var DEFAULT_SAFE_SCHEMA = __webpack_require__(8518);
var DEFAULT_FULL_SCHEMA = __webpack_require__(5589);
var _hasOwnProperty = Object.prototype.hasOwnProperty;
var CONTEXT_FLOW_IN = 1;
var CONTEXT_FLOW_OUT = 2;
var CONTEXT_BLOCK_IN = 3;
var CONTEXT_BLOCK_OUT = 4;
var CHOMPING_CLIP = 1;
var CHOMPING_STRIP = 2;
var CHOMPING_KEEP = 3;
var PATTERN_NON_PRINTABLE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
var PATTERN_NON_ASCII_LINE_BREAKS = /[\x85\u2028\u2029]/;
var PATTERN_FLOW_INDICATORS = /[,\[\]\{\}]/;
var PATTERN_TAG_HANDLE = /^(?:!|!!|![a-z\-]+!)$/i;
var PATTERN_TAG_URI = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function is_EOL(c) {
    return (c === 0x0A) || (c === 0x0D);
}
function is_WHITE_SPACE(c) {
    return (c === 0x09) || (c === 0x20);
}
function is_WS_OR_EOL(c) {
    return (c === 0x09) ||
        (c === 0x20) ||
        (c === 0x0A) ||
        (c === 0x0D);
}
function is_FLOW_INDICATOR(c) {
    return 0x2C === c ||
        0x5B === c ||
        0x5D === c ||
        0x7B === c ||
        0x7D === c;
}
function fromHexCode(c) {
    var lc;
    if ((0x30 <= c) && (c <= 0x39)) {
        return c - 0x30;
    }
    lc = c | 0x20;
    if ((0x61 <= lc) && (lc <= 0x66)) {
        return lc - 0x61 + 10;
    }
    return -1;
}
function escapedHexLen(c) {
    if (c === 0x78) {
        return 2;
    }
    if (c === 0x75) {
        return 4;
    }
    if (c === 0x55) {
        return 8;
    }
    return 0;
}
function fromDecimalCode(c) {
    if ((0x30 <= c) && (c <= 0x39)) {
        return c - 0x30;
    }
    return -1;
}
function simpleEscapeSequence(c) {
    return (c === 0x30) ? '\x00' :
        (c === 0x61) ? '\x07' :
            (c === 0x62) ? '\x08' :
                (c === 0x74) ? '\x09' :
                    (c === 0x09) ? '\x09' :
                        (c === 0x6E) ? '\x0A' :
                            (c === 0x76) ? '\x0B' :
                                (c === 0x66) ? '\x0C' :
                                    (c === 0x72) ? '\x0D' :
                                        (c === 0x65) ? '\x1B' :
                                            (c === 0x20) ? ' ' :
                                                (c === 0x22) ? '\x22' :
                                                    (c === 0x2F) ? '/' :
                                                        (c === 0x5C) ? '\x5C' :
                                                            (c === 0x4E) ? '\x85' :
                                                                (c === 0x5F) ? '\xA0' :
                                                                    (c === 0x4C) ? '\u2028' :
                                                                        (c === 0x50) ? '\u2029' : '';
}
function charFromCodepoint(c) {
    if (c <= 0xFFFF) {
        return String.fromCharCode(c);
    }
    return String.fromCharCode(((c - 0x010000) >> 10) + 0xD800, ((c - 0x010000) & 0x03FF) + 0xDC00);
}
var simpleEscapeCheck = new Array(256);
var simpleEscapeMap = new Array(256);
var customEscapeCheck = new Array(256);
var customEscapeMap = new Array(256);
for (var i = 0; i < 256; i++) {
    customEscapeMap[i] = simpleEscapeMap[i] = simpleEscapeSequence(i);
    simpleEscapeCheck[i] = simpleEscapeMap[i] ? 1 : 0;
    customEscapeCheck[i] = 1;
    if (!simpleEscapeCheck[i]) {
        customEscapeMap[i] = '\\' + String.fromCharCode(i);
    }
}
var State = (function () {
    function State(input, options) {
        this.errorMap = {};
        this.errors = [];
        this.lines = [];
        this.input = input;
        this.filename = options['filename'] || null;
        this.schema = options['schema'] || DEFAULT_FULL_SCHEMA;
        this.onWarning = options['onWarning'] || null;
        this.legacy = options['legacy'] || false;
        this.allowAnyEscape = options['allowAnyEscape'] || false;
        this.ignoreDuplicateKeys = options['ignoreDuplicateKeys'] || false;
        this.implicitTypes = this.schema.compiledImplicit;
        this.typeMap = this.schema.compiledTypeMap;
        this.length = input.length;
        this.position = 0;
        this.line = 0;
        this.lineStart = 0;
        this.lineIndent = 0;
        this.documents = [];
    }
    return State;
}());
function generateError(state, message, isWarning) {
    if (isWarning === void 0) { isWarning = false; }
    return new YAMLException(message, new Mark(state.filename, state.input, state.position, state.line, (state.position - state.lineStart)), isWarning);
}
function throwErrorFromPosition(state, position, message, isWarning, toLineEnd) {
    if (isWarning === void 0) { isWarning = false; }
    if (toLineEnd === void 0) { toLineEnd = false; }
    var line = positionToLine(state, position);
    if (!line) {
        return;
    }
    var hash = message + position;
    if (state.errorMap[hash]) {
        return;
    }
    var mark = new Mark(state.filename, state.input, position, line.line, (position - line.start));
    if (toLineEnd) {
        mark.toLineEnd = true;
    }
    var error = new YAMLException(message, mark, isWarning);
    state.errors.push(error);
}
function throwError(state, message) {
    var error = generateError(state, message);
    var hash = error.message + error.mark.position;
    if (state.errorMap[hash]) {
        return;
    }
    state.errors.push(error);
    state.errorMap[hash] = 1;
    var or = state.position;
    while (true) {
        if (state.position >= state.input.length - 1) {
            return;
        }
        var c = state.input.charAt(state.position);
        if (c == '\n') {
            state.position--;
            if (state.position == or) {
                state.position += 1;
            }
            return;
        }
        if (c == '\r') {
            state.position--;
            if (state.position == or) {
                state.position += 1;
            }
            return;
        }
        state.position++;
    }
}
function throwWarning(state, message) {
    var error = generateError(state, message);
    if (state.onWarning) {
        state.onWarning.call(null, error);
    }
    else {
    }
}
var directiveHandlers = {
    YAML: function handleYamlDirective(state, name, args) {
        var match, major, minor;
        if (null !== state.version) {
            throwError(state, 'duplication of %YAML directive');
        }
        if (1 !== args.length) {
            throwError(state, 'YAML directive accepts exactly one argument');
        }
        match = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);
        if (null === match) {
            throwError(state, 'ill-formed argument of the YAML directive');
        }
        major = parseInt(match[1], 10);
        minor = parseInt(match[2], 10);
        if (1 !== major) {
            throwError(state, 'found incompatible YAML document (version 1.2 is required)');
        }
        state.version = args[0];
        state.checkLineBreaks = (minor < 2);
        if (2 !== minor) {
            throwError(state, 'found incompatible YAML document (version 1.2 is required)');
        }
    },
    TAG: function handleTagDirective(state, name, args) {
        var handle, prefix;
        if (2 !== args.length) {
            throwError(state, 'TAG directive accepts exactly two arguments');
        }
        handle = args[0];
        prefix = args[1];
        if (!PATTERN_TAG_HANDLE.test(handle)) {
            throwError(state, 'ill-formed tag handle (first argument) of the TAG directive');
        }
        if (_hasOwnProperty.call(state.tagMap, handle)) {
            throwError(state, 'there is a previously declared suffix for "' + handle + '" tag handle');
        }
        if (!PATTERN_TAG_URI.test(prefix)) {
            throwError(state, 'ill-formed tag prefix (second argument) of the TAG directive');
        }
        state.tagMap[handle] = prefix;
    }
};
function captureSegment(state, start, end, checkJson) {
    var _position, _length, _character, _result;
    var scalar = state.result;
    if (scalar.startPosition == -1) {
        scalar.startPosition = start;
    }
    if (start <= end) {
        _result = state.input.slice(start, end);
        if (checkJson) {
            for (_position = 0, _length = _result.length; _position < _length; _position += 1) {
                _character = _result.charCodeAt(_position);
                if (!(0x09 === _character ||
                    0x20 <= _character && _character <= 0x10FFFF)) {
                    throwError(state, 'expected valid JSON character');
                }
            }
        }
        else if (PATTERN_NON_PRINTABLE.test(_result)) {
            throwError(state, 'the stream contains non-printable characters');
        }
        scalar.value += _result;
        scalar.endPosition = end;
    }
}
function mergeMappings(state, destination, source) {
    var sourceKeys, key, index, quantity;
    if (!common.isObject(source)) {
        throwError(state, 'cannot merge mappings; the provided source object is unacceptable');
    }
    sourceKeys = Object.keys(source);
    for (index = 0, quantity = sourceKeys.length; index < quantity; index += 1) {
        key = sourceKeys[index];
        if (!_hasOwnProperty.call(destination, key)) {
            destination[key] = source[key];
        }
    }
}
function storeMappingPair(state, _result, keyTag, keyNode, valueNode) {
    var index, quantity;
    if (keyNode == null) {
        return;
    }
    if (null === _result) {
        _result = {
            startPosition: keyNode.startPosition,
            endPosition: valueNode.endPosition,
            parent: null,
            errors: [],
            mappings: [], kind: ast.Kind.MAP
        };
    }
    var mapping = ast.newMapping(keyNode, valueNode);
    mapping.parent = _result;
    keyNode.parent = mapping;
    if (valueNode != null) {
        valueNode.parent = mapping;
    }
    !state.ignoreDuplicateKeys && _result.mappings.forEach(function (sibling) {
        if (sibling.key && sibling.key.value === (mapping.key && mapping.key.value)) {
            throwErrorFromPosition(state, mapping.key.startPosition, 'duplicate key');
            throwErrorFromPosition(state, sibling.key.startPosition, 'duplicate key');
        }
    });
    _result.mappings.push(mapping);
    _result.endPosition = valueNode ? valueNode.endPosition : keyNode.endPosition + 1;
    return _result;
}
function readLineBreak(state) {
    var ch;
    ch = state.input.charCodeAt(state.position);
    if (0x0A === ch) {
        state.position++;
    }
    else if (0x0D === ch) {
        state.position++;
        if (0x0A === state.input.charCodeAt(state.position)) {
            state.position++;
        }
    }
    else {
        throwError(state, 'a line break is expected');
    }
    state.line += 1;
    state.lineStart = state.position;
    state.lines.push({
        start: state.lineStart,
        line: state.line
    });
}
var Line = (function () {
    function Line() {
    }
    return Line;
}());
function positionToLine(state, position) {
    var line;
    for (var i = 0; i < state.lines.length; i++) {
        if (state.lines[i].start > position) {
            break;
        }
        line = state.lines[i];
    }
    if (!line) {
        return {
            start: 0,
            line: 0
        };
    }
    return line;
}
function skipSeparationSpace(state, allowComments, checkIndent) {
    var lineBreaks = 0, ch = state.input.charCodeAt(state.position);
    while (0 !== ch) {
        while (is_WHITE_SPACE(ch)) {
            if (ch === 0x09) {
                state.errors.push(generateError(state, "Using tabs can lead to unpredictable results", true));
            }
            ch = state.input.charCodeAt(++state.position);
        }
        if (allowComments && 0x23 === ch) {
            do {
                ch = state.input.charCodeAt(++state.position);
            } while (ch !== 0x0A && ch !== 0x0D && 0 !== ch);
        }
        if (is_EOL(ch)) {
            readLineBreak(state);
            ch = state.input.charCodeAt(state.position);
            lineBreaks++;
            state.lineIndent = 0;
            while (0x20 === ch) {
                state.lineIndent++;
                ch = state.input.charCodeAt(++state.position);
            }
        }
        else {
            break;
        }
    }
    if (-1 !== checkIndent && 0 !== lineBreaks && state.lineIndent < checkIndent) {
        throwWarning(state, 'deficient indentation');
    }
    return lineBreaks;
}
function testDocumentSeparator(state) {
    var _position = state.position, ch;
    ch = state.input.charCodeAt(_position);
    if ((0x2D === ch || 0x2E === ch) &&
        state.input.charCodeAt(_position + 1) === ch &&
        state.input.charCodeAt(_position + 2) === ch) {
        _position += 3;
        ch = state.input.charCodeAt(_position);
        if (ch === 0 || is_WS_OR_EOL(ch)) {
            return true;
        }
    }
    return false;
}
function writeFoldedLines(state, scalar, count) {
    if (1 === count) {
        scalar.value += ' ';
    }
    else if (count > 1) {
        scalar.value += common.repeat('\n', count - 1);
    }
}
function readPlainScalar(state, nodeIndent, withinFlowCollection) {
    var preceding, following, captureStart, captureEnd, hasPendingContent, _line, _lineStart, _lineIndent, _kind = state.kind, _result = state.result, ch;
    var state_result = ast.newScalar();
    state_result.plainScalar = true;
    state.result = state_result;
    ch = state.input.charCodeAt(state.position);
    if (is_WS_OR_EOL(ch) ||
        is_FLOW_INDICATOR(ch) ||
        0x23 === ch ||
        0x26 === ch ||
        0x2A === ch ||
        0x21 === ch ||
        0x7C === ch ||
        0x3E === ch ||
        0x27 === ch ||
        0x22 === ch ||
        0x25 === ch ||
        0x40 === ch ||
        0x60 === ch) {
        return false;
    }
    if (0x3F === ch || 0x2D === ch) {
        following = state.input.charCodeAt(state.position + 1);
        if (is_WS_OR_EOL(following) ||
            withinFlowCollection && is_FLOW_INDICATOR(following)) {
            return false;
        }
    }
    state.kind = 'scalar';
    captureStart = captureEnd = state.position;
    hasPendingContent = false;
    while (0 !== ch) {
        if (0x3A === ch) {
            following = state.input.charCodeAt(state.position + 1);
            if (is_WS_OR_EOL(following) ||
                withinFlowCollection && is_FLOW_INDICATOR(following)) {
                break;
            }
        }
        else if (0x23 === ch) {
            preceding = state.input.charCodeAt(state.position - 1);
            if (is_WS_OR_EOL(preceding)) {
                break;
            }
        }
        else if ((state.position === state.lineStart && testDocumentSeparator(state)) ||
            withinFlowCollection && is_FLOW_INDICATOR(ch)) {
            break;
        }
        else if (is_EOL(ch)) {
            _line = state.line;
            _lineStart = state.lineStart;
            _lineIndent = state.lineIndent;
            skipSeparationSpace(state, false, -1);
            if (state.lineIndent >= nodeIndent) {
                hasPendingContent = true;
                ch = state.input.charCodeAt(state.position);
                continue;
            }
            else {
                state.position = captureEnd;
                state.line = _line;
                state.lineStart = _lineStart;
                state.lineIndent = _lineIndent;
                break;
            }
        }
        if (hasPendingContent) {
            captureSegment(state, captureStart, captureEnd, false);
            writeFoldedLines(state, state_result, state.line - _line);
            captureStart = captureEnd = state.position;
            hasPendingContent = false;
        }
        if (!is_WHITE_SPACE(ch)) {
            captureEnd = state.position + 1;
        }
        ch = state.input.charCodeAt(++state.position);
        if (state.position >= state.input.length) {
            return false;
        }
    }
    captureSegment(state, captureStart, captureEnd, false);
    if (state.result.startPosition != -1) {
        state_result.rawValue = state.input.substring(state_result.startPosition, state_result.endPosition);
        return true;
    }
    state.kind = _kind;
    state.result = _result;
    return false;
}
function readSingleQuotedScalar(state, nodeIndent) {
    var ch, captureStart, captureEnd;
    ch = state.input.charCodeAt(state.position);
    if (0x27 !== ch) {
        return false;
    }
    var scalar = ast.newScalar();
    scalar.singleQuoted = true;
    state.kind = 'scalar';
    state.result = scalar;
    scalar.startPosition = state.position;
    state.position++;
    captureStart = captureEnd = state.position;
    while (0 !== (ch = state.input.charCodeAt(state.position))) {
        if (0x27 === ch) {
            captureSegment(state, captureStart, state.position, true);
            ch = state.input.charCodeAt(++state.position);
            scalar.endPosition = state.position;
            if (0x27 === ch) {
                captureStart = captureEnd = state.position;
                state.position++;
            }
            else {
                return true;
            }
        }
        else if (is_EOL(ch)) {
            captureSegment(state, captureStart, captureEnd, true);
            writeFoldedLines(state, scalar, skipSeparationSpace(state, false, nodeIndent));
            captureStart = captureEnd = state.position;
        }
        else if (state.position === state.lineStart && testDocumentSeparator(state)) {
            throwError(state, 'unexpected end of the document within a single quoted scalar');
        }
        else {
            state.position++;
            captureEnd = state.position;
            scalar.endPosition = state.position;
        }
    }
    throwError(state, 'unexpected end of the stream within a single quoted scalar');
}
function readDoubleQuotedScalar(state, nodeIndent) {
    var captureStart, captureEnd, hexLength, hexResult, tmp, tmpEsc, ch;
    ch = state.input.charCodeAt(state.position);
    if (0x22 !== ch) {
        return false;
    }
    state.kind = 'scalar';
    var scalar = ast.newScalar();
    scalar.doubleQuoted = true;
    state.result = scalar;
    scalar.startPosition = state.position;
    state.position++;
    captureStart = captureEnd = state.position;
    while (0 !== (ch = state.input.charCodeAt(state.position))) {
        if (0x22 === ch) {
            captureSegment(state, captureStart, state.position, true);
            state.position++;
            scalar.endPosition = state.position;
            scalar.rawValue = state.input.substring(scalar.startPosition, scalar.endPosition);
            return true;
        }
        else if (0x5C === ch) {
            captureSegment(state, captureStart, state.position, true);
            ch = state.input.charCodeAt(++state.position);
            if (is_EOL(ch)) {
                skipSeparationSpace(state, false, nodeIndent);
            }
            else if (ch < 256 && (state.allowAnyEscape ? customEscapeCheck[ch] : simpleEscapeCheck[ch])) {
                scalar.value += (state.allowAnyEscape ? customEscapeMap[ch] : simpleEscapeMap[ch]);
                state.position++;
            }
            else if ((tmp = escapedHexLen(ch)) > 0) {
                hexLength = tmp;
                hexResult = 0;
                for (; hexLength > 0; hexLength--) {
                    ch = state.input.charCodeAt(++state.position);
                    if ((tmp = fromHexCode(ch)) >= 0) {
                        hexResult = (hexResult << 4) + tmp;
                    }
                    else {
                        throwError(state, 'expected hexadecimal character');
                    }
                }
                scalar.value += charFromCodepoint(hexResult);
                state.position++;
            }
            else {
                throwError(state, 'unknown escape sequence');
            }
            captureStart = captureEnd = state.position;
        }
        else if (is_EOL(ch)) {
            captureSegment(state, captureStart, captureEnd, true);
            writeFoldedLines(state, scalar, skipSeparationSpace(state, false, nodeIndent));
            captureStart = captureEnd = state.position;
        }
        else if (state.position === state.lineStart && testDocumentSeparator(state)) {
            throwError(state, 'unexpected end of the document within a double quoted scalar');
        }
        else {
            state.position++;
            captureEnd = state.position;
        }
    }
    throwError(state, 'unexpected end of the stream within a double quoted scalar');
}
function readFlowCollection(state, nodeIndent) {
    var readNext = true, _line, _tag = state.tag, _result, _anchor = state.anchor, following, terminator, isPair, isExplicitPair, isMapping, keyNode, keyTag, valueNode, ch;
    ch = state.input.charCodeAt(state.position);
    if (ch === 0x5B) {
        terminator = 0x5D;
        isMapping = false;
        _result = ast.newItems();
        _result.startPosition = state.position;
    }
    else if (ch === 0x7B) {
        terminator = 0x7D;
        isMapping = true;
        _result = ast.newMap();
        _result.startPosition = state.position;
    }
    else {
        return false;
    }
    if (null !== state.anchor) {
        _result.anchorId = state.anchor;
        state.anchorMap[state.anchor] = _result;
    }
    ch = state.input.charCodeAt(++state.position);
    while (0 !== ch) {
        skipSeparationSpace(state, true, nodeIndent);
        ch = state.input.charCodeAt(state.position);
        if (ch === terminator) {
            state.position++;
            state.tag = _tag;
            state.anchor = _anchor;
            state.kind = isMapping ? 'mapping' : 'sequence';
            state.result = _result;
            _result.endPosition = state.position;
            return true;
        }
        else if (!readNext) {
            var p = state.position;
            throwError(state, 'missed comma between flow collection entries');
            state.position = p + 1;
        }
        keyTag = keyNode = valueNode = null;
        isPair = isExplicitPair = false;
        if (0x3F === ch) {
            following = state.input.charCodeAt(state.position + 1);
            if (is_WS_OR_EOL(following)) {
                isPair = isExplicitPair = true;
                state.position++;
                skipSeparationSpace(state, true, nodeIndent);
            }
        }
        _line = state.line;
        composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
        keyTag = state.tag;
        keyNode = state.result;
        skipSeparationSpace(state, true, nodeIndent);
        ch = state.input.charCodeAt(state.position);
        if ((isExplicitPair || state.line === _line) && 0x3A === ch) {
            isPair = true;
            ch = state.input.charCodeAt(++state.position);
            skipSeparationSpace(state, true, nodeIndent);
            composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
            valueNode = state.result;
        }
        if (isMapping) {
            storeMappingPair(state, _result, keyTag, keyNode, valueNode);
        }
        else if (isPair) {
            var mp = storeMappingPair(state, null, keyTag, keyNode, valueNode);
            mp.parent = _result;
            _result.items.push(mp);
        }
        else {
            if (keyNode) {
                keyNode.parent = _result;
            }
            _result.items.push(keyNode);
        }
        _result.endPosition = state.position + 1;
        skipSeparationSpace(state, true, nodeIndent);
        ch = state.input.charCodeAt(state.position);
        if (0x2C === ch) {
            readNext = true;
            ch = state.input.charCodeAt(++state.position);
        }
        else {
            readNext = false;
        }
    }
    throwError(state, 'unexpected end of the stream within a flow collection');
}
function readBlockScalar(state, nodeIndent) {
    var captureStart, folding, chomping = CHOMPING_CLIP, detectedIndent = false, textIndent = nodeIndent, emptyLines = 0, atMoreIndented = false, tmp, ch;
    ch = state.input.charCodeAt(state.position);
    if (ch === 0x7C) {
        folding = false;
    }
    else if (ch === 0x3E) {
        folding = true;
    }
    else {
        return false;
    }
    var sc = ast.newScalar();
    state.kind = 'scalar';
    state.result = sc;
    sc.startPosition = state.position;
    while (0 !== ch) {
        ch = state.input.charCodeAt(++state.position);
        if (0x2B === ch || 0x2D === ch) {
            if (CHOMPING_CLIP === chomping) {
                chomping = (0x2B === ch) ? CHOMPING_KEEP : CHOMPING_STRIP;
            }
            else {
                throwError(state, 'repeat of a chomping mode identifier');
            }
        }
        else if ((tmp = fromDecimalCode(ch)) >= 0) {
            if (tmp === 0) {
                throwError(state, 'bad explicit indentation width of a block scalar; it cannot be less than one');
            }
            else if (!detectedIndent) {
                textIndent = nodeIndent + tmp - 1;
                detectedIndent = true;
            }
            else {
                throwError(state, 'repeat of an indentation width identifier');
            }
        }
        else {
            break;
        }
    }
    if (is_WHITE_SPACE(ch)) {
        do {
            ch = state.input.charCodeAt(++state.position);
        } while (is_WHITE_SPACE(ch));
        if (0x23 === ch) {
            do {
                ch = state.input.charCodeAt(++state.position);
            } while (!is_EOL(ch) && (0 !== ch));
        }
    }
    while (0 !== ch) {
        readLineBreak(state);
        state.lineIndent = 0;
        ch = state.input.charCodeAt(state.position);
        while ((!detectedIndent || state.lineIndent < textIndent) &&
            (0x20 === ch)) {
            state.lineIndent++;
            ch = state.input.charCodeAt(++state.position);
        }
        if (!detectedIndent && state.lineIndent > textIndent) {
            textIndent = state.lineIndent;
        }
        if (is_EOL(ch)) {
            emptyLines++;
            continue;
        }
        if (state.lineIndent < textIndent) {
            if (chomping === CHOMPING_KEEP) {
                sc.value += common.repeat('\n', emptyLines);
            }
            else if (chomping === CHOMPING_CLIP) {
                if (detectedIndent) {
                    sc.value += '\n';
                }
            }
            break;
        }
        if (folding) {
            if (is_WHITE_SPACE(ch)) {
                atMoreIndented = true;
                sc.value += common.repeat('\n', emptyLines + 1);
            }
            else if (atMoreIndented) {
                atMoreIndented = false;
                sc.value += common.repeat('\n', emptyLines + 1);
            }
            else if (0 === emptyLines) {
                if (detectedIndent) {
                    sc.value += ' ';
                }
            }
            else {
                sc.value += common.repeat('\n', emptyLines);
            }
        }
        else if (detectedIndent) {
            sc.value += common.repeat('\n', emptyLines + 1);
        }
        else {
        }
        detectedIndent = true;
        emptyLines = 0;
        captureStart = state.position;
        while (!is_EOL(ch) && (0 !== ch)) {
            ch = state.input.charCodeAt(++state.position);
        }
        captureSegment(state, captureStart, state.position, false);
    }
    sc.endPosition = state.position;
    var i = state.position - 1;
    var needMinus = false;
    while (true) {
        var c = state.input[i];
        if (c == '\r' || c == '\n') {
            if (needMinus) {
                i--;
            }
            break;
        }
        if (c != ' ' && c != '\t') {
            break;
        }
        i--;
    }
    sc.endPosition = i;
    sc.rawValue = state.input.substring(sc.startPosition, sc.endPosition);
    return true;
}
function readBlockSequence(state, nodeIndent) {
    var _line, _tag = state.tag, _anchor = state.anchor, _result = ast.newItems(), following, detected = false, ch;
    if (null !== state.anchor) {
        _result.anchorId = state.anchor;
        state.anchorMap[state.anchor] = _result;
    }
    _result.startPosition = state.position;
    ch = state.input.charCodeAt(state.position);
    while (0 !== ch) {
        if (0x2D !== ch) {
            break;
        }
        following = state.input.charCodeAt(state.position + 1);
        if (!is_WS_OR_EOL(following)) {
            break;
        }
        detected = true;
        state.position++;
        if (skipSeparationSpace(state, true, -1)) {
            if (state.lineIndent <= nodeIndent) {
                _result.items.push(null);
                ch = state.input.charCodeAt(state.position);
                continue;
            }
        }
        _line = state.line;
        composeNode(state, nodeIndent, CONTEXT_BLOCK_IN, false, true);
        if (state.result) {
            state.result.parent = _result;
            _result.items.push(state.result);
        }
        skipSeparationSpace(state, true, -1);
        ch = state.input.charCodeAt(state.position);
        if ((state.line === _line || state.lineIndent > nodeIndent) && (0 !== ch)) {
            throwError(state, 'bad indentation of a sequence entry');
        }
        else if (state.lineIndent < nodeIndent) {
            break;
        }
    }
    _result.endPosition = state.position;
    if (detected) {
        state.tag = _tag;
        state.anchor = _anchor;
        state.kind = 'sequence';
        state.result = _result;
        _result.endPosition = state.position;
        return true;
    }
    return false;
}
function readBlockMapping(state, nodeIndent, flowIndent) {
    var following, allowCompact, _line, _tag = state.tag, _anchor = state.anchor, _result = ast.newMap(), keyTag = null, keyNode = null, valueNode = null, atExplicitKey = false, detected = false, ch;
    _result.startPosition = state.position;
    if (null !== state.anchor) {
        _result.anchorId = state.anchor;
        state.anchorMap[state.anchor] = _result;
    }
    ch = state.input.charCodeAt(state.position);
    while (0 !== ch) {
        following = state.input.charCodeAt(state.position + 1);
        _line = state.line;
        if ((0x3F === ch || 0x3A === ch) && is_WS_OR_EOL(following)) {
            if (0x3F === ch) {
                if (atExplicitKey) {
                    storeMappingPair(state, _result, keyTag, keyNode, null);
                    keyTag = keyNode = valueNode = null;
                }
                detected = true;
                atExplicitKey = true;
                allowCompact = true;
            }
            else if (atExplicitKey) {
                atExplicitKey = false;
                allowCompact = true;
            }
            else {
                throwError(state, 'incomplete explicit mapping pair; a key node is missed');
            }
            state.position += 1;
            ch = following;
        }
        else if (composeNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true)) {
            if (state.line === _line) {
                ch = state.input.charCodeAt(state.position);
                while (is_WHITE_SPACE(ch)) {
                    ch = state.input.charCodeAt(++state.position);
                }
                if (0x3A === ch) {
                    ch = state.input.charCodeAt(++state.position);
                    if (!is_WS_OR_EOL(ch)) {
                        throwError(state, 'a whitespace character is expected after the key-value separator within a block mapping');
                    }
                    if (atExplicitKey) {
                        storeMappingPair(state, _result, keyTag, keyNode, null);
                        keyTag = keyNode = valueNode = null;
                    }
                    detected = true;
                    atExplicitKey = false;
                    allowCompact = false;
                    keyTag = state.tag;
                    keyNode = state.result;
                }
                else if (state.position == state.lineStart && testDocumentSeparator(state)) {
                    break;
                }
                else if (detected) {
                    throwError(state, 'can not read an implicit mapping pair; a colon is missed');
                }
                else {
                    state.tag = _tag;
                    state.anchor = _anchor;
                    return true;
                }
            }
            else if (detected) {
                throwError(state, 'can not read a block mapping entry; a multiline key may not be an implicit key');
                while (state.position > 0) {
                    ch = state.input.charCodeAt(--state.position);
                    if (is_EOL(ch)) {
                        state.position++;
                        break;
                    }
                }
            }
            else {
                state.tag = _tag;
                state.anchor = _anchor;
                return true;
            }
        }
        else {
            break;
        }
        if (state.line === _line || state.lineIndent > nodeIndent) {
            if (composeNode(state, nodeIndent, CONTEXT_BLOCK_OUT, true, allowCompact)) {
                if (atExplicitKey) {
                    keyNode = state.result;
                }
                else {
                    valueNode = state.result;
                }
            }
            if (!atExplicitKey) {
                storeMappingPair(state, _result, keyTag, keyNode, valueNode);
                keyTag = keyNode = valueNode = null;
            }
            skipSeparationSpace(state, true, -1);
            ch = state.input.charCodeAt(state.position);
        }
        if (state.lineIndent > nodeIndent && (0 !== ch)) {
            throwError(state, 'bad indentation of a mapping entry');
        }
        else if (state.lineIndent < nodeIndent) {
            break;
        }
    }
    if (atExplicitKey) {
        storeMappingPair(state, _result, keyTag, keyNode, null);
    }
    if (detected) {
        state.tag = _tag;
        state.anchor = _anchor;
        state.kind = 'mapping';
        state.result = _result;
    }
    return detected;
}
function readTagProperty(state) {
    var _position, isVerbatim = false, isNamed = false, tagHandle, tagName, ch;
    ch = state.input.charCodeAt(state.position);
    if (0x21 !== ch) {
        return false;
    }
    if (null !== state.tag) {
        throwError(state, 'duplication of a tag property');
    }
    ch = state.input.charCodeAt(++state.position);
    if (0x3C === ch) {
        isVerbatim = true;
        ch = state.input.charCodeAt(++state.position);
    }
    else if (0x21 === ch) {
        isNamed = true;
        tagHandle = '!!';
        ch = state.input.charCodeAt(++state.position);
    }
    else {
        tagHandle = '!';
    }
    _position = state.position;
    if (isVerbatim) {
        do {
            ch = state.input.charCodeAt(++state.position);
        } while (0 !== ch && 0x3E !== ch);
        if (state.position < state.length) {
            tagName = state.input.slice(_position, state.position);
            ch = state.input.charCodeAt(++state.position);
        }
        else {
            throwError(state, 'unexpected end of the stream within a verbatim tag');
        }
    }
    else {
        while (0 !== ch && !is_WS_OR_EOL(ch)) {
            if (0x21 === ch) {
                if (!isNamed) {
                    tagHandle = state.input.slice(_position - 1, state.position + 1);
                    if (!PATTERN_TAG_HANDLE.test(tagHandle)) {
                        throwError(state, 'named tag handle cannot contain such characters');
                    }
                    isNamed = true;
                    _position = state.position + 1;
                }
                else {
                    throwError(state, 'tag suffix cannot contain exclamation marks');
                }
            }
            ch = state.input.charCodeAt(++state.position);
        }
        tagName = state.input.slice(_position, state.position);
        if (PATTERN_FLOW_INDICATORS.test(tagName)) {
            throwError(state, 'tag suffix cannot contain flow indicator characters');
        }
    }
    if (tagName && !PATTERN_TAG_URI.test(tagName)) {
        throwError(state, 'tag name cannot contain such characters: ' + tagName);
    }
    if (isVerbatim) {
        state.tag = tagName;
    }
    else if (_hasOwnProperty.call(state.tagMap, tagHandle)) {
        state.tag = state.tagMap[tagHandle] + tagName;
    }
    else if ('!' === tagHandle) {
        state.tag = '!' + tagName;
    }
    else if ('!!' === tagHandle) {
        state.tag = 'tag:yaml.org,2002:' + tagName;
    }
    else {
        throwError(state, 'undeclared tag handle "' + tagHandle + '"');
    }
    return true;
}
function readAnchorProperty(state) {
    var _position, ch;
    ch = state.input.charCodeAt(state.position);
    if (0x26 !== ch) {
        return false;
    }
    if (null !== state.anchor) {
        throwError(state, 'duplication of an anchor property');
    }
    ch = state.input.charCodeAt(++state.position);
    _position = state.position;
    while (0 !== ch && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
        ch = state.input.charCodeAt(++state.position);
    }
    if (state.position === _position) {
        throwError(state, 'name of an anchor node must contain at least one character');
    }
    state.anchor = state.input.slice(_position, state.position);
    return true;
}
function readAlias(state) {
    var _position, alias, len = state.length, input = state.input, ch;
    ch = state.input.charCodeAt(state.position);
    if (0x2A !== ch) {
        return false;
    }
    ch = state.input.charCodeAt(++state.position);
    _position = state.position;
    while (0 !== ch && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
        ch = state.input.charCodeAt(++state.position);
    }
    if (state.position <= _position) {
        throwError(state, 'name of an alias node must contain at least one character');
        state.position = _position + 1;
    }
    alias = state.input.slice(_position, state.position);
    if (!state.anchorMap.hasOwnProperty(alias)) {
        throwError(state, 'unidentified alias "' + alias + '"');
        if (state.position <= _position) {
            state.position = _position + 1;
        }
    }
    state.result = ast.newAnchorRef(alias, _position, state.position, state.anchorMap[alias]);
    skipSeparationSpace(state, true, -1);
    return true;
}
function composeNode(state, parentIndent, nodeContext, allowToSeek, allowCompact) {
    var allowBlockStyles, allowBlockScalars, allowBlockCollections, indentStatus = 1, atNewLine = false, hasContent = false, typeIndex, typeQuantity, type, flowIndent, blockIndent, _result;
    state.tag = null;
    state.anchor = null;
    state.kind = null;
    state.result = null;
    allowBlockStyles = allowBlockScalars = allowBlockCollections =
        CONTEXT_BLOCK_OUT === nodeContext ||
            CONTEXT_BLOCK_IN === nodeContext;
    if (allowToSeek) {
        if (skipSeparationSpace(state, true, -1)) {
            atNewLine = true;
            if (state.lineIndent > parentIndent) {
                indentStatus = 1;
            }
            else if (state.lineIndent === parentIndent) {
                indentStatus = 0;
            }
            else if (state.lineIndent < parentIndent) {
                indentStatus = -1;
            }
        }
    }
    var tagStart = state.position;
    var tagColumn = state.position - state.lineStart;
    if (1 === indentStatus) {
        while (readTagProperty(state) || readAnchorProperty(state)) {
            if (skipSeparationSpace(state, true, -1)) {
                atNewLine = true;
                allowBlockCollections = allowBlockStyles;
                if (state.lineIndent > parentIndent) {
                    indentStatus = 1;
                }
                else if (state.lineIndent === parentIndent) {
                    indentStatus = 0;
                }
                else if (state.lineIndent < parentIndent) {
                    indentStatus = -1;
                }
            }
            else {
                allowBlockCollections = false;
            }
        }
    }
    if (allowBlockCollections) {
        allowBlockCollections = atNewLine || allowCompact;
    }
    if (1 === indentStatus || CONTEXT_BLOCK_OUT === nodeContext) {
        if (CONTEXT_FLOW_IN === nodeContext || CONTEXT_FLOW_OUT === nodeContext) {
            flowIndent = parentIndent;
        }
        else {
            flowIndent = parentIndent + 1;
        }
        blockIndent = state.position - state.lineStart;
        if (1 === indentStatus) {
            if (allowBlockCollections &&
                (readBlockSequence(state, blockIndent) ||
                    readBlockMapping(state, blockIndent, flowIndent)) ||
                readFlowCollection(state, flowIndent)) {
                hasContent = true;
            }
            else {
                if ((allowBlockScalars && readBlockScalar(state, flowIndent)) ||
                    readSingleQuotedScalar(state, flowIndent) ||
                    readDoubleQuotedScalar(state, flowIndent)) {
                    hasContent = true;
                }
                else if (readAlias(state)) {
                    hasContent = true;
                    if (null !== state.tag || null !== state.anchor) {
                        throwError(state, 'alias node should not have any properties');
                    }
                }
                else if (readPlainScalar(state, flowIndent, CONTEXT_FLOW_IN === nodeContext)) {
                    hasContent = true;
                    if (null === state.tag) {
                        state.tag = '?';
                    }
                }
                if (null !== state.anchor) {
                    state.anchorMap[state.anchor] = state.result;
                    state.result.anchorId = state.anchor;
                }
            }
        }
        else if (0 === indentStatus) {
            hasContent = allowBlockCollections && readBlockSequence(state, blockIndent);
        }
    }
    if (null !== state.tag && '!' !== state.tag) {
        if (state.tag == "!include") {
            if (!state.result) {
                state.result = ast.newScalar();
                state.result.startPosition = state.position;
                state.result.endPosition = state.position;
                throwError(state, "!include without value");
            }
            state.result.kind = ast.Kind.INCLUDE_REF;
        }
        else if ('?' === state.tag) {
            for (typeIndex = 0, typeQuantity = state.implicitTypes.length; typeIndex < typeQuantity; typeIndex += 1) {
                type = state.implicitTypes[typeIndex];
                var vl = state.result['value'];
                if (type.resolve(vl)) {
                    state.result.valueObject = type.construct(state.result['value']);
                    state.tag = type.tag;
                    if (null !== state.anchor) {
                        state.result.anchorId = state.anchor;
                        state.anchorMap[state.anchor] = state.result;
                    }
                    break;
                }
            }
        }
        else if (_hasOwnProperty.call(state.typeMap, state.tag)) {
            type = state.typeMap[state.tag];
            if (null !== state.result && type.kind !== state.kind) {
                throwError(state, 'unacceptable node kind for !<' + state.tag + '> tag; it should be "' + type.kind + '", not "' + state.kind + '"');
            }
            if (!type.resolve(state.result)) {
                throwError(state, 'cannot resolve a node with !<' + state.tag + '> explicit tag');
            }
            else {
                state.result = type.construct(state.result);
                if (null !== state.anchor) {
                    state.result.anchorId = state.anchor;
                    state.anchorMap[state.anchor] = state.result;
                }
            }
        }
        else {
            throwErrorFromPosition(state, tagStart, 'unknown tag <' + state.tag + '>', false, true);
        }
    }
    return null !== state.tag || null !== state.anchor || hasContent;
}
function readDocument(state) {
    var documentStart = state.position, _position, directiveName, directiveArgs, hasDirectives = false, ch;
    state.version = null;
    state.checkLineBreaks = state.legacy;
    state.tagMap = {};
    state.anchorMap = {};
    while (0 !== (ch = state.input.charCodeAt(state.position))) {
        skipSeparationSpace(state, true, -1);
        ch = state.input.charCodeAt(state.position);
        if (state.lineIndent > 0 || 0x25 !== ch) {
            break;
        }
        hasDirectives = true;
        ch = state.input.charCodeAt(++state.position);
        _position = state.position;
        while (0 !== ch && !is_WS_OR_EOL(ch)) {
            ch = state.input.charCodeAt(++state.position);
        }
        directiveName = state.input.slice(_position, state.position);
        directiveArgs = [];
        if (directiveName.length < 1) {
            throwError(state, 'directive name must not be less than one character in length');
        }
        while (0 !== ch) {
            while (is_WHITE_SPACE(ch)) {
                ch = state.input.charCodeAt(++state.position);
            }
            if (0x23 === ch) {
                do {
                    ch = state.input.charCodeAt(++state.position);
                } while (0 !== ch && !is_EOL(ch));
                break;
            }
            if (is_EOL(ch)) {
                break;
            }
            _position = state.position;
            while (0 !== ch && !is_WS_OR_EOL(ch)) {
                ch = state.input.charCodeAt(++state.position);
            }
            directiveArgs.push(state.input.slice(_position, state.position));
        }
        if (0 !== ch) {
            readLineBreak(state);
        }
        if (_hasOwnProperty.call(directiveHandlers, directiveName)) {
            directiveHandlers[directiveName](state, directiveName, directiveArgs);
        }
        else {
            throwWarning(state, 'unknown document directive "' + directiveName + '"');
            state.position++;
        }
    }
    skipSeparationSpace(state, true, -1);
    if (0 === state.lineIndent &&
        0x2D === state.input.charCodeAt(state.position) &&
        0x2D === state.input.charCodeAt(state.position + 1) &&
        0x2D === state.input.charCodeAt(state.position + 2)) {
        state.position += 3;
        skipSeparationSpace(state, true, -1);
    }
    else if (hasDirectives) {
        throwError(state, 'directives end mark is expected');
    }
    composeNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, true);
    skipSeparationSpace(state, true, -1);
    if (state.checkLineBreaks &&
        PATTERN_NON_ASCII_LINE_BREAKS.test(state.input.slice(documentStart, state.position))) {
        throwWarning(state, 'non-ASCII line breaks are interpreted as content');
    }
    state.documents.push(state.result);
    if (state.position === state.lineStart && testDocumentSeparator(state)) {
        if (0x2E === state.input.charCodeAt(state.position)) {
            state.position += 3;
            skipSeparationSpace(state, true, -1);
        }
        return;
    }
    if (state.position < (state.length - 1)) {
        throwError(state, 'end of the stream or a document separator is expected');
    }
    else {
        return;
    }
}
function loadDocuments(input, options) {
    input = String(input);
    options = options || {};
    var inputLength = input.length;
    if (inputLength !== 0) {
        if (0x0A !== input.charCodeAt(inputLength - 1) &&
            0x0D !== input.charCodeAt(inputLength - 1)) {
            input += '\n';
        }
        if (input.charCodeAt(0) === 0xFEFF) {
            input = input.slice(1);
        }
    }
    var state = new State(input, options);
    state.input += '\0';
    while (0x20 === state.input.charCodeAt(state.position)) {
        state.lineIndent += 1;
        state.position += 1;
    }
    while (state.position < (state.length - 1)) {
        var q = state.position;
        readDocument(state);
        if (state.position <= q) {
            for (; state.position < state.length - 1; state.position++) {
                var c = state.input.charAt(state.position);
                if (c == '\n') {
                    break;
                }
            }
        }
    }
    var documents = state.documents;
    var docsCount = documents.length;
    if (docsCount > 0) {
        documents[docsCount - 1].endPosition = inputLength;
    }
    for (var _i = 0, documents_1 = documents; _i < documents_1.length; _i++) {
        var x = documents_1[_i];
        x.errors = state.errors;
        if (x.startPosition > x.endPosition) {
            x.startPosition = x.endPosition;
        }
    }
    return documents;
}
function loadAll(input, iterator, options) {
    if (options === void 0) { options = {}; }
    var documents = loadDocuments(input, options), index, length;
    for (index = 0, length = documents.length; index < length; index += 1) {
        iterator(documents[index]);
    }
}
exports.loadAll = loadAll;
function load(input, options) {
    if (options === void 0) { options = {}; }
    var documents = loadDocuments(input, options), index, length;
    if (0 === documents.length) {
        return undefined;
    }
    else if (1 === documents.length) {
        return documents[0];
    }
    var e = new YAMLException('expected a single document in the stream, but found more');
    e.mark = new Mark("", "", 0, 0, 0);
    e.mark.position = documents[0].endPosition;
    documents[0].errors.push(e);
    return documents[0];
}
exports.load = load;
function safeLoadAll(input, output, options) {
    if (options === void 0) { options = {}; }
    loadAll(input, output, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options));
}
exports.safeLoadAll = safeLoadAll;
function safeLoad(input, options) {
    if (options === void 0) { options = {}; }
    return load(input, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options));
}
exports.safeLoad = safeLoad;
module.exports.loadAll = loadAll;
module.exports.load = load;
module.exports.safeLoadAll = safeLoadAll;
module.exports.safeLoad = safeLoad;
//# sourceMappingURL=loader.js.map

/***/ }),

/***/ 6324:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var common = __webpack_require__(7195);
var Mark = (function () {
    function Mark(name, buffer, position, line, column) {
        this.name = name;
        this.buffer = buffer;
        this.position = position;
        this.line = line;
        this.column = column;
    }
    Mark.prototype.getSnippet = function (indent, maxLength) {
        if (indent === void 0) { indent = 0; }
        if (maxLength === void 0) { maxLength = 75; }
        var head, start, tail, end, snippet;
        if (!this.buffer) {
            return null;
        }
        indent = indent || 4;
        maxLength = maxLength || 75;
        head = '';
        start = this.position;
        while (start > 0 && -1 === '\x00\r\n\x85\u2028\u2029'.indexOf(this.buffer.charAt(start - 1))) {
            start -= 1;
            if (this.position - start > (maxLength / 2 - 1)) {
                head = ' ... ';
                start += 5;
                break;
            }
        }
        tail = '';
        end = this.position;
        while (end < this.buffer.length && -1 === '\x00\r\n\x85\u2028\u2029'.indexOf(this.buffer.charAt(end))) {
            end += 1;
            if (end - this.position > (maxLength / 2 - 1)) {
                tail = ' ... ';
                end -= 5;
                break;
            }
        }
        snippet = this.buffer.slice(start, end);
        return common.repeat(' ', indent) + head + snippet + tail + '\n' +
            common.repeat(' ', indent + this.position - start + head.length) + '^';
    };
    Mark.prototype.toString = function (compact) {
        if (compact === void 0) { compact = true; }
        var snippet, where = '';
        if (this.name) {
            where += 'in "' + this.name + '" ';
        }
        where += 'at line ' + (this.line + 1) + ', column ' + (this.column + 1);
        if (!compact) {
            snippet = this.getSnippet();
            if (snippet) {
                where += ':\n' + snippet;
            }
        }
        return where;
    };
    return Mark;
}());
module.exports = Mark;
//# sourceMappingURL=mark.js.map

/***/ }),

/***/ 2434:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
function parseYamlBoolean(input) {
    if (["true", "True", "TRUE"].lastIndexOf(input) >= 0) {
        return true;
    }
    else if (["false", "False", "FALSE"].lastIndexOf(input) >= 0) {
        return false;
    }
    throw "Invalid boolean \"" + input + "\"";
}
exports.parseYamlBoolean = parseYamlBoolean;
function safeParseYamlInteger(input) {
    if (input.lastIndexOf('0o', 0) === 0) {
        return parseInt(input.substring(2), 8);
    }
    return parseInt(input);
}
function parseYamlInteger(input) {
    var result = safeParseYamlInteger(input);
    if (isNaN(result)) {
        throw "Invalid integer \"" + input + "\"";
    }
    return result;
}
exports.parseYamlInteger = parseYamlInteger;
function parseYamlFloat(input) {
    if ([".nan", ".NaN", ".NAN"].lastIndexOf(input) >= 0) {
        return NaN;
    }
    var infinity = /^([-+])?(?:\.inf|\.Inf|\.INF)$/;
    var match = infinity.exec(input);
    if (match) {
        return (match[1] === '-') ? -Infinity : Infinity;
    }
    var result = parseFloat(input);
    if (!isNaN(result)) {
        return result;
    }
    throw "Invalid float \"" + input + "\"";
}
exports.parseYamlFloat = parseYamlFloat;
var ScalarType;
(function (ScalarType) {
    ScalarType[ScalarType["null"] = 0] = "null";
    ScalarType[ScalarType["bool"] = 1] = "bool";
    ScalarType[ScalarType["int"] = 2] = "int";
    ScalarType[ScalarType["float"] = 3] = "float";
    ScalarType[ScalarType["string"] = 4] = "string";
})(ScalarType = exports.ScalarType || (exports.ScalarType = {}));
function determineScalarType(node) {
    if (node === undefined) {
        return ScalarType.null;
    }
    if (node.doubleQuoted || !node.plainScalar || node['singleQuoted']) {
        return ScalarType.string;
    }
    var value = node.value;
    if (["null", "Null", "NULL", "~", ''].indexOf(value) >= 0) {
        return ScalarType.null;
    }
    if (value === null || value === undefined) {
        return ScalarType.null;
    }
    if (["true", "True", "TRUE", "false", "False", "FALSE"].indexOf(value) >= 0) {
        return ScalarType.bool;
    }
    var base10 = /^[-+]?[0-9]+$/;
    var base8 = /^0o[0-7]+$/;
    var base16 = /^0x[0-9a-fA-F]+$/;
    if (base10.test(value) || base8.test(value) || base16.test(value)) {
        return ScalarType.int;
    }
    var float = /^[-+]?(\.[0-9]+|[0-9]+(\.[0-9]*)?)([eE][-+]?[0-9]+)?$/;
    var infinity = /^[-+]?(\.inf|\.Inf|\.INF)$/;
    if (float.test(value) || infinity.test(value) || [".nan", ".NaN", ".NAN"].indexOf(value) >= 0) {
        return ScalarType.float;
    }
    return ScalarType.string;
}
exports.determineScalarType = determineScalarType;
//# sourceMappingURL=scalarInference.js.map

/***/ }),

/***/ 6488:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var common = __webpack_require__(7195);
var YAMLException = __webpack_require__(1629);
var type_1 = __webpack_require__(4642);
function compileList(schema, name, result) {
    var exclude = [];
    schema.include.forEach(function (includedSchema) {
        result = compileList(includedSchema, name, result);
    });
    schema[name].forEach(function (currentType) {
        result.forEach(function (previousType, previousIndex) {
            if (previousType.tag === currentType.tag) {
                exclude.push(previousIndex);
            }
        });
        result.push(currentType);
    });
    return result.filter(function (type, index) {
        return -1 === exclude.indexOf(index);
    });
}
function compileMap() {
    var result = {}, index, length;
    function collectType(type) {
        result[type.tag] = type;
    }
    for (index = 0, length = arguments.length; index < length; index += 1) {
        arguments[index].forEach(collectType);
    }
    return result;
}
var Schema = (function () {
    function Schema(definition) {
        this.include = definition.include || [];
        this.implicit = definition.implicit || [];
        this.explicit = definition.explicit || [];
        this.implicit.forEach(function (type) {
            if (type.loadKind && 'scalar' !== type.loadKind) {
                throw new YAMLException('There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.');
            }
        });
        this.compiledImplicit = compileList(this, 'implicit', []);
        this.compiledExplicit = compileList(this, 'explicit', []);
        this.compiledTypeMap = compileMap(this.compiledImplicit, this.compiledExplicit);
    }
    Schema.DEFAULT = null;
    Schema.create = function createSchema() {
        var schemas, types;
        switch (arguments.length) {
            case 1:
                schemas = Schema.DEFAULT;
                types = arguments[0];
                break;
            case 2:
                schemas = arguments[0];
                types = arguments[1];
                break;
            default:
                throw new YAMLException('Wrong number of arguments for Schema.create function');
        }
        schemas = common.toArray(schemas);
        types = common.toArray(types);
        if (!schemas.every(function (schema) { return schema instanceof Schema; })) {
            throw new YAMLException('Specified list of super schemas (or a single Schema object) contains a non-Schema object.');
        }
        if (!types.every(function (type) { return type instanceof type_1.Type; })) {
            throw new YAMLException('Specified list of YAML types (or a single Type object) contains a non-Type object.');
        }
        return new Schema({
            include: schemas,
            explicit: types
        });
    };
    return Schema;
}());
exports.Schema = Schema;
//# sourceMappingURL=schema.js.map

/***/ }),

/***/ 1038:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var schema_1 = __webpack_require__(6488);
module.exports = new schema_1.Schema({
    include: [
        __webpack_require__(8168)
    ]
});
//# sourceMappingURL=core.js.map

/***/ }),

/***/ 5589:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var schema_1 = __webpack_require__(6488);
var schema = new schema_1.Schema({
    include: [
        __webpack_require__(8518)
    ],
    explicit: [
        __webpack_require__(2706),
        __webpack_require__(7018)
    ]
});
schema_1.Schema.DEFAULT = schema;
module.exports = schema;
//# sourceMappingURL=default_full.js.map

/***/ }),

/***/ 8518:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var schema_1 = __webpack_require__(6488);
var schema = new schema_1.Schema({
    include: [
        __webpack_require__(1038)
    ],
    implicit: [
        __webpack_require__(4214),
        __webpack_require__(8676)
    ],
    explicit: [
        __webpack_require__(7892),
        __webpack_require__(2246),
        __webpack_require__(2594),
        __webpack_require__(6840)
    ]
});
module.exports = schema;
//# sourceMappingURL=default_safe.js.map

/***/ }),

/***/ 8651:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var schema_1 = __webpack_require__(6488);
module.exports = new schema_1.Schema({
    explicit: [
        __webpack_require__(5801),
        __webpack_require__(5861),
        __webpack_require__(7444)
    ]
});
//# sourceMappingURL=failsafe.js.map

/***/ }),

/***/ 8168:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var schema_1 = __webpack_require__(6488);
module.exports = new schema_1.Schema({
    include: [
        __webpack_require__(8651)
    ],
    implicit: [
        __webpack_require__(4322),
        __webpack_require__(1242),
        __webpack_require__(2739),
        __webpack_require__(56)
    ]
});
//# sourceMappingURL=json.js.map

/***/ }),

/***/ 4642:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var YAMLException = __webpack_require__(1629);
var TYPE_CONSTRUCTOR_OPTIONS = [
    'kind',
    'resolve',
    'construct',
    'instanceOf',
    'predicate',
    'represent',
    'defaultStyle',
    'styleAliases'
];
var YAML_NODE_KINDS = [
    'scalar',
    'sequence',
    'mapping'
];
function compileStyleAliases(map) {
    var result = {};
    if (null !== map) {
        Object.keys(map).forEach(function (style) {
            map[style].forEach(function (alias) {
                result[String(alias)] = style;
            });
        });
    }
    return result;
}
var Type = (function () {
    function Type(tag, options) {
        options = options || {};
        Object.keys(options).forEach(function (name) {
            if (-1 === TYPE_CONSTRUCTOR_OPTIONS.indexOf(name)) {
                throw new YAMLException('Unknown option "' + name + '" is met in definition of "' + tag + '" YAML type.');
            }
        });
        this.tag = tag;
        this.kind = options['kind'] || null;
        this.resolve = options['resolve'] || function () { return true; };
        this.construct = options['construct'] || function (data) { return data; };
        this.instanceOf = options['instanceOf'] || null;
        this.predicate = options['predicate'] || null;
        this.represent = options['represent'] || null;
        this.defaultStyle = options['defaultStyle'] || null;
        this.styleAliases = compileStyleAliases(options['styleAliases'] || null);
        if (-1 === YAML_NODE_KINDS.indexOf(this.kind)) {
            throw new YAMLException('Unknown kind "' + this.kind + '" is specified for "' + tag + '" YAML type.');
        }
    }
    return Type;
}());
exports.Type = Type;
//# sourceMappingURL=type.js.map

/***/ }),

/***/ 7892:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var NodeBuffer = __webpack_require__(4293).Buffer;
var type_1 = __webpack_require__(4642);
var BASE64_MAP = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r';
function resolveYamlBinary(data) {
    if (null === data) {
        return false;
    }
    var code, idx, bitlen = 0, len = 0, max = data.length, map = BASE64_MAP;
    for (idx = 0; idx < max; idx++) {
        code = map.indexOf(data.charAt(idx));
        if (code > 64) {
            continue;
        }
        if (code < 0) {
            return false;
        }
        bitlen += 6;
    }
    return (bitlen % 8) === 0;
}
function constructYamlBinary(data) {
    var code, idx, tailbits, input = data.replace(/[\r\n=]/g, ''), max = input.length, map = BASE64_MAP, bits = 0, result = [];
    for (idx = 0; idx < max; idx++) {
        if ((idx % 4 === 0) && idx) {
            result.push((bits >> 16) & 0xFF);
            result.push((bits >> 8) & 0xFF);
            result.push(bits & 0xFF);
        }
        bits = (bits << 6) | map.indexOf(input.charAt(idx));
    }
    tailbits = (max % 4) * 6;
    if (tailbits === 0) {
        result.push((bits >> 16) & 0xFF);
        result.push((bits >> 8) & 0xFF);
        result.push(bits & 0xFF);
    }
    else if (tailbits === 18) {
        result.push((bits >> 10) & 0xFF);
        result.push((bits >> 2) & 0xFF);
    }
    else if (tailbits === 12) {
        result.push((bits >> 4) & 0xFF);
    }
    if (NodeBuffer) {
        return new NodeBuffer(result);
    }
    return result;
}
function representYamlBinary(object) {
    var result = '', bits = 0, idx, tail, max = object.length, map = BASE64_MAP;
    for (idx = 0; idx < max; idx++) {
        if ((idx % 3 === 0) && idx) {
            result += map[(bits >> 18) & 0x3F];
            result += map[(bits >> 12) & 0x3F];
            result += map[(bits >> 6) & 0x3F];
            result += map[bits & 0x3F];
        }
        bits = (bits << 8) + object[idx];
    }
    tail = max % 3;
    if (tail === 0) {
        result += map[(bits >> 18) & 0x3F];
        result += map[(bits >> 12) & 0x3F];
        result += map[(bits >> 6) & 0x3F];
        result += map[bits & 0x3F];
    }
    else if (tail === 2) {
        result += map[(bits >> 10) & 0x3F];
        result += map[(bits >> 4) & 0x3F];
        result += map[(bits << 2) & 0x3F];
        result += map[64];
    }
    else if (tail === 1) {
        result += map[(bits >> 2) & 0x3F];
        result += map[(bits << 4) & 0x3F];
        result += map[64];
        result += map[64];
    }
    return result;
}
function isBinary(object) {
    return NodeBuffer && NodeBuffer.isBuffer(object);
}
module.exports = new type_1.Type('tag:yaml.org,2002:binary', {
    kind: 'scalar',
    resolve: resolveYamlBinary,
    construct: constructYamlBinary,
    predicate: isBinary,
    represent: representYamlBinary
});
//# sourceMappingURL=binary.js.map

/***/ }),

/***/ 1242:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

'use strict';
var type_1 = __webpack_require__(4642);
function resolveYamlBoolean(data) {
    if (null === data) {
        return false;
    }
    var max = data.length;
    return (max === 4 && (data === 'true' || data === 'True' || data === 'TRUE')) ||
        (max === 5 && (data === 'false' || data === 'False' || data === 'FALSE'));
}
function constructYamlBoolean(data) {
    return data === 'true' ||
        data === 'True' ||
        data === 'TRUE';
}
function isBoolean(object) {
    return '[object Boolean]' === Object.prototype.toString.call(object);
}
module.exports = new type_1.Type('tag:yaml.org,2002:bool', {
    kind: 'scalar',
    resolve: resolveYamlBoolean,
    construct: constructYamlBoolean,
    predicate: isBoolean,
    represent: {
        lowercase: function (object) { return object ? 'true' : 'false'; },
        uppercase: function (object) { return object ? 'TRUE' : 'FALSE'; },
        camelcase: function (object) { return object ? 'True' : 'False'; }
    },
    defaultStyle: 'lowercase'
});
//# sourceMappingURL=bool.js.map

/***/ }),

/***/ 56:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var common = __webpack_require__(7195);
var type_1 = __webpack_require__(4642);
var YAML_FLOAT_PATTERN = new RegExp('^(?:[-+]?(?:[0-9][0-9_]*)\\.[0-9_]*(?:[eE][-+][0-9]+)?' +
    '|\\.[0-9_]+(?:[eE][-+][0-9]+)?' +
    '|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*' +
    '|[-+]?\\.(?:inf|Inf|INF)' +
    '|\\.(?:nan|NaN|NAN))$');
function resolveYamlFloat(data) {
    if (null === data) {
        return false;
    }
    var value, sign, base, digits;
    if (!YAML_FLOAT_PATTERN.test(data)) {
        return false;
    }
    return true;
}
function constructYamlFloat(data) {
    var value, sign, base, digits;
    value = data.replace(/_/g, '').toLowerCase();
    sign = '-' === value[0] ? -1 : 1;
    digits = [];
    if (0 <= '+-'.indexOf(value[0])) {
        value = value.slice(1);
    }
    if ('.inf' === value) {
        return (1 === sign) ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
    }
    else if ('.nan' === value) {
        return NaN;
    }
    else if (0 <= value.indexOf(':')) {
        value.split(':').forEach(function (v) {
            digits.unshift(parseFloat(v, 10));
        });
        value = 0.0;
        base = 1;
        digits.forEach(function (d) {
            value += d * base;
            base *= 60;
        });
        return sign * value;
    }
    return sign * parseFloat(value, 10);
}
function representYamlFloat(object, style) {
    if (isNaN(object)) {
        switch (style) {
            case 'lowercase':
                return '.nan';
            case 'uppercase':
                return '.NAN';
            case 'camelcase':
                return '.NaN';
        }
    }
    else if (Number.POSITIVE_INFINITY === object) {
        switch (style) {
            case 'lowercase':
                return '.inf';
            case 'uppercase':
                return '.INF';
            case 'camelcase':
                return '.Inf';
        }
    }
    else if (Number.NEGATIVE_INFINITY === object) {
        switch (style) {
            case 'lowercase':
                return '-.inf';
            case 'uppercase':
                return '-.INF';
            case 'camelcase':
                return '-.Inf';
        }
    }
    else if (common.isNegativeZero(object)) {
        return '-0.0';
    }
    return object.toString(10);
}
function isFloat(object) {
    return ('[object Number]' === Object.prototype.toString.call(object)) &&
        (0 !== object % 1 || common.isNegativeZero(object));
}
module.exports = new type_1.Type('tag:yaml.org,2002:float', {
    kind: 'scalar',
    resolve: resolveYamlFloat,
    construct: constructYamlFloat,
    predicate: isFloat,
    represent: representYamlFloat,
    defaultStyle: 'lowercase'
});
//# sourceMappingURL=float.js.map

/***/ }),

/***/ 2739:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var common = __webpack_require__(7195);
var type_1 = __webpack_require__(4642);
function isHexCode(c) {
    return ((0x30 <= c) && (c <= 0x39)) ||
        ((0x41 <= c) && (c <= 0x46)) ||
        ((0x61 <= c) && (c <= 0x66));
}
function isOctCode(c) {
    return ((0x30 <= c) && (c <= 0x37));
}
function isDecCode(c) {
    return ((0x30 <= c) && (c <= 0x39));
}
function resolveYamlInteger(data) {
    if (null === data) {
        return false;
    }
    var max = data.length, index = 0, hasDigits = false, ch;
    if (!max) {
        return false;
    }
    ch = data[index];
    if (ch === '-' || ch === '+') {
        ch = data[++index];
    }
    if (ch === '0') {
        if (index + 1 === max) {
            return true;
        }
        ch = data[++index];
        if (ch === 'b') {
            index++;
            for (; index < max; index++) {
                ch = data[index];
                if (ch === '_') {
                    continue;
                }
                if (ch !== '0' && ch !== '1') {
                    return false;
                }
                hasDigits = true;
            }
            return hasDigits;
        }
        if (ch === 'x') {
            index++;
            for (; index < max; index++) {
                ch = data[index];
                if (ch === '_') {
                    continue;
                }
                if (!isHexCode(data.charCodeAt(index))) {
                    return false;
                }
                hasDigits = true;
            }
            return hasDigits;
        }
        for (; index < max; index++) {
            ch = data[index];
            if (ch === '_') {
                continue;
            }
            if (!isOctCode(data.charCodeAt(index))) {
                return false;
            }
            hasDigits = true;
        }
        return hasDigits;
    }
    for (; index < max; index++) {
        ch = data[index];
        if (ch === '_') {
            continue;
        }
        if (ch === ':') {
            break;
        }
        if (!isDecCode(data.charCodeAt(index))) {
            return false;
        }
        hasDigits = true;
    }
    if (!hasDigits) {
        return false;
    }
    if (ch !== ':') {
        return true;
    }
    return /^(:[0-5]?[0-9])+$/.test(data.slice(index));
}
function constructYamlInteger(data) {
    var value = data, sign = 1, ch, base, digits = [];
    if (value.indexOf('_') !== -1) {
        value = value.replace(/_/g, '');
    }
    ch = value[0];
    if (ch === '-' || ch === '+') {
        if (ch === '-') {
            sign = -1;
        }
        value = value.slice(1);
        ch = value[0];
    }
    if ('0' === value) {
        return 0;
    }
    if (ch === '0') {
        if (value[1] === 'b') {
            return sign * parseInt(value.slice(2), 2);
        }
        if (value[1] === 'x') {
            return sign * parseInt(value, 16);
        }
        return sign * parseInt(value, 8);
    }
    if (value.indexOf(':') !== -1) {
        value.split(':').forEach(function (v) {
            digits.unshift(parseInt(v, 10));
        });
        value = 0;
        base = 1;
        digits.forEach(function (d) {
            value += (d * base);
            base *= 60;
        });
        return sign * value;
    }
    return sign * parseInt(value, 10);
}
function isInteger(object) {
    return ('[object Number]' === Object.prototype.toString.call(object)) &&
        (0 === object % 1 && !common.isNegativeZero(object));
}
module.exports = new type_1.Type('tag:yaml.org,2002:int', {
    kind: 'scalar',
    resolve: resolveYamlInteger,
    construct: constructYamlInteger,
    predicate: isInteger,
    represent: {
        binary: function (object) { return '0b' + object.toString(2); },
        octal: function (object) { return '0' + object.toString(8); },
        decimal: function (object) { return object.toString(10); },
        hexadecimal: function (object) { return '0x' + object.toString(16).toUpperCase(); }
    },
    defaultStyle: 'decimal',
    styleAliases: {
        binary: [2, 'bin'],
        octal: [8, 'oct'],
        decimal: [10, 'dec'],
        hexadecimal: [16, 'hex']
    }
});
//# sourceMappingURL=int.js.map

/***/ }),

/***/ 7018:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var type_1 = __webpack_require__(4642);
function resolveJavascriptRegExp(data) {
    if (null === data) {
        return false;
    }
    if (0 === data.length) {
        return false;
    }
    var regexp = data, tail = /\/([gim]*)$/.exec(data), modifiers = '';
    if ('/' === regexp[0]) {
        if (tail) {
            modifiers = tail[1];
        }
        if (modifiers.length > 3) {
            return false;
        }
        if (regexp[regexp.length - modifiers.length - 1] !== '/') {
            return false;
        }
        regexp = regexp.slice(1, regexp.length - modifiers.length - 1);
    }
    try {
        var dummy = new RegExp(regexp, modifiers);
        return true;
    }
    catch (error) {
        return false;
    }
}
function constructJavascriptRegExp(data) {
    var regexp = data, tail = /\/([gim]*)$/.exec(data), modifiers = '';
    if ('/' === regexp[0]) {
        if (tail) {
            modifiers = tail[1];
        }
        regexp = regexp.slice(1, regexp.length - modifiers.length - 1);
    }
    return new RegExp(regexp, modifiers);
}
function representJavascriptRegExp(object) {
    var result = '/' + object.source + '/';
    if (object.global) {
        result += 'g';
    }
    if (object.multiline) {
        result += 'm';
    }
    if (object.ignoreCase) {
        result += 'i';
    }
    return result;
}
function isRegExp(object) {
    return '[object RegExp]' === Object.prototype.toString.call(object);
}
module.exports = new type_1.Type('tag:yaml.org,2002:js/regexp', {
    kind: 'scalar',
    resolve: resolveJavascriptRegExp,
    construct: constructJavascriptRegExp,
    predicate: isRegExp,
    represent: representJavascriptRegExp
});
//# sourceMappingURL=regexp.js.map

/***/ }),

/***/ 2706:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var type_1 = __webpack_require__(4642);
function resolveJavascriptUndefined() {
    return true;
}
function constructJavascriptUndefined() {
    return undefined;
}
function representJavascriptUndefined() {
    return '';
}
function isUndefined(object) {
    return 'undefined' === typeof object;
}
module.exports = new type_1.Type('tag:yaml.org,2002:js/undefined', {
    kind: 'scalar',
    resolve: resolveJavascriptUndefined,
    construct: constructJavascriptUndefined,
    predicate: isUndefined,
    represent: representJavascriptUndefined
});
//# sourceMappingURL=undefined.js.map

/***/ }),

/***/ 7444:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var type_1 = __webpack_require__(4642);
module.exports = new type_1.Type('tag:yaml.org,2002:map', {
    kind: 'mapping',
    construct: function (data) { return null !== data ? data : {}; }
});
//# sourceMappingURL=map.js.map

/***/ }),

/***/ 8676:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var type_1 = __webpack_require__(4642);
function resolveYamlMerge(data) {
    return '<<' === data || null === data;
}
module.exports = new type_1.Type('tag:yaml.org,2002:merge', {
    kind: 'scalar',
    resolve: resolveYamlMerge
});
//# sourceMappingURL=merge.js.map

/***/ }),

/***/ 4322:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var type_1 = __webpack_require__(4642);
function resolveYamlNull(data) {
    if (null === data) {
        return true;
    }
    var max = data.length;
    return (max === 1 && data === '~') ||
        (max === 4 && (data === 'null' || data === 'Null' || data === 'NULL'));
}
function constructYamlNull() {
    return null;
}
function isNull(object) {
    return null === object;
}
module.exports = new type_1.Type('tag:yaml.org,2002:null', {
    kind: 'scalar',
    resolve: resolveYamlNull,
    construct: constructYamlNull,
    predicate: isNull,
    represent: {
        canonical: function () { return '~'; },
        lowercase: function () { return 'null'; },
        uppercase: function () { return 'NULL'; },
        camelcase: function () { return 'Null'; }
    },
    defaultStyle: 'lowercase'
});
//# sourceMappingURL=null.js.map

/***/ }),

/***/ 2246:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var type_1 = __webpack_require__(4642);
var _hasOwnProperty = Object.prototype.hasOwnProperty;
var _toString = Object.prototype.toString;
function resolveYamlOmap(data) {
    if (null === data) {
        return true;
    }
    var objectKeys = [], index, length, pair, pairKey, pairHasKey, object = data;
    for (index = 0, length = object.length; index < length; index += 1) {
        pair = object[index];
        pairHasKey = false;
        if ('[object Object]' !== _toString.call(pair)) {
            return false;
        }
        for (pairKey in pair) {
            if (_hasOwnProperty.call(pair, pairKey)) {
                if (!pairHasKey) {
                    pairHasKey = true;
                }
                else {
                    return false;
                }
            }
        }
        if (!pairHasKey) {
            return false;
        }
        if (-1 === objectKeys.indexOf(pairKey)) {
            objectKeys.push(pairKey);
        }
        else {
            return false;
        }
    }
    return true;
}
function constructYamlOmap(data) {
    return null !== data ? data : [];
}
module.exports = new type_1.Type('tag:yaml.org,2002:omap', {
    kind: 'sequence',
    resolve: resolveYamlOmap,
    construct: constructYamlOmap
});
//# sourceMappingURL=omap.js.map

/***/ }),

/***/ 2594:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var type_1 = __webpack_require__(4642);
var ast = __webpack_require__(9421);
var _toString = Object.prototype.toString;
function resolveYamlPairs(data) {
    if (null === data) {
        return true;
    }
    if (data.kind != ast.Kind.SEQ) {
        return false;
    }
    var index, length, pair, keys, result, object = data.items;
    for (index = 0, length = object.length; index < length; index += 1) {
        pair = object[index];
        if ('[object Object]' !== _toString.call(pair)) {
            return false;
        }
        if (!Array.isArray(pair.mappings)) {
            return false;
        }
        if (1 !== pair.mappings.length) {
            return false;
        }
    }
    return true;
}
function constructYamlPairs(data) {
    if (null === data || !Array.isArray(data.items)) {
        return [];
    }
    var index, length, keys, result, object = data.items;
    result = ast.newItems();
    result.parent = data.parent;
    result.startPosition = data.startPosition;
    result.endPosition = data.endPosition;
    for (index = 0, length = object.length; index < length; index += 1) {
        var pair = object[index];
        var mapping = pair.mappings[0];
        var pairSeq = ast.newItems();
        pairSeq.parent = result;
        pairSeq.startPosition = mapping.key.startPosition;
        pairSeq.endPosition = mapping.value.startPosition;
        mapping.key.parent = pairSeq;
        mapping.value.parent = pairSeq;
        pairSeq.items = [mapping.key, mapping.value];
        result.items.push(pairSeq);
    }
    return result;
}
module.exports = new type_1.Type('tag:yaml.org,2002:pairs', {
    kind: 'sequence',
    resolve: resolveYamlPairs,
    construct: constructYamlPairs
});
//# sourceMappingURL=pairs.js.map

/***/ }),

/***/ 5861:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var type_1 = __webpack_require__(4642);
module.exports = new type_1.Type('tag:yaml.org,2002:seq', {
    kind: 'sequence',
    construct: function (data) { return null !== data ? data : []; }
});
//# sourceMappingURL=seq.js.map

/***/ }),

/***/ 6840:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var type_1 = __webpack_require__(4642);
var ast = __webpack_require__(9421);
var _hasOwnProperty = Object.prototype.hasOwnProperty;
function resolveYamlSet(data) {
    if (null === data) {
        return true;
    }
    if (data.kind != ast.Kind.MAP) {
        return false;
    }
    return true;
}
function constructYamlSet(data) {
    return null !== data ? data : {};
}
module.exports = new type_1.Type('tag:yaml.org,2002:set', {
    kind: 'mapping',
    resolve: resolveYamlSet,
    construct: constructYamlSet
});
//# sourceMappingURL=set.js.map

/***/ }),

/***/ 5801:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var type_1 = __webpack_require__(4642);
module.exports = new type_1.Type('tag:yaml.org,2002:str', {
    kind: 'scalar',
    construct: function (data) { return null !== data ? data : ''; }
});
//# sourceMappingURL=str.js.map

/***/ }),

/***/ 4214:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var type_1 = __webpack_require__(4642);
var YAML_TIMESTAMP_REGEXP = new RegExp('^([0-9][0-9][0-9][0-9])' +
    '-([0-9][0-9]?)' +
    '-([0-9][0-9]?)' +
    '(?:(?:[Tt]|[ \\t]+)' +
    '([0-9][0-9]?)' +
    ':([0-9][0-9])' +
    ':([0-9][0-9])' +
    '(?:\\.([0-9]*))?' +
    '(?:[ \\t]*(Z|([-+])([0-9][0-9]?)' +
    '(?::([0-9][0-9]))?))?)?$');
function resolveYamlTimestamp(data) {
    if (null === data) {
        return false;
    }
    var match, year, month, day, hour, minute, second, fraction = 0, delta = null, tz_hour, tz_minute, date;
    match = YAML_TIMESTAMP_REGEXP.exec(data);
    if (null === match) {
        return false;
    }
    return true;
}
function constructYamlTimestamp(data) {
    var match, year, month, day, hour, minute, second, fraction = 0, delta = null, tz_hour, tz_minute, date;
    match = YAML_TIMESTAMP_REGEXP.exec(data);
    if (null === match) {
        throw new Error('Date resolve error');
    }
    year = +(match[1]);
    month = +(match[2]) - 1;
    day = +(match[3]);
    if (!match[4]) {
        return new Date(Date.UTC(year, month, day));
    }
    hour = +(match[4]);
    minute = +(match[5]);
    second = +(match[6]);
    if (match[7]) {
        fraction = match[7].slice(0, 3);
        while (fraction.length < 3) {
            fraction = fraction + '0';
        }
        fraction = +fraction;
    }
    if (match[9]) {
        tz_hour = +(match[10]);
        tz_minute = +(match[11] || 0);
        delta = (tz_hour * 60 + tz_minute) * 60000;
        if ('-' === match[9]) {
            delta = -delta;
        }
    }
    date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));
    if (delta) {
        date.setTime(date.getTime() - delta);
    }
    return date;
}
function representYamlTimestamp(object) {
    return object.toISOString();
}
module.exports = new type_1.Type('tag:yaml.org,2002:timestamp', {
    kind: 'scalar',
    resolve: resolveYamlTimestamp,
    construct: constructYamlTimestamp,
    instanceOf: Date,
    represent: representYamlTimestamp
});
//# sourceMappingURL=timestamp.js.map

/***/ }),

/***/ 9421:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var Kind;
(function (Kind) {
    Kind[Kind["SCALAR"] = 0] = "SCALAR";
    Kind[Kind["MAPPING"] = 1] = "MAPPING";
    Kind[Kind["MAP"] = 2] = "MAP";
    Kind[Kind["SEQ"] = 3] = "SEQ";
    Kind[Kind["ANCHOR_REF"] = 4] = "ANCHOR_REF";
    Kind[Kind["INCLUDE_REF"] = 5] = "INCLUDE_REF";
})(Kind = exports.Kind || (exports.Kind = {}));
function newMapping(key, value) {
    var end = (value ? value.endPosition : key.endPosition + 1);
    var node = {
        key: key,
        value: value,
        startPosition: key.startPosition,
        endPosition: end,
        kind: Kind.MAPPING,
        parent: null,
        errors: []
    };
    return node;
}
exports.newMapping = newMapping;
function newAnchorRef(key, start, end, value) {
    return {
        errors: [],
        referencesAnchor: key,
        value: value,
        startPosition: start,
        endPosition: end,
        kind: Kind.ANCHOR_REF,
        parent: null
    };
}
exports.newAnchorRef = newAnchorRef;
function newScalar(v) {
    if (v === void 0) { v = ""; }
    var result = {
        errors: [],
        startPosition: -1,
        endPosition: -1,
        value: "" + v,
        kind: Kind.SCALAR,
        parent: null,
        doubleQuoted: false,
        rawValue: "" + v,
    };
    if (typeof v !== "string") {
        result.valueObject = v;
    }
    return result;
}
exports.newScalar = newScalar;
function newItems() {
    return {
        errors: [],
        startPosition: -1,
        endPosition: -1,
        items: [],
        kind: Kind.SEQ,
        parent: null
    };
}
exports.newItems = newItems;
function newSeq() {
    return newItems();
}
exports.newSeq = newSeq;
function newMap(mappings) {
    return {
        errors: [],
        startPosition: -1,
        endPosition: -1,
        mappings: mappings ? mappings : [],
        kind: Kind.MAP,
        parent: null
    };
}
exports.newMap = newMap;
//# sourceMappingURL=yamlAST.js.map

/***/ }),

/***/ 3893:
/***/ ((module) => {

module.exports = eval("require")("../config");


/***/ }),

/***/ 8717:
/***/ ((module) => {

module.exports = eval("require")("../js-yaml");


/***/ }),

/***/ 1659:
/***/ ((module) => {

module.exports = eval("require")("../oas-types");


/***/ }),

/***/ 6938:
/***/ ((module) => {

module.exports = eval("require")("./config");


/***/ }),

/***/ 1674:
/***/ ((module) => {

module.exports = eval("require")("./js-yaml");


/***/ }),

/***/ 8837:
/***/ ((module) => {

module.exports = eval("require")("./oas-types");


/***/ }),

/***/ 5565:
/***/ ((module) => {

module.exports = eval("require")("./registry-api");


/***/ }),

/***/ 9080:
/***/ ((module) => {

module.exports = eval("require")("./rules/oas2/remove-unused-components");


/***/ }),

/***/ 5872:
/***/ ((module) => {

module.exports = eval("require")("./rules/oas3/remove-unused-components");


/***/ }),

/***/ 2192:
/***/ ((module) => {

module.exports = eval("require")("./types/oas3_1");


/***/ }),

/***/ 4381:
/***/ ((module) => {

module.exports = eval("require")("./types/redocly-yaml");


/***/ }),

/***/ 3411:
/***/ ((module) => {

module.exports = eval("require")("./utils");


/***/ }),

/***/ 2065:
/***/ ((module) => {

module.exports = eval("require")("@redocly/ajv");


/***/ }),

/***/ 8750:
/***/ ((module) => {

module.exports = eval("require")("@redocly/cli/lib/utils");


/***/ }),

/***/ 2877:
/***/ ((module) => {

module.exports = eval("require")("encoding");


/***/ }),

/***/ 9290:
/***/ ((module) => {

module.exports = eval("require")("pluralize");


/***/ }),

/***/ 5666:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const tty = __webpack_require__(3867)

const env = process.env

const isDisabled = "NO_COLOR" in env
const isForced = "FORCE_COLOR" in env
const isWindows = process.platform === "win32"

const isCompatibleTerminal =
  tty && tty.isatty(1) && env.TERM && env.TERM !== "dumb"

const isCI =
  "CI" in env &&
  ("GITHUB_ACTIONS" in env || "GITLAB_CI" in env || "CIRCLECI" in env)

let enabled =
  !isDisabled && (isForced || isWindows || isCompatibleTerminal || isCI)

const raw = (open, close, searchRegex, replaceValue) => (s) =>
  enabled
    ? open +
      (~(s += "").indexOf(close, 4) // skip opening \x1b[
        ? s.replace(searchRegex, replaceValue)
        : s) +
      close
    : s

const init = (open, close) => {
  return raw(
    `\x1b[${open}m`,
    `\x1b[${close}m`,
    new RegExp(`\\x1b\\[${close}m`, "g"),
    `\x1b[${open}m`
  )
}

exports.options = Object.defineProperty({}, "enabled", {
  get: () => enabled,
  set: (value) => (enabled = value),
})

exports.reset = init(0, 0)
exports.bold = raw("\x1b[1m", "\x1b[22m", /\x1b\[22m/g, "\x1b[22m\x1b[1m")
exports.dim = raw("\x1b[2m", "\x1b[22m", /\x1b\[22m/g, "\x1b[22m\x1b[2m")
exports.italic = init(3, 23)
exports.underline = init(4, 24)
exports.inverse = init(7, 27)
exports.hidden = init(8, 28)
exports.strikethrough = init(9, 29)
exports.black = init(30, 39)
exports.red = init(31, 39)
exports.green = init(32, 39)
exports.yellow = init(33, 39)
exports.blue = init(34, 39)
exports.magenta = init(35, 39)
exports.cyan = init(36, 39)
exports.white = init(37, 39)
exports.gray = init(90, 39)
exports.bgBlack = init(40, 49)
exports.bgRed = init(41, 49)
exports.bgGreen = init(42, 49)
exports.bgYellow = init(43, 49)
exports.bgBlue = init(44, 49)
exports.bgMagenta = init(45, 49)
exports.bgCyan = init(46, 49)
exports.bgWhite = init(47, 49)
exports.blackBright = init(90, 39)
exports.redBright = init(91, 39)
exports.greenBright = init(92, 39)
exports.yellowBright = init(93, 39)
exports.blueBright = init(94, 39)
exports.magentaBright = init(95, 39)
exports.cyanBright = init(96, 39)
exports.whiteBright = init(97, 39)
exports.bgBlackBright = init(100, 49)
exports.bgRedBright = init(101, 49)
exports.bgGreenBright = init(102, 49)
exports.bgYellowBright = init(103, 49)
exports.bgBlueBright = init(104, 49)
exports.bgMagentaBright = init(105, 49)
exports.bgCyanBright = init(106, 49)
exports.bgWhiteBright = init(107, 49)


/***/ }),

/***/ 68:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse("[[[0,44],4],[[45,46],2],[47,4],[[48,57],2],[[58,64],4],[65,1,\"a\"],[66,1,\"b\"],[67,1,\"c\"],[68,1,\"d\"],[69,1,\"e\"],[70,1,\"f\"],[71,1,\"g\"],[72,1,\"h\"],[73,1,\"i\"],[74,1,\"j\"],[75,1,\"k\"],[76,1,\"l\"],[77,1,\"m\"],[78,1,\"n\"],[79,1,\"o\"],[80,1,\"p\"],[81,1,\"q\"],[82,1,\"r\"],[83,1,\"s\"],[84,1,\"t\"],[85,1,\"u\"],[86,1,\"v\"],[87,1,\"w\"],[88,1,\"x\"],[89,1,\"y\"],[90,1,\"z\"],[[91,96],4],[[97,122],2],[[123,127],4],[[128,159],3],[160,5,\" \"],[[161,167],2],[168,5,\" ̈\"],[169,2],[170,1,\"a\"],[[171,172],2],[173,7],[174,2],[175,5,\" ̄\"],[[176,177],2],[178,1,\"2\"],[179,1,\"3\"],[180,5,\" ́\"],[181,1,\"μ\"],[182,2],[183,2],[184,5,\" ̧\"],[185,1,\"1\"],[186,1,\"o\"],[187,2],[188,1,\"1⁄4\"],[189,1,\"1⁄2\"],[190,1,\"3⁄4\"],[191,2],[192,1,\"à\"],[193,1,\"á\"],[194,1,\"â\"],[195,1,\"ã\"],[196,1,\"ä\"],[197,1,\"å\"],[198,1,\"æ\"],[199,1,\"ç\"],[200,1,\"è\"],[201,1,\"é\"],[202,1,\"ê\"],[203,1,\"ë\"],[204,1,\"ì\"],[205,1,\"í\"],[206,1,\"î\"],[207,1,\"ï\"],[208,1,\"ð\"],[209,1,\"ñ\"],[210,1,\"ò\"],[211,1,\"ó\"],[212,1,\"ô\"],[213,1,\"õ\"],[214,1,\"ö\"],[215,2],[216,1,\"ø\"],[217,1,\"ù\"],[218,1,\"ú\"],[219,1,\"û\"],[220,1,\"ü\"],[221,1,\"ý\"],[222,1,\"þ\"],[223,6,\"ss\"],[[224,246],2],[247,2],[[248,255],2],[256,1,\"ā\"],[257,2],[258,1,\"ă\"],[259,2],[260,1,\"ą\"],[261,2],[262,1,\"ć\"],[263,2],[264,1,\"ĉ\"],[265,2],[266,1,\"ċ\"],[267,2],[268,1,\"č\"],[269,2],[270,1,\"ď\"],[271,2],[272,1,\"đ\"],[273,2],[274,1,\"ē\"],[275,2],[276,1,\"ĕ\"],[277,2],[278,1,\"ė\"],[279,2],[280,1,\"ę\"],[281,2],[282,1,\"ě\"],[283,2],[284,1,\"ĝ\"],[285,2],[286,1,\"ğ\"],[287,2],[288,1,\"ġ\"],[289,2],[290,1,\"ģ\"],[291,2],[292,1,\"ĥ\"],[293,2],[294,1,\"ħ\"],[295,2],[296,1,\"ĩ\"],[297,2],[298,1,\"ī\"],[299,2],[300,1,\"ĭ\"],[301,2],[302,1,\"į\"],[303,2],[304,1,\"i̇\"],[305,2],[[306,307],1,\"ij\"],[308,1,\"ĵ\"],[309,2],[310,1,\"ķ\"],[[311,312],2],[313,1,\"ĺ\"],[314,2],[315,1,\"ļ\"],[316,2],[317,1,\"ľ\"],[318,2],[[319,320],1,\"l·\"],[321,1,\"ł\"],[322,2],[323,1,\"ń\"],[324,2],[325,1,\"ņ\"],[326,2],[327,1,\"ň\"],[328,2],[329,1,\"ʼn\"],[330,1,\"ŋ\"],[331,2],[332,1,\"ō\"],[333,2],[334,1,\"ŏ\"],[335,2],[336,1,\"ő\"],[337,2],[338,1,\"œ\"],[339,2],[340,1,\"ŕ\"],[341,2],[342,1,\"ŗ\"],[343,2],[344,1,\"ř\"],[345,2],[346,1,\"ś\"],[347,2],[348,1,\"ŝ\"],[349,2],[350,1,\"ş\"],[351,2],[352,1,\"š\"],[353,2],[354,1,\"ţ\"],[355,2],[356,1,\"ť\"],[357,2],[358,1,\"ŧ\"],[359,2],[360,1,\"ũ\"],[361,2],[362,1,\"ū\"],[363,2],[364,1,\"ŭ\"],[365,2],[366,1,\"ů\"],[367,2],[368,1,\"ű\"],[369,2],[370,1,\"ų\"],[371,2],[372,1,\"ŵ\"],[373,2],[374,1,\"ŷ\"],[375,2],[376,1,\"ÿ\"],[377,1,\"ź\"],[378,2],[379,1,\"ż\"],[380,2],[381,1,\"ž\"],[382,2],[383,1,\"s\"],[384,2],[385,1,\"ɓ\"],[386,1,\"ƃ\"],[387,2],[388,1,\"ƅ\"],[389,2],[390,1,\"ɔ\"],[391,1,\"ƈ\"],[392,2],[393,1,\"ɖ\"],[394,1,\"ɗ\"],[395,1,\"ƌ\"],[[396,397],2],[398,1,\"ǝ\"],[399,1,\"ə\"],[400,1,\"ɛ\"],[401,1,\"ƒ\"],[402,2],[403,1,\"ɠ\"],[404,1,\"ɣ\"],[405,2],[406,1,\"ɩ\"],[407,1,\"ɨ\"],[408,1,\"ƙ\"],[[409,411],2],[412,1,\"ɯ\"],[413,1,\"ɲ\"],[414,2],[415,1,\"ɵ\"],[416,1,\"ơ\"],[417,2],[418,1,\"ƣ\"],[419,2],[420,1,\"ƥ\"],[421,2],[422,1,\"ʀ\"],[423,1,\"ƨ\"],[424,2],[425,1,\"ʃ\"],[[426,427],2],[428,1,\"ƭ\"],[429,2],[430,1,\"ʈ\"],[431,1,\"ư\"],[432,2],[433,1,\"ʊ\"],[434,1,\"ʋ\"],[435,1,\"ƴ\"],[436,2],[437,1,\"ƶ\"],[438,2],[439,1,\"ʒ\"],[440,1,\"ƹ\"],[[441,443],2],[444,1,\"ƽ\"],[[445,451],2],[[452,454],1,\"dž\"],[[455,457],1,\"lj\"],[[458,460],1,\"nj\"],[461,1,\"ǎ\"],[462,2],[463,1,\"ǐ\"],[464,2],[465,1,\"ǒ\"],[466,2],[467,1,\"ǔ\"],[468,2],[469,1,\"ǖ\"],[470,2],[471,1,\"ǘ\"],[472,2],[473,1,\"ǚ\"],[474,2],[475,1,\"ǜ\"],[[476,477],2],[478,1,\"ǟ\"],[479,2],[480,1,\"ǡ\"],[481,2],[482,1,\"ǣ\"],[483,2],[484,1,\"ǥ\"],[485,2],[486,1,\"ǧ\"],[487,2],[488,1,\"ǩ\"],[489,2],[490,1,\"ǫ\"],[491,2],[492,1,\"ǭ\"],[493,2],[494,1,\"ǯ\"],[[495,496],2],[[497,499],1,\"dz\"],[500,1,\"ǵ\"],[501,2],[502,1,\"ƕ\"],[503,1,\"ƿ\"],[504,1,\"ǹ\"],[505,2],[506,1,\"ǻ\"],[507,2],[508,1,\"ǽ\"],[509,2],[510,1,\"ǿ\"],[511,2],[512,1,\"ȁ\"],[513,2],[514,1,\"ȃ\"],[515,2],[516,1,\"ȅ\"],[517,2],[518,1,\"ȇ\"],[519,2],[520,1,\"ȉ\"],[521,2],[522,1,\"ȋ\"],[523,2],[524,1,\"ȍ\"],[525,2],[526,1,\"ȏ\"],[527,2],[528,1,\"ȑ\"],[529,2],[530,1,\"ȓ\"],[531,2],[532,1,\"ȕ\"],[533,2],[534,1,\"ȗ\"],[535,2],[536,1,\"ș\"],[537,2],[538,1,\"ț\"],[539,2],[540,1,\"ȝ\"],[541,2],[542,1,\"ȟ\"],[543,2],[544,1,\"ƞ\"],[545,2],[546,1,\"ȣ\"],[547,2],[548,1,\"ȥ\"],[549,2],[550,1,\"ȧ\"],[551,2],[552,1,\"ȩ\"],[553,2],[554,1,\"ȫ\"],[555,2],[556,1,\"ȭ\"],[557,2],[558,1,\"ȯ\"],[559,2],[560,1,\"ȱ\"],[561,2],[562,1,\"ȳ\"],[563,2],[[564,566],2],[[567,569],2],[570,1,\"ⱥ\"],[571,1,\"ȼ\"],[572,2],[573,1,\"ƚ\"],[574,1,\"ⱦ\"],[[575,576],2],[577,1,\"ɂ\"],[578,2],[579,1,\"ƀ\"],[580,1,\"ʉ\"],[581,1,\"ʌ\"],[582,1,\"ɇ\"],[583,2],[584,1,\"ɉ\"],[585,2],[586,1,\"ɋ\"],[587,2],[588,1,\"ɍ\"],[589,2],[590,1,\"ɏ\"],[591,2],[[592,680],2],[[681,685],2],[[686,687],2],[688,1,\"h\"],[689,1,\"ɦ\"],[690,1,\"j\"],[691,1,\"r\"],[692,1,\"ɹ\"],[693,1,\"ɻ\"],[694,1,\"ʁ\"],[695,1,\"w\"],[696,1,\"y\"],[[697,705],2],[[706,709],2],[[710,721],2],[[722,727],2],[728,5,\" ̆\"],[729,5,\" ̇\"],[730,5,\" ̊\"],[731,5,\" ̨\"],[732,5,\" ̃\"],[733,5,\" ̋\"],[734,2],[735,2],[736,1,\"ɣ\"],[737,1,\"l\"],[738,1,\"s\"],[739,1,\"x\"],[740,1,\"ʕ\"],[[741,745],2],[[746,747],2],[748,2],[749,2],[750,2],[[751,767],2],[[768,831],2],[832,1,\"̀\"],[833,1,\"́\"],[834,2],[835,1,\"̓\"],[836,1,\"̈́\"],[837,1,\"ι\"],[[838,846],2],[847,7],[[848,855],2],[[856,860],2],[[861,863],2],[[864,865],2],[866,2],[[867,879],2],[880,1,\"ͱ\"],[881,2],[882,1,\"ͳ\"],[883,2],[884,1,\"ʹ\"],[885,2],[886,1,\"ͷ\"],[887,2],[[888,889],3],[890,5,\" ι\"],[[891,893],2],[894,5,\";\"],[895,1,\"ϳ\"],[[896,899],3],[900,5,\" ́\"],[901,5,\" ̈́\"],[902,1,\"ά\"],[903,1,\"·\"],[904,1,\"έ\"],[905,1,\"ή\"],[906,1,\"ί\"],[907,3],[908,1,\"ό\"],[909,3],[910,1,\"ύ\"],[911,1,\"ώ\"],[912,2],[913,1,\"α\"],[914,1,\"β\"],[915,1,\"γ\"],[916,1,\"δ\"],[917,1,\"ε\"],[918,1,\"ζ\"],[919,1,\"η\"],[920,1,\"θ\"],[921,1,\"ι\"],[922,1,\"κ\"],[923,1,\"λ\"],[924,1,\"μ\"],[925,1,\"ν\"],[926,1,\"ξ\"],[927,1,\"ο\"],[928,1,\"π\"],[929,1,\"ρ\"],[930,3],[931,1,\"σ\"],[932,1,\"τ\"],[933,1,\"υ\"],[934,1,\"φ\"],[935,1,\"χ\"],[936,1,\"ψ\"],[937,1,\"ω\"],[938,1,\"ϊ\"],[939,1,\"ϋ\"],[[940,961],2],[962,6,\"σ\"],[[963,974],2],[975,1,\"ϗ\"],[976,1,\"β\"],[977,1,\"θ\"],[978,1,\"υ\"],[979,1,\"ύ\"],[980,1,\"ϋ\"],[981,1,\"φ\"],[982,1,\"π\"],[983,2],[984,1,\"ϙ\"],[985,2],[986,1,\"ϛ\"],[987,2],[988,1,\"ϝ\"],[989,2],[990,1,\"ϟ\"],[991,2],[992,1,\"ϡ\"],[993,2],[994,1,\"ϣ\"],[995,2],[996,1,\"ϥ\"],[997,2],[998,1,\"ϧ\"],[999,2],[1000,1,\"ϩ\"],[1001,2],[1002,1,\"ϫ\"],[1003,2],[1004,1,\"ϭ\"],[1005,2],[1006,1,\"ϯ\"],[1007,2],[1008,1,\"κ\"],[1009,1,\"ρ\"],[1010,1,\"σ\"],[1011,2],[1012,1,\"θ\"],[1013,1,\"ε\"],[1014,2],[1015,1,\"ϸ\"],[1016,2],[1017,1,\"σ\"],[1018,1,\"ϻ\"],[1019,2],[1020,2],[1021,1,\"ͻ\"],[1022,1,\"ͼ\"],[1023,1,\"ͽ\"],[1024,1,\"ѐ\"],[1025,1,\"ё\"],[1026,1,\"ђ\"],[1027,1,\"ѓ\"],[1028,1,\"є\"],[1029,1,\"ѕ\"],[1030,1,\"і\"],[1031,1,\"ї\"],[1032,1,\"ј\"],[1033,1,\"љ\"],[1034,1,\"њ\"],[1035,1,\"ћ\"],[1036,1,\"ќ\"],[1037,1,\"ѝ\"],[1038,1,\"ў\"],[1039,1,\"џ\"],[1040,1,\"а\"],[1041,1,\"б\"],[1042,1,\"в\"],[1043,1,\"г\"],[1044,1,\"д\"],[1045,1,\"е\"],[1046,1,\"ж\"],[1047,1,\"з\"],[1048,1,\"и\"],[1049,1,\"й\"],[1050,1,\"к\"],[1051,1,\"л\"],[1052,1,\"м\"],[1053,1,\"н\"],[1054,1,\"о\"],[1055,1,\"п\"],[1056,1,\"р\"],[1057,1,\"с\"],[1058,1,\"т\"],[1059,1,\"у\"],[1060,1,\"ф\"],[1061,1,\"х\"],[1062,1,\"ц\"],[1063,1,\"ч\"],[1064,1,\"ш\"],[1065,1,\"щ\"],[1066,1,\"ъ\"],[1067,1,\"ы\"],[1068,1,\"ь\"],[1069,1,\"э\"],[1070,1,\"ю\"],[1071,1,\"я\"],[[1072,1103],2],[1104,2],[[1105,1116],2],[1117,2],[[1118,1119],2],[1120,1,\"ѡ\"],[1121,2],[1122,1,\"ѣ\"],[1123,2],[1124,1,\"ѥ\"],[1125,2],[1126,1,\"ѧ\"],[1127,2],[1128,1,\"ѩ\"],[1129,2],[1130,1,\"ѫ\"],[1131,2],[1132,1,\"ѭ\"],[1133,2],[1134,1,\"ѯ\"],[1135,2],[1136,1,\"ѱ\"],[1137,2],[1138,1,\"ѳ\"],[1139,2],[1140,1,\"ѵ\"],[1141,2],[1142,1,\"ѷ\"],[1143,2],[1144,1,\"ѹ\"],[1145,2],[1146,1,\"ѻ\"],[1147,2],[1148,1,\"ѽ\"],[1149,2],[1150,1,\"ѿ\"],[1151,2],[1152,1,\"ҁ\"],[1153,2],[1154,2],[[1155,1158],2],[1159,2],[[1160,1161],2],[1162,1,\"ҋ\"],[1163,2],[1164,1,\"ҍ\"],[1165,2],[1166,1,\"ҏ\"],[1167,2],[1168,1,\"ґ\"],[1169,2],[1170,1,\"ғ\"],[1171,2],[1172,1,\"ҕ\"],[1173,2],[1174,1,\"җ\"],[1175,2],[1176,1,\"ҙ\"],[1177,2],[1178,1,\"қ\"],[1179,2],[1180,1,\"ҝ\"],[1181,2],[1182,1,\"ҟ\"],[1183,2],[1184,1,\"ҡ\"],[1185,2],[1186,1,\"ң\"],[1187,2],[1188,1,\"ҥ\"],[1189,2],[1190,1,\"ҧ\"],[1191,2],[1192,1,\"ҩ\"],[1193,2],[1194,1,\"ҫ\"],[1195,2],[1196,1,\"ҭ\"],[1197,2],[1198,1,\"ү\"],[1199,2],[1200,1,\"ұ\"],[1201,2],[1202,1,\"ҳ\"],[1203,2],[1204,1,\"ҵ\"],[1205,2],[1206,1,\"ҷ\"],[1207,2],[1208,1,\"ҹ\"],[1209,2],[1210,1,\"һ\"],[1211,2],[1212,1,\"ҽ\"],[1213,2],[1214,1,\"ҿ\"],[1215,2],[1216,3],[1217,1,\"ӂ\"],[1218,2],[1219,1,\"ӄ\"],[1220,2],[1221,1,\"ӆ\"],[1222,2],[1223,1,\"ӈ\"],[1224,2],[1225,1,\"ӊ\"],[1226,2],[1227,1,\"ӌ\"],[1228,2],[1229,1,\"ӎ\"],[1230,2],[1231,2],[1232,1,\"ӑ\"],[1233,2],[1234,1,\"ӓ\"],[1235,2],[1236,1,\"ӕ\"],[1237,2],[1238,1,\"ӗ\"],[1239,2],[1240,1,\"ә\"],[1241,2],[1242,1,\"ӛ\"],[1243,2],[1244,1,\"ӝ\"],[1245,2],[1246,1,\"ӟ\"],[1247,2],[1248,1,\"ӡ\"],[1249,2],[1250,1,\"ӣ\"],[1251,2],[1252,1,\"ӥ\"],[1253,2],[1254,1,\"ӧ\"],[1255,2],[1256,1,\"ө\"],[1257,2],[1258,1,\"ӫ\"],[1259,2],[1260,1,\"ӭ\"],[1261,2],[1262,1,\"ӯ\"],[1263,2],[1264,1,\"ӱ\"],[1265,2],[1266,1,\"ӳ\"],[1267,2],[1268,1,\"ӵ\"],[1269,2],[1270,1,\"ӷ\"],[1271,2],[1272,1,\"ӹ\"],[1273,2],[1274,1,\"ӻ\"],[1275,2],[1276,1,\"ӽ\"],[1277,2],[1278,1,\"ӿ\"],[1279,2],[1280,1,\"ԁ\"],[1281,2],[1282,1,\"ԃ\"],[1283,2],[1284,1,\"ԅ\"],[1285,2],[1286,1,\"ԇ\"],[1287,2],[1288,1,\"ԉ\"],[1289,2],[1290,1,\"ԋ\"],[1291,2],[1292,1,\"ԍ\"],[1293,2],[1294,1,\"ԏ\"],[1295,2],[1296,1,\"ԑ\"],[1297,2],[1298,1,\"ԓ\"],[1299,2],[1300,1,\"ԕ\"],[1301,2],[1302,1,\"ԗ\"],[1303,2],[1304,1,\"ԙ\"],[1305,2],[1306,1,\"ԛ\"],[1307,2],[1308,1,\"ԝ\"],[1309,2],[1310,1,\"ԟ\"],[1311,2],[1312,1,\"ԡ\"],[1313,2],[1314,1,\"ԣ\"],[1315,2],[1316,1,\"ԥ\"],[1317,2],[1318,1,\"ԧ\"],[1319,2],[1320,1,\"ԩ\"],[1321,2],[1322,1,\"ԫ\"],[1323,2],[1324,1,\"ԭ\"],[1325,2],[1326,1,\"ԯ\"],[1327,2],[1328,3],[1329,1,\"ա\"],[1330,1,\"բ\"],[1331,1,\"գ\"],[1332,1,\"դ\"],[1333,1,\"ե\"],[1334,1,\"զ\"],[1335,1,\"է\"],[1336,1,\"ը\"],[1337,1,\"թ\"],[1338,1,\"ժ\"],[1339,1,\"ի\"],[1340,1,\"լ\"],[1341,1,\"խ\"],[1342,1,\"ծ\"],[1343,1,\"կ\"],[1344,1,\"հ\"],[1345,1,\"ձ\"],[1346,1,\"ղ\"],[1347,1,\"ճ\"],[1348,1,\"մ\"],[1349,1,\"յ\"],[1350,1,\"ն\"],[1351,1,\"շ\"],[1352,1,\"ո\"],[1353,1,\"չ\"],[1354,1,\"պ\"],[1355,1,\"ջ\"],[1356,1,\"ռ\"],[1357,1,\"ս\"],[1358,1,\"վ\"],[1359,1,\"տ\"],[1360,1,\"ր\"],[1361,1,\"ց\"],[1362,1,\"ւ\"],[1363,1,\"փ\"],[1364,1,\"ք\"],[1365,1,\"օ\"],[1366,1,\"ֆ\"],[[1367,1368],3],[1369,2],[[1370,1375],2],[1376,2],[[1377,1414],2],[1415,1,\"եւ\"],[1416,2],[1417,2],[1418,2],[[1419,1420],3],[[1421,1422],2],[1423,2],[1424,3],[[1425,1441],2],[1442,2],[[1443,1455],2],[[1456,1465],2],[1466,2],[[1467,1469],2],[1470,2],[1471,2],[1472,2],[[1473,1474],2],[1475,2],[1476,2],[1477,2],[1478,2],[1479,2],[[1480,1487],3],[[1488,1514],2],[[1515,1518],3],[1519,2],[[1520,1524],2],[[1525,1535],3],[[1536,1539],3],[1540,3],[1541,3],[[1542,1546],2],[1547,2],[1548,2],[[1549,1551],2],[[1552,1557],2],[[1558,1562],2],[1563,2],[1564,3],[1565,3],[1566,2],[1567,2],[1568,2],[[1569,1594],2],[[1595,1599],2],[1600,2],[[1601,1618],2],[[1619,1621],2],[[1622,1624],2],[[1625,1630],2],[1631,2],[[1632,1641],2],[[1642,1645],2],[[1646,1647],2],[[1648,1652],2],[1653,1,\"اٴ\"],[1654,1,\"وٴ\"],[1655,1,\"ۇٴ\"],[1656,1,\"يٴ\"],[[1657,1719],2],[[1720,1721],2],[[1722,1726],2],[1727,2],[[1728,1742],2],[1743,2],[[1744,1747],2],[1748,2],[[1749,1756],2],[1757,3],[1758,2],[[1759,1768],2],[1769,2],[[1770,1773],2],[[1774,1775],2],[[1776,1785],2],[[1786,1790],2],[1791,2],[[1792,1805],2],[1806,3],[1807,3],[[1808,1836],2],[[1837,1839],2],[[1840,1866],2],[[1867,1868],3],[[1869,1871],2],[[1872,1901],2],[[1902,1919],2],[[1920,1968],2],[1969,2],[[1970,1983],3],[[1984,2037],2],[[2038,2042],2],[[2043,2044],3],[2045,2],[[2046,2047],2],[[2048,2093],2],[[2094,2095],3],[[2096,2110],2],[2111,3],[[2112,2139],2],[[2140,2141],3],[2142,2],[2143,3],[[2144,2154],2],[[2155,2207],3],[2208,2],[2209,2],[[2210,2220],2],[[2221,2226],2],[[2227,2228],2],[2229,3],[[2230,2237],2],[[2238,2258],3],[2259,2],[[2260,2273],2],[2274,3],[2275,2],[[2276,2302],2],[2303,2],[2304,2],[[2305,2307],2],[2308,2],[[2309,2361],2],[[2362,2363],2],[[2364,2381],2],[2382,2],[2383,2],[[2384,2388],2],[2389,2],[[2390,2391],2],[2392,1,\"क़\"],[2393,1,\"ख़\"],[2394,1,\"ग़\"],[2395,1,\"ज़\"],[2396,1,\"ड़\"],[2397,1,\"ढ़\"],[2398,1,\"फ़\"],[2399,1,\"य़\"],[[2400,2403],2],[[2404,2405],2],[[2406,2415],2],[2416,2],[[2417,2418],2],[[2419,2423],2],[2424,2],[[2425,2426],2],[[2427,2428],2],[2429,2],[[2430,2431],2],[2432,2],[[2433,2435],2],[2436,3],[[2437,2444],2],[[2445,2446],3],[[2447,2448],2],[[2449,2450],3],[[2451,2472],2],[2473,3],[[2474,2480],2],[2481,3],[2482,2],[[2483,2485],3],[[2486,2489],2],[[2490,2491],3],[2492,2],[2493,2],[[2494,2500],2],[[2501,2502],3],[[2503,2504],2],[[2505,2506],3],[[2507,2509],2],[2510,2],[[2511,2518],3],[2519,2],[[2520,2523],3],[2524,1,\"ড়\"],[2525,1,\"ঢ়\"],[2526,3],[2527,1,\"য়\"],[[2528,2531],2],[[2532,2533],3],[[2534,2545],2],[[2546,2554],2],[2555,2],[2556,2],[2557,2],[2558,2],[[2559,2560],3],[2561,2],[2562,2],[2563,2],[2564,3],[[2565,2570],2],[[2571,2574],3],[[2575,2576],2],[[2577,2578],3],[[2579,2600],2],[2601,3],[[2602,2608],2],[2609,3],[2610,2],[2611,1,\"ਲ਼\"],[2612,3],[2613,2],[2614,1,\"ਸ਼\"],[2615,3],[[2616,2617],2],[[2618,2619],3],[2620,2],[2621,3],[[2622,2626],2],[[2627,2630],3],[[2631,2632],2],[[2633,2634],3],[[2635,2637],2],[[2638,2640],3],[2641,2],[[2642,2648],3],[2649,1,\"ਖ਼\"],[2650,1,\"ਗ਼\"],[2651,1,\"ਜ਼\"],[2652,2],[2653,3],[2654,1,\"ਫ਼\"],[[2655,2661],3],[[2662,2676],2],[2677,2],[2678,2],[[2679,2688],3],[[2689,2691],2],[2692,3],[[2693,2699],2],[2700,2],[2701,2],[2702,3],[[2703,2705],2],[2706,3],[[2707,2728],2],[2729,3],[[2730,2736],2],[2737,3],[[2738,2739],2],[2740,3],[[2741,2745],2],[[2746,2747],3],[[2748,2757],2],[2758,3],[[2759,2761],2],[2762,3],[[2763,2765],2],[[2766,2767],3],[2768,2],[[2769,2783],3],[2784,2],[[2785,2787],2],[[2788,2789],3],[[2790,2799],2],[2800,2],[2801,2],[[2802,2808],3],[2809,2],[[2810,2815],2],[2816,3],[[2817,2819],2],[2820,3],[[2821,2828],2],[[2829,2830],3],[[2831,2832],2],[[2833,2834],3],[[2835,2856],2],[2857,3],[[2858,2864],2],[2865,3],[[2866,2867],2],[2868,3],[2869,2],[[2870,2873],2],[[2874,2875],3],[[2876,2883],2],[2884,2],[[2885,2886],3],[[2887,2888],2],[[2889,2890],3],[[2891,2893],2],[[2894,2901],3],[[2902,2903],2],[[2904,2907],3],[2908,1,\"ଡ଼\"],[2909,1,\"ଢ଼\"],[2910,3],[[2911,2913],2],[[2914,2915],2],[[2916,2917],3],[[2918,2927],2],[2928,2],[2929,2],[[2930,2935],2],[[2936,2945],3],[[2946,2947],2],[2948,3],[[2949,2954],2],[[2955,2957],3],[[2958,2960],2],[2961,3],[[2962,2965],2],[[2966,2968],3],[[2969,2970],2],[2971,3],[2972,2],[2973,3],[[2974,2975],2],[[2976,2978],3],[[2979,2980],2],[[2981,2983],3],[[2984,2986],2],[[2987,2989],3],[[2990,2997],2],[2998,2],[[2999,3001],2],[[3002,3005],3],[[3006,3010],2],[[3011,3013],3],[[3014,3016],2],[3017,3],[[3018,3021],2],[[3022,3023],3],[3024,2],[[3025,3030],3],[3031,2],[[3032,3045],3],[3046,2],[[3047,3055],2],[[3056,3058],2],[[3059,3066],2],[[3067,3071],3],[3072,2],[[3073,3075],2],[3076,2],[[3077,3084],2],[3085,3],[[3086,3088],2],[3089,3],[[3090,3112],2],[3113,3],[[3114,3123],2],[3124,2],[[3125,3129],2],[[3130,3132],3],[3133,2],[[3134,3140],2],[3141,3],[[3142,3144],2],[3145,3],[[3146,3149],2],[[3150,3156],3],[[3157,3158],2],[3159,3],[[3160,3161],2],[3162,2],[[3163,3167],3],[[3168,3169],2],[[3170,3171],2],[[3172,3173],3],[[3174,3183],2],[[3184,3190],3],[3191,2],[[3192,3199],2],[3200,2],[3201,2],[[3202,3203],2],[3204,2],[[3205,3212],2],[3213,3],[[3214,3216],2],[3217,3],[[3218,3240],2],[3241,3],[[3242,3251],2],[3252,3],[[3253,3257],2],[[3258,3259],3],[[3260,3261],2],[[3262,3268],2],[3269,3],[[3270,3272],2],[3273,3],[[3274,3277],2],[[3278,3284],3],[[3285,3286],2],[[3287,3293],3],[3294,2],[3295,3],[[3296,3297],2],[[3298,3299],2],[[3300,3301],3],[[3302,3311],2],[3312,3],[[3313,3314],2],[[3315,3327],3],[3328,2],[3329,2],[[3330,3331],2],[3332,3],[[3333,3340],2],[3341,3],[[3342,3344],2],[3345,3],[[3346,3368],2],[3369,2],[[3370,3385],2],[3386,2],[[3387,3388],2],[3389,2],[[3390,3395],2],[3396,2],[3397,3],[[3398,3400],2],[3401,3],[[3402,3405],2],[3406,2],[3407,2],[[3408,3411],3],[[3412,3414],2],[3415,2],[[3416,3422],2],[3423,2],[[3424,3425],2],[[3426,3427],2],[[3428,3429],3],[[3430,3439],2],[[3440,3445],2],[[3446,3448],2],[3449,2],[[3450,3455],2],[[3456,3457],3],[[3458,3459],2],[3460,3],[[3461,3478],2],[[3479,3481],3],[[3482,3505],2],[3506,3],[[3507,3515],2],[3516,3],[3517,2],[[3518,3519],3],[[3520,3526],2],[[3527,3529],3],[3530,2],[[3531,3534],3],[[3535,3540],2],[3541,3],[3542,2],[3543,3],[[3544,3551],2],[[3552,3557],3],[[3558,3567],2],[[3568,3569],3],[[3570,3571],2],[3572,2],[[3573,3584],3],[[3585,3634],2],[3635,1,\"ํา\"],[[3636,3642],2],[[3643,3646],3],[3647,2],[[3648,3662],2],[3663,2],[[3664,3673],2],[[3674,3675],2],[[3676,3712],3],[[3713,3714],2],[3715,3],[3716,2],[3717,3],[3718,2],[[3719,3720],2],[3721,2],[3722,2],[3723,3],[3724,2],[3725,2],[[3726,3731],2],[[3732,3735],2],[3736,2],[[3737,3743],2],[3744,2],[[3745,3747],2],[3748,3],[3749,2],[3750,3],[3751,2],[[3752,3753],2],[[3754,3755],2],[3756,2],[[3757,3762],2],[3763,1,\"ໍາ\"],[[3764,3769],2],[3770,2],[[3771,3773],2],[[3774,3775],3],[[3776,3780],2],[3781,3],[3782,2],[3783,3],[[3784,3789],2],[[3790,3791],3],[[3792,3801],2],[[3802,3803],3],[3804,1,\"ຫນ\"],[3805,1,\"ຫມ\"],[[3806,3807],2],[[3808,3839],3],[3840,2],[[3841,3850],2],[3851,2],[3852,1,\"་\"],[[3853,3863],2],[[3864,3865],2],[[3866,3871],2],[[3872,3881],2],[[3882,3892],2],[3893,2],[3894,2],[3895,2],[3896,2],[3897,2],[[3898,3901],2],[[3902,3906],2],[3907,1,\"གྷ\"],[[3908,3911],2],[3912,3],[[3913,3916],2],[3917,1,\"ཌྷ\"],[[3918,3921],2],[3922,1,\"དྷ\"],[[3923,3926],2],[3927,1,\"བྷ\"],[[3928,3931],2],[3932,1,\"ཛྷ\"],[[3933,3944],2],[3945,1,\"ཀྵ\"],[3946,2],[[3947,3948],2],[[3949,3952],3],[[3953,3954],2],[3955,1,\"ཱི\"],[3956,2],[3957,1,\"ཱུ\"],[3958,1,\"ྲྀ\"],[3959,1,\"ྲཱྀ\"],[3960,1,\"ླྀ\"],[3961,1,\"ླཱྀ\"],[[3962,3968],2],[3969,1,\"ཱྀ\"],[[3970,3972],2],[3973,2],[[3974,3979],2],[[3980,3983],2],[[3984,3986],2],[3987,1,\"ྒྷ\"],[[3988,3989],2],[3990,2],[3991,2],[3992,3],[[3993,3996],2],[3997,1,\"ྜྷ\"],[[3998,4001],2],[4002,1,\"ྡྷ\"],[[4003,4006],2],[4007,1,\"ྦྷ\"],[[4008,4011],2],[4012,1,\"ྫྷ\"],[4013,2],[[4014,4016],2],[[4017,4023],2],[4024,2],[4025,1,\"ྐྵ\"],[[4026,4028],2],[4029,3],[[4030,4037],2],[4038,2],[[4039,4044],2],[4045,3],[4046,2],[4047,2],[[4048,4049],2],[[4050,4052],2],[[4053,4056],2],[[4057,4058],2],[[4059,4095],3],[[4096,4129],2],[4130,2],[[4131,4135],2],[4136,2],[[4137,4138],2],[4139,2],[[4140,4146],2],[[4147,4149],2],[[4150,4153],2],[[4154,4159],2],[[4160,4169],2],[[4170,4175],2],[[4176,4185],2],[[4186,4249],2],[[4250,4253],2],[[4254,4255],2],[[4256,4293],3],[4294,3],[4295,1,\"ⴧ\"],[[4296,4300],3],[4301,1,\"ⴭ\"],[[4302,4303],3],[[4304,4342],2],[[4343,4344],2],[[4345,4346],2],[4347,2],[4348,1,\"ნ\"],[[4349,4351],2],[[4352,4441],2],[[4442,4446],2],[[4447,4448],3],[[4449,4514],2],[[4515,4519],2],[[4520,4601],2],[[4602,4607],2],[[4608,4614],2],[4615,2],[[4616,4678],2],[4679,2],[4680,2],[4681,3],[[4682,4685],2],[[4686,4687],3],[[4688,4694],2],[4695,3],[4696,2],[4697,3],[[4698,4701],2],[[4702,4703],3],[[4704,4742],2],[4743,2],[4744,2],[4745,3],[[4746,4749],2],[[4750,4751],3],[[4752,4782],2],[4783,2],[4784,2],[4785,3],[[4786,4789],2],[[4790,4791],3],[[4792,4798],2],[4799,3],[4800,2],[4801,3],[[4802,4805],2],[[4806,4807],3],[[4808,4814],2],[4815,2],[[4816,4822],2],[4823,3],[[4824,4846],2],[4847,2],[[4848,4878],2],[4879,2],[4880,2],[4881,3],[[4882,4885],2],[[4886,4887],3],[[4888,4894],2],[4895,2],[[4896,4934],2],[4935,2],[[4936,4954],2],[[4955,4956],3],[[4957,4958],2],[4959,2],[4960,2],[[4961,4988],2],[[4989,4991],3],[[4992,5007],2],[[5008,5017],2],[[5018,5023],3],[[5024,5108],2],[5109,2],[[5110,5111],3],[5112,1,\"Ᏸ\"],[5113,1,\"Ᏹ\"],[5114,1,\"Ᏺ\"],[5115,1,\"Ᏻ\"],[5116,1,\"Ᏼ\"],[5117,1,\"Ᏽ\"],[[5118,5119],3],[5120,2],[[5121,5740],2],[[5741,5742],2],[[5743,5750],2],[[5751,5759],2],[5760,3],[[5761,5786],2],[[5787,5788],2],[[5789,5791],3],[[5792,5866],2],[[5867,5872],2],[[5873,5880],2],[[5881,5887],3],[[5888,5900],2],[5901,3],[[5902,5908],2],[[5909,5919],3],[[5920,5940],2],[[5941,5942],2],[[5943,5951],3],[[5952,5971],2],[[5972,5983],3],[[5984,5996],2],[5997,3],[[5998,6000],2],[6001,3],[[6002,6003],2],[[6004,6015],3],[[6016,6067],2],[[6068,6069],3],[[6070,6099],2],[[6100,6102],2],[6103,2],[[6104,6107],2],[6108,2],[6109,2],[[6110,6111],3],[[6112,6121],2],[[6122,6127],3],[[6128,6137],2],[[6138,6143],3],[[6144,6149],2],[6150,3],[[6151,6154],2],[[6155,6157],7],[6158,3],[6159,3],[[6160,6169],2],[[6170,6175],3],[[6176,6263],2],[6264,2],[[6265,6271],3],[[6272,6313],2],[6314,2],[[6315,6319],3],[[6320,6389],2],[[6390,6399],3],[[6400,6428],2],[[6429,6430],2],[6431,3],[[6432,6443],2],[[6444,6447],3],[[6448,6459],2],[[6460,6463],3],[6464,2],[[6465,6467],3],[[6468,6469],2],[[6470,6509],2],[[6510,6511],3],[[6512,6516],2],[[6517,6527],3],[[6528,6569],2],[[6570,6571],2],[[6572,6575],3],[[6576,6601],2],[[6602,6607],3],[[6608,6617],2],[6618,2],[[6619,6621],3],[[6622,6623],2],[[6624,6655],2],[[6656,6683],2],[[6684,6685],3],[[6686,6687],2],[[6688,6750],2],[6751,3],[[6752,6780],2],[[6781,6782],3],[[6783,6793],2],[[6794,6799],3],[[6800,6809],2],[[6810,6815],3],[[6816,6822],2],[6823,2],[[6824,6829],2],[[6830,6831],3],[[6832,6845],2],[6846,2],[[6847,6911],3],[[6912,6987],2],[[6988,6991],3],[[6992,7001],2],[[7002,7018],2],[[7019,7027],2],[[7028,7036],2],[[7037,7039],3],[[7040,7082],2],[[7083,7085],2],[[7086,7097],2],[[7098,7103],2],[[7104,7155],2],[[7156,7163],3],[[7164,7167],2],[[7168,7223],2],[[7224,7226],3],[[7227,7231],2],[[7232,7241],2],[[7242,7244],3],[[7245,7293],2],[[7294,7295],2],[7296,1,\"в\"],[7297,1,\"д\"],[7298,1,\"о\"],[7299,1,\"с\"],[[7300,7301],1,\"т\"],[7302,1,\"ъ\"],[7303,1,\"ѣ\"],[7304,1,\"ꙋ\"],[[7305,7311],3],[7312,1,\"ა\"],[7313,1,\"ბ\"],[7314,1,\"გ\"],[7315,1,\"დ\"],[7316,1,\"ე\"],[7317,1,\"ვ\"],[7318,1,\"ზ\"],[7319,1,\"თ\"],[7320,1,\"ი\"],[7321,1,\"კ\"],[7322,1,\"ლ\"],[7323,1,\"მ\"],[7324,1,\"ნ\"],[7325,1,\"ო\"],[7326,1,\"პ\"],[7327,1,\"ჟ\"],[7328,1,\"რ\"],[7329,1,\"ს\"],[7330,1,\"ტ\"],[7331,1,\"უ\"],[7332,1,\"ფ\"],[7333,1,\"ქ\"],[7334,1,\"ღ\"],[7335,1,\"ყ\"],[7336,1,\"შ\"],[7337,1,\"ჩ\"],[7338,1,\"ც\"],[7339,1,\"ძ\"],[7340,1,\"წ\"],[7341,1,\"ჭ\"],[7342,1,\"ხ\"],[7343,1,\"ჯ\"],[7344,1,\"ჰ\"],[7345,1,\"ჱ\"],[7346,1,\"ჲ\"],[7347,1,\"ჳ\"],[7348,1,\"ჴ\"],[7349,1,\"ჵ\"],[7350,1,\"ჶ\"],[7351,1,\"ჷ\"],[7352,1,\"ჸ\"],[7353,1,\"ჹ\"],[7354,1,\"ჺ\"],[[7355,7356],3],[7357,1,\"ჽ\"],[7358,1,\"ჾ\"],[7359,1,\"ჿ\"],[[7360,7367],2],[[7368,7375],3],[[7376,7378],2],[7379,2],[[7380,7410],2],[[7411,7414],2],[7415,2],[[7416,7417],2],[7418,2],[[7419,7423],3],[[7424,7467],2],[7468,1,\"a\"],[7469,1,\"æ\"],[7470,1,\"b\"],[7471,2],[7472,1,\"d\"],[7473,1,\"e\"],[7474,1,\"ǝ\"],[7475,1,\"g\"],[7476,1,\"h\"],[7477,1,\"i\"],[7478,1,\"j\"],[7479,1,\"k\"],[7480,1,\"l\"],[7481,1,\"m\"],[7482,1,\"n\"],[7483,2],[7484,1,\"o\"],[7485,1,\"ȣ\"],[7486,1,\"p\"],[7487,1,\"r\"],[7488,1,\"t\"],[7489,1,\"u\"],[7490,1,\"w\"],[7491,1,\"a\"],[7492,1,\"ɐ\"],[7493,1,\"ɑ\"],[7494,1,\"ᴂ\"],[7495,1,\"b\"],[7496,1,\"d\"],[7497,1,\"e\"],[7498,1,\"ə\"],[7499,1,\"ɛ\"],[7500,1,\"ɜ\"],[7501,1,\"g\"],[7502,2],[7503,1,\"k\"],[7504,1,\"m\"],[7505,1,\"ŋ\"],[7506,1,\"o\"],[7507,1,\"ɔ\"],[7508,1,\"ᴖ\"],[7509,1,\"ᴗ\"],[7510,1,\"p\"],[7511,1,\"t\"],[7512,1,\"u\"],[7513,1,\"ᴝ\"],[7514,1,\"ɯ\"],[7515,1,\"v\"],[7516,1,\"ᴥ\"],[7517,1,\"β\"],[7518,1,\"γ\"],[7519,1,\"δ\"],[7520,1,\"φ\"],[7521,1,\"χ\"],[7522,1,\"i\"],[7523,1,\"r\"],[7524,1,\"u\"],[7525,1,\"v\"],[7526,1,\"β\"],[7527,1,\"γ\"],[7528,1,\"ρ\"],[7529,1,\"φ\"],[7530,1,\"χ\"],[7531,2],[[7532,7543],2],[7544,1,\"н\"],[[7545,7578],2],[7579,1,\"ɒ\"],[7580,1,\"c\"],[7581,1,\"ɕ\"],[7582,1,\"ð\"],[7583,1,\"ɜ\"],[7584,1,\"f\"],[7585,1,\"ɟ\"],[7586,1,\"ɡ\"],[7587,1,\"ɥ\"],[7588,1,\"ɨ\"],[7589,1,\"ɩ\"],[7590,1,\"ɪ\"],[7591,1,\"ᵻ\"],[7592,1,\"ʝ\"],[7593,1,\"ɭ\"],[7594,1,\"ᶅ\"],[7595,1,\"ʟ\"],[7596,1,\"ɱ\"],[7597,1,\"ɰ\"],[7598,1,\"ɲ\"],[7599,1,\"ɳ\"],[7600,1,\"ɴ\"],[7601,1,\"ɵ\"],[7602,1,\"ɸ\"],[7603,1,\"ʂ\"],[7604,1,\"ʃ\"],[7605,1,\"ƫ\"],[7606,1,\"ʉ\"],[7607,1,\"ʊ\"],[7608,1,\"ᴜ\"],[7609,1,\"ʋ\"],[7610,1,\"ʌ\"],[7611,1,\"z\"],[7612,1,\"ʐ\"],[7613,1,\"ʑ\"],[7614,1,\"ʒ\"],[7615,1,\"θ\"],[[7616,7619],2],[[7620,7626],2],[[7627,7654],2],[[7655,7669],2],[[7670,7673],2],[7674,3],[7675,2],[7676,2],[7677,2],[[7678,7679],2],[7680,1,\"ḁ\"],[7681,2],[7682,1,\"ḃ\"],[7683,2],[7684,1,\"ḅ\"],[7685,2],[7686,1,\"ḇ\"],[7687,2],[7688,1,\"ḉ\"],[7689,2],[7690,1,\"ḋ\"],[7691,2],[7692,1,\"ḍ\"],[7693,2],[7694,1,\"ḏ\"],[7695,2],[7696,1,\"ḑ\"],[7697,2],[7698,1,\"ḓ\"],[7699,2],[7700,1,\"ḕ\"],[7701,2],[7702,1,\"ḗ\"],[7703,2],[7704,1,\"ḙ\"],[7705,2],[7706,1,\"ḛ\"],[7707,2],[7708,1,\"ḝ\"],[7709,2],[7710,1,\"ḟ\"],[7711,2],[7712,1,\"ḡ\"],[7713,2],[7714,1,\"ḣ\"],[7715,2],[7716,1,\"ḥ\"],[7717,2],[7718,1,\"ḧ\"],[7719,2],[7720,1,\"ḩ\"],[7721,2],[7722,1,\"ḫ\"],[7723,2],[7724,1,\"ḭ\"],[7725,2],[7726,1,\"ḯ\"],[7727,2],[7728,1,\"ḱ\"],[7729,2],[7730,1,\"ḳ\"],[7731,2],[7732,1,\"ḵ\"],[7733,2],[7734,1,\"ḷ\"],[7735,2],[7736,1,\"ḹ\"],[7737,2],[7738,1,\"ḻ\"],[7739,2],[7740,1,\"ḽ\"],[7741,2],[7742,1,\"ḿ\"],[7743,2],[7744,1,\"ṁ\"],[7745,2],[7746,1,\"ṃ\"],[7747,2],[7748,1,\"ṅ\"],[7749,2],[7750,1,\"ṇ\"],[7751,2],[7752,1,\"ṉ\"],[7753,2],[7754,1,\"ṋ\"],[7755,2],[7756,1,\"ṍ\"],[7757,2],[7758,1,\"ṏ\"],[7759,2],[7760,1,\"ṑ\"],[7761,2],[7762,1,\"ṓ\"],[7763,2],[7764,1,\"ṕ\"],[7765,2],[7766,1,\"ṗ\"],[7767,2],[7768,1,\"ṙ\"],[7769,2],[7770,1,\"ṛ\"],[7771,2],[7772,1,\"ṝ\"],[7773,2],[7774,1,\"ṟ\"],[7775,2],[7776,1,\"ṡ\"],[7777,2],[7778,1,\"ṣ\"],[7779,2],[7780,1,\"ṥ\"],[7781,2],[7782,1,\"ṧ\"],[7783,2],[7784,1,\"ṩ\"],[7785,2],[7786,1,\"ṫ\"],[7787,2],[7788,1,\"ṭ\"],[7789,2],[7790,1,\"ṯ\"],[7791,2],[7792,1,\"ṱ\"],[7793,2],[7794,1,\"ṳ\"],[7795,2],[7796,1,\"ṵ\"],[7797,2],[7798,1,\"ṷ\"],[7799,2],[7800,1,\"ṹ\"],[7801,2],[7802,1,\"ṻ\"],[7803,2],[7804,1,\"ṽ\"],[7805,2],[7806,1,\"ṿ\"],[7807,2],[7808,1,\"ẁ\"],[7809,2],[7810,1,\"ẃ\"],[7811,2],[7812,1,\"ẅ\"],[7813,2],[7814,1,\"ẇ\"],[7815,2],[7816,1,\"ẉ\"],[7817,2],[7818,1,\"ẋ\"],[7819,2],[7820,1,\"ẍ\"],[7821,2],[7822,1,\"ẏ\"],[7823,2],[7824,1,\"ẑ\"],[7825,2],[7826,1,\"ẓ\"],[7827,2],[7828,1,\"ẕ\"],[[7829,7833],2],[7834,1,\"aʾ\"],[7835,1,\"ṡ\"],[[7836,7837],2],[7838,1,\"ss\"],[7839,2],[7840,1,\"ạ\"],[7841,2],[7842,1,\"ả\"],[7843,2],[7844,1,\"ấ\"],[7845,2],[7846,1,\"ầ\"],[7847,2],[7848,1,\"ẩ\"],[7849,2],[7850,1,\"ẫ\"],[7851,2],[7852,1,\"ậ\"],[7853,2],[7854,1,\"ắ\"],[7855,2],[7856,1,\"ằ\"],[7857,2],[7858,1,\"ẳ\"],[7859,2],[7860,1,\"ẵ\"],[7861,2],[7862,1,\"ặ\"],[7863,2],[7864,1,\"ẹ\"],[7865,2],[7866,1,\"ẻ\"],[7867,2],[7868,1,\"ẽ\"],[7869,2],[7870,1,\"ế\"],[7871,2],[7872,1,\"ề\"],[7873,2],[7874,1,\"ể\"],[7875,2],[7876,1,\"ễ\"],[7877,2],[7878,1,\"ệ\"],[7879,2],[7880,1,\"ỉ\"],[7881,2],[7882,1,\"ị\"],[7883,2],[7884,1,\"ọ\"],[7885,2],[7886,1,\"ỏ\"],[7887,2],[7888,1,\"ố\"],[7889,2],[7890,1,\"ồ\"],[7891,2],[7892,1,\"ổ\"],[7893,2],[7894,1,\"ỗ\"],[7895,2],[7896,1,\"ộ\"],[7897,2],[7898,1,\"ớ\"],[7899,2],[7900,1,\"ờ\"],[7901,2],[7902,1,\"ở\"],[7903,2],[7904,1,\"ỡ\"],[7905,2],[7906,1,\"ợ\"],[7907,2],[7908,1,\"ụ\"],[7909,2],[7910,1,\"ủ\"],[7911,2],[7912,1,\"ứ\"],[7913,2],[7914,1,\"ừ\"],[7915,2],[7916,1,\"ử\"],[7917,2],[7918,1,\"ữ\"],[7919,2],[7920,1,\"ự\"],[7921,2],[7922,1,\"ỳ\"],[7923,2],[7924,1,\"ỵ\"],[7925,2],[7926,1,\"ỷ\"],[7927,2],[7928,1,\"ỹ\"],[7929,2],[7930,1,\"ỻ\"],[7931,2],[7932,1,\"ỽ\"],[7933,2],[7934,1,\"ỿ\"],[7935,2],[[7936,7943],2],[7944,1,\"ἀ\"],[7945,1,\"ἁ\"],[7946,1,\"ἂ\"],[7947,1,\"ἃ\"],[7948,1,\"ἄ\"],[7949,1,\"ἅ\"],[7950,1,\"ἆ\"],[7951,1,\"ἇ\"],[[7952,7957],2],[[7958,7959],3],[7960,1,\"ἐ\"],[7961,1,\"ἑ\"],[7962,1,\"ἒ\"],[7963,1,\"ἓ\"],[7964,1,\"ἔ\"],[7965,1,\"ἕ\"],[[7966,7967],3],[[7968,7975],2],[7976,1,\"ἠ\"],[7977,1,\"ἡ\"],[7978,1,\"ἢ\"],[7979,1,\"ἣ\"],[7980,1,\"ἤ\"],[7981,1,\"ἥ\"],[7982,1,\"ἦ\"],[7983,1,\"ἧ\"],[[7984,7991],2],[7992,1,\"ἰ\"],[7993,1,\"ἱ\"],[7994,1,\"ἲ\"],[7995,1,\"ἳ\"],[7996,1,\"ἴ\"],[7997,1,\"ἵ\"],[7998,1,\"ἶ\"],[7999,1,\"ἷ\"],[[8000,8005],2],[[8006,8007],3],[8008,1,\"ὀ\"],[8009,1,\"ὁ\"],[8010,1,\"ὂ\"],[8011,1,\"ὃ\"],[8012,1,\"ὄ\"],[8013,1,\"ὅ\"],[[8014,8015],3],[[8016,8023],2],[8024,3],[8025,1,\"ὑ\"],[8026,3],[8027,1,\"ὓ\"],[8028,3],[8029,1,\"ὕ\"],[8030,3],[8031,1,\"ὗ\"],[[8032,8039],2],[8040,1,\"ὠ\"],[8041,1,\"ὡ\"],[8042,1,\"ὢ\"],[8043,1,\"ὣ\"],[8044,1,\"ὤ\"],[8045,1,\"ὥ\"],[8046,1,\"ὦ\"],[8047,1,\"ὧ\"],[8048,2],[8049,1,\"ά\"],[8050,2],[8051,1,\"έ\"],[8052,2],[8053,1,\"ή\"],[8054,2],[8055,1,\"ί\"],[8056,2],[8057,1,\"ό\"],[8058,2],[8059,1,\"ύ\"],[8060,2],[8061,1,\"ώ\"],[[8062,8063],3],[8064,1,\"ἀι\"],[8065,1,\"ἁι\"],[8066,1,\"ἂι\"],[8067,1,\"ἃι\"],[8068,1,\"ἄι\"],[8069,1,\"ἅι\"],[8070,1,\"ἆι\"],[8071,1,\"ἇι\"],[8072,1,\"ἀι\"],[8073,1,\"ἁι\"],[8074,1,\"ἂι\"],[8075,1,\"ἃι\"],[8076,1,\"ἄι\"],[8077,1,\"ἅι\"],[8078,1,\"ἆι\"],[8079,1,\"ἇι\"],[8080,1,\"ἠι\"],[8081,1,\"ἡι\"],[8082,1,\"ἢι\"],[8083,1,\"ἣι\"],[8084,1,\"ἤι\"],[8085,1,\"ἥι\"],[8086,1,\"ἦι\"],[8087,1,\"ἧι\"],[8088,1,\"ἠι\"],[8089,1,\"ἡι\"],[8090,1,\"ἢι\"],[8091,1,\"ἣι\"],[8092,1,\"ἤι\"],[8093,1,\"ἥι\"],[8094,1,\"ἦι\"],[8095,1,\"ἧι\"],[8096,1,\"ὠι\"],[8097,1,\"ὡι\"],[8098,1,\"ὢι\"],[8099,1,\"ὣι\"],[8100,1,\"ὤι\"],[8101,1,\"ὥι\"],[8102,1,\"ὦι\"],[8103,1,\"ὧι\"],[8104,1,\"ὠι\"],[8105,1,\"ὡι\"],[8106,1,\"ὢι\"],[8107,1,\"ὣι\"],[8108,1,\"ὤι\"],[8109,1,\"ὥι\"],[8110,1,\"ὦι\"],[8111,1,\"ὧι\"],[[8112,8113],2],[8114,1,\"ὰι\"],[8115,1,\"αι\"],[8116,1,\"άι\"],[8117,3],[8118,2],[8119,1,\"ᾶι\"],[8120,1,\"ᾰ\"],[8121,1,\"ᾱ\"],[8122,1,\"ὰ\"],[8123,1,\"ά\"],[8124,1,\"αι\"],[8125,5,\" ̓\"],[8126,1,\"ι\"],[8127,5,\" ̓\"],[8128,5,\" ͂\"],[8129,5,\" ̈͂\"],[8130,1,\"ὴι\"],[8131,1,\"ηι\"],[8132,1,\"ήι\"],[8133,3],[8134,2],[8135,1,\"ῆι\"],[8136,1,\"ὲ\"],[8137,1,\"έ\"],[8138,1,\"ὴ\"],[8139,1,\"ή\"],[8140,1,\"ηι\"],[8141,5,\" ̓̀\"],[8142,5,\" ̓́\"],[8143,5,\" ̓͂\"],[[8144,8146],2],[8147,1,\"ΐ\"],[[8148,8149],3],[[8150,8151],2],[8152,1,\"ῐ\"],[8153,1,\"ῑ\"],[8154,1,\"ὶ\"],[8155,1,\"ί\"],[8156,3],[8157,5,\" ̔̀\"],[8158,5,\" ̔́\"],[8159,5,\" ̔͂\"],[[8160,8162],2],[8163,1,\"ΰ\"],[[8164,8167],2],[8168,1,\"ῠ\"],[8169,1,\"ῡ\"],[8170,1,\"ὺ\"],[8171,1,\"ύ\"],[8172,1,\"ῥ\"],[8173,5,\" ̈̀\"],[8174,5,\" ̈́\"],[8175,5,\"`\"],[[8176,8177],3],[8178,1,\"ὼι\"],[8179,1,\"ωι\"],[8180,1,\"ώι\"],[8181,3],[8182,2],[8183,1,\"ῶι\"],[8184,1,\"ὸ\"],[8185,1,\"ό\"],[8186,1,\"ὼ\"],[8187,1,\"ώ\"],[8188,1,\"ωι\"],[8189,5,\" ́\"],[8190,5,\" ̔\"],[8191,3],[[8192,8202],5,\" \"],[8203,7],[[8204,8205],6,\"\"],[[8206,8207],3],[8208,2],[8209,1,\"‐\"],[[8210,8214],2],[8215,5,\" ̳\"],[[8216,8227],2],[[8228,8230],3],[8231,2],[[8232,8238],3],[8239,5,\" \"],[[8240,8242],2],[8243,1,\"′′\"],[8244,1,\"′′′\"],[8245,2],[8246,1,\"‵‵\"],[8247,1,\"‵‵‵\"],[[8248,8251],2],[8252,5,\"!!\"],[8253,2],[8254,5,\" ̅\"],[[8255,8262],2],[8263,5,\"??\"],[8264,5,\"?!\"],[8265,5,\"!?\"],[[8266,8269],2],[[8270,8274],2],[[8275,8276],2],[[8277,8278],2],[8279,1,\"′′′′\"],[[8280,8286],2],[8287,5,\" \"],[8288,7],[[8289,8291],3],[8292,7],[8293,3],[[8294,8297],3],[[8298,8303],3],[8304,1,\"0\"],[8305,1,\"i\"],[[8306,8307],3],[8308,1,\"4\"],[8309,1,\"5\"],[8310,1,\"6\"],[8311,1,\"7\"],[8312,1,\"8\"],[8313,1,\"9\"],[8314,5,\"+\"],[8315,1,\"−\"],[8316,5,\"=\"],[8317,5,\"(\"],[8318,5,\")\"],[8319,1,\"n\"],[8320,1,\"0\"],[8321,1,\"1\"],[8322,1,\"2\"],[8323,1,\"3\"],[8324,1,\"4\"],[8325,1,\"5\"],[8326,1,\"6\"],[8327,1,\"7\"],[8328,1,\"8\"],[8329,1,\"9\"],[8330,5,\"+\"],[8331,1,\"−\"],[8332,5,\"=\"],[8333,5,\"(\"],[8334,5,\")\"],[8335,3],[8336,1,\"a\"],[8337,1,\"e\"],[8338,1,\"o\"],[8339,1,\"x\"],[8340,1,\"ə\"],[8341,1,\"h\"],[8342,1,\"k\"],[8343,1,\"l\"],[8344,1,\"m\"],[8345,1,\"n\"],[8346,1,\"p\"],[8347,1,\"s\"],[8348,1,\"t\"],[[8349,8351],3],[[8352,8359],2],[8360,1,\"rs\"],[[8361,8362],2],[8363,2],[8364,2],[[8365,8367],2],[[8368,8369],2],[[8370,8373],2],[[8374,8376],2],[8377,2],[8378,2],[[8379,8381],2],[8382,2],[8383,2],[[8384,8399],3],[[8400,8417],2],[[8418,8419],2],[[8420,8426],2],[8427,2],[[8428,8431],2],[8432,2],[[8433,8447],3],[8448,5,\"a/c\"],[8449,5,\"a/s\"],[8450,1,\"c\"],[8451,1,\"°c\"],[8452,2],[8453,5,\"c/o\"],[8454,5,\"c/u\"],[8455,1,\"ɛ\"],[8456,2],[8457,1,\"°f\"],[8458,1,\"g\"],[[8459,8462],1,\"h\"],[8463,1,\"ħ\"],[[8464,8465],1,\"i\"],[[8466,8467],1,\"l\"],[8468,2],[8469,1,\"n\"],[8470,1,\"no\"],[[8471,8472],2],[8473,1,\"p\"],[8474,1,\"q\"],[[8475,8477],1,\"r\"],[[8478,8479],2],[8480,1,\"sm\"],[8481,1,\"tel\"],[8482,1,\"tm\"],[8483,2],[8484,1,\"z\"],[8485,2],[8486,1,\"ω\"],[8487,2],[8488,1,\"z\"],[8489,2],[8490,1,\"k\"],[8491,1,\"å\"],[8492,1,\"b\"],[8493,1,\"c\"],[8494,2],[[8495,8496],1,\"e\"],[8497,1,\"f\"],[8498,3],[8499,1,\"m\"],[8500,1,\"o\"],[8501,1,\"א\"],[8502,1,\"ב\"],[8503,1,\"ג\"],[8504,1,\"ד\"],[8505,1,\"i\"],[8506,2],[8507,1,\"fax\"],[8508,1,\"π\"],[[8509,8510],1,\"γ\"],[8511,1,\"π\"],[8512,1,\"∑\"],[[8513,8516],2],[[8517,8518],1,\"d\"],[8519,1,\"e\"],[8520,1,\"i\"],[8521,1,\"j\"],[[8522,8523],2],[8524,2],[8525,2],[8526,2],[8527,2],[8528,1,\"1⁄7\"],[8529,1,\"1⁄9\"],[8530,1,\"1⁄10\"],[8531,1,\"1⁄3\"],[8532,1,\"2⁄3\"],[8533,1,\"1⁄5\"],[8534,1,\"2⁄5\"],[8535,1,\"3⁄5\"],[8536,1,\"4⁄5\"],[8537,1,\"1⁄6\"],[8538,1,\"5⁄6\"],[8539,1,\"1⁄8\"],[8540,1,\"3⁄8\"],[8541,1,\"5⁄8\"],[8542,1,\"7⁄8\"],[8543,1,\"1⁄\"],[8544,1,\"i\"],[8545,1,\"ii\"],[8546,1,\"iii\"],[8547,1,\"iv\"],[8548,1,\"v\"],[8549,1,\"vi\"],[8550,1,\"vii\"],[8551,1,\"viii\"],[8552,1,\"ix\"],[8553,1,\"x\"],[8554,1,\"xi\"],[8555,1,\"xii\"],[8556,1,\"l\"],[8557,1,\"c\"],[8558,1,\"d\"],[8559,1,\"m\"],[8560,1,\"i\"],[8561,1,\"ii\"],[8562,1,\"iii\"],[8563,1,\"iv\"],[8564,1,\"v\"],[8565,1,\"vi\"],[8566,1,\"vii\"],[8567,1,\"viii\"],[8568,1,\"ix\"],[8569,1,\"x\"],[8570,1,\"xi\"],[8571,1,\"xii\"],[8572,1,\"l\"],[8573,1,\"c\"],[8574,1,\"d\"],[8575,1,\"m\"],[[8576,8578],2],[8579,3],[8580,2],[[8581,8584],2],[8585,1,\"0⁄3\"],[[8586,8587],2],[[8588,8591],3],[[8592,8682],2],[[8683,8691],2],[[8692,8703],2],[[8704,8747],2],[8748,1,\"∫∫\"],[8749,1,\"∫∫∫\"],[8750,2],[8751,1,\"∮∮\"],[8752,1,\"∮∮∮\"],[[8753,8799],2],[8800,4],[[8801,8813],2],[[8814,8815],4],[[8816,8945],2],[[8946,8959],2],[8960,2],[8961,2],[[8962,9000],2],[9001,1,\"〈\"],[9002,1,\"〉\"],[[9003,9082],2],[9083,2],[9084,2],[[9085,9114],2],[[9115,9166],2],[[9167,9168],2],[[9169,9179],2],[[9180,9191],2],[9192,2],[[9193,9203],2],[[9204,9210],2],[[9211,9214],2],[9215,2],[[9216,9252],2],[[9253,9254],2],[[9255,9279],3],[[9280,9290],2],[[9291,9311],3],[9312,1,\"1\"],[9313,1,\"2\"],[9314,1,\"3\"],[9315,1,\"4\"],[9316,1,\"5\"],[9317,1,\"6\"],[9318,1,\"7\"],[9319,1,\"8\"],[9320,1,\"9\"],[9321,1,\"10\"],[9322,1,\"11\"],[9323,1,\"12\"],[9324,1,\"13\"],[9325,1,\"14\"],[9326,1,\"15\"],[9327,1,\"16\"],[9328,1,\"17\"],[9329,1,\"18\"],[9330,1,\"19\"],[9331,1,\"20\"],[9332,5,\"(1)\"],[9333,5,\"(2)\"],[9334,5,\"(3)\"],[9335,5,\"(4)\"],[9336,5,\"(5)\"],[9337,5,\"(6)\"],[9338,5,\"(7)\"],[9339,5,\"(8)\"],[9340,5,\"(9)\"],[9341,5,\"(10)\"],[9342,5,\"(11)\"],[9343,5,\"(12)\"],[9344,5,\"(13)\"],[9345,5,\"(14)\"],[9346,5,\"(15)\"],[9347,5,\"(16)\"],[9348,5,\"(17)\"],[9349,5,\"(18)\"],[9350,5,\"(19)\"],[9351,5,\"(20)\"],[[9352,9371],3],[9372,5,\"(a)\"],[9373,5,\"(b)\"],[9374,5,\"(c)\"],[9375,5,\"(d)\"],[9376,5,\"(e)\"],[9377,5,\"(f)\"],[9378,5,\"(g)\"],[9379,5,\"(h)\"],[9380,5,\"(i)\"],[9381,5,\"(j)\"],[9382,5,\"(k)\"],[9383,5,\"(l)\"],[9384,5,\"(m)\"],[9385,5,\"(n)\"],[9386,5,\"(o)\"],[9387,5,\"(p)\"],[9388,5,\"(q)\"],[9389,5,\"(r)\"],[9390,5,\"(s)\"],[9391,5,\"(t)\"],[9392,5,\"(u)\"],[9393,5,\"(v)\"],[9394,5,\"(w)\"],[9395,5,\"(x)\"],[9396,5,\"(y)\"],[9397,5,\"(z)\"],[9398,1,\"a\"],[9399,1,\"b\"],[9400,1,\"c\"],[9401,1,\"d\"],[9402,1,\"e\"],[9403,1,\"f\"],[9404,1,\"g\"],[9405,1,\"h\"],[9406,1,\"i\"],[9407,1,\"j\"],[9408,1,\"k\"],[9409,1,\"l\"],[9410,1,\"m\"],[9411,1,\"n\"],[9412,1,\"o\"],[9413,1,\"p\"],[9414,1,\"q\"],[9415,1,\"r\"],[9416,1,\"s\"],[9417,1,\"t\"],[9418,1,\"u\"],[9419,1,\"v\"],[9420,1,\"w\"],[9421,1,\"x\"],[9422,1,\"y\"],[9423,1,\"z\"],[9424,1,\"a\"],[9425,1,\"b\"],[9426,1,\"c\"],[9427,1,\"d\"],[9428,1,\"e\"],[9429,1,\"f\"],[9430,1,\"g\"],[9431,1,\"h\"],[9432,1,\"i\"],[9433,1,\"j\"],[9434,1,\"k\"],[9435,1,\"l\"],[9436,1,\"m\"],[9437,1,\"n\"],[9438,1,\"o\"],[9439,1,\"p\"],[9440,1,\"q\"],[9441,1,\"r\"],[9442,1,\"s\"],[9443,1,\"t\"],[9444,1,\"u\"],[9445,1,\"v\"],[9446,1,\"w\"],[9447,1,\"x\"],[9448,1,\"y\"],[9449,1,\"z\"],[9450,1,\"0\"],[[9451,9470],2],[9471,2],[[9472,9621],2],[[9622,9631],2],[[9632,9711],2],[[9712,9719],2],[[9720,9727],2],[[9728,9747],2],[[9748,9749],2],[[9750,9751],2],[9752,2],[9753,2],[[9754,9839],2],[[9840,9841],2],[[9842,9853],2],[[9854,9855],2],[[9856,9865],2],[[9866,9873],2],[[9874,9884],2],[9885,2],[[9886,9887],2],[[9888,9889],2],[[9890,9905],2],[9906,2],[[9907,9916],2],[[9917,9919],2],[[9920,9923],2],[[9924,9933],2],[9934,2],[[9935,9953],2],[9954,2],[9955,2],[[9956,9959],2],[[9960,9983],2],[9984,2],[[9985,9988],2],[9989,2],[[9990,9993],2],[[9994,9995],2],[[9996,10023],2],[10024,2],[[10025,10059],2],[10060,2],[10061,2],[10062,2],[[10063,10066],2],[[10067,10069],2],[10070,2],[10071,2],[[10072,10078],2],[[10079,10080],2],[[10081,10087],2],[[10088,10101],2],[[10102,10132],2],[[10133,10135],2],[[10136,10159],2],[10160,2],[[10161,10174],2],[10175,2],[[10176,10182],2],[[10183,10186],2],[10187,2],[10188,2],[10189,2],[[10190,10191],2],[[10192,10219],2],[[10220,10223],2],[[10224,10239],2],[[10240,10495],2],[[10496,10763],2],[10764,1,\"∫∫∫∫\"],[[10765,10867],2],[10868,5,\"::=\"],[10869,5,\"==\"],[10870,5,\"===\"],[[10871,10971],2],[10972,1,\"⫝̸\"],[[10973,11007],2],[[11008,11021],2],[[11022,11027],2],[[11028,11034],2],[[11035,11039],2],[[11040,11043],2],[[11044,11084],2],[[11085,11087],2],[[11088,11092],2],[[11093,11097],2],[[11098,11123],2],[[11124,11125],3],[[11126,11157],2],[[11158,11159],3],[[11160,11193],2],[[11194,11196],2],[[11197,11208],2],[11209,2],[[11210,11217],2],[11218,2],[[11219,11243],2],[[11244,11247],2],[[11248,11262],2],[11263,2],[11264,1,\"ⰰ\"],[11265,1,\"ⰱ\"],[11266,1,\"ⰲ\"],[11267,1,\"ⰳ\"],[11268,1,\"ⰴ\"],[11269,1,\"ⰵ\"],[11270,1,\"ⰶ\"],[11271,1,\"ⰷ\"],[11272,1,\"ⰸ\"],[11273,1,\"ⰹ\"],[11274,1,\"ⰺ\"],[11275,1,\"ⰻ\"],[11276,1,\"ⰼ\"],[11277,1,\"ⰽ\"],[11278,1,\"ⰾ\"],[11279,1,\"ⰿ\"],[11280,1,\"ⱀ\"],[11281,1,\"ⱁ\"],[11282,1,\"ⱂ\"],[11283,1,\"ⱃ\"],[11284,1,\"ⱄ\"],[11285,1,\"ⱅ\"],[11286,1,\"ⱆ\"],[11287,1,\"ⱇ\"],[11288,1,\"ⱈ\"],[11289,1,\"ⱉ\"],[11290,1,\"ⱊ\"],[11291,1,\"ⱋ\"],[11292,1,\"ⱌ\"],[11293,1,\"ⱍ\"],[11294,1,\"ⱎ\"],[11295,1,\"ⱏ\"],[11296,1,\"ⱐ\"],[11297,1,\"ⱑ\"],[11298,1,\"ⱒ\"],[11299,1,\"ⱓ\"],[11300,1,\"ⱔ\"],[11301,1,\"ⱕ\"],[11302,1,\"ⱖ\"],[11303,1,\"ⱗ\"],[11304,1,\"ⱘ\"],[11305,1,\"ⱙ\"],[11306,1,\"ⱚ\"],[11307,1,\"ⱛ\"],[11308,1,\"ⱜ\"],[11309,1,\"ⱝ\"],[11310,1,\"ⱞ\"],[11311,3],[[11312,11358],2],[11359,3],[11360,1,\"ⱡ\"],[11361,2],[11362,1,\"ɫ\"],[11363,1,\"ᵽ\"],[11364,1,\"ɽ\"],[[11365,11366],2],[11367,1,\"ⱨ\"],[11368,2],[11369,1,\"ⱪ\"],[11370,2],[11371,1,\"ⱬ\"],[11372,2],[11373,1,\"ɑ\"],[11374,1,\"ɱ\"],[11375,1,\"ɐ\"],[11376,1,\"ɒ\"],[11377,2],[11378,1,\"ⱳ\"],[11379,2],[11380,2],[11381,1,\"ⱶ\"],[[11382,11383],2],[[11384,11387],2],[11388,1,\"j\"],[11389,1,\"v\"],[11390,1,\"ȿ\"],[11391,1,\"ɀ\"],[11392,1,\"ⲁ\"],[11393,2],[11394,1,\"ⲃ\"],[11395,2],[11396,1,\"ⲅ\"],[11397,2],[11398,1,\"ⲇ\"],[11399,2],[11400,1,\"ⲉ\"],[11401,2],[11402,1,\"ⲋ\"],[11403,2],[11404,1,\"ⲍ\"],[11405,2],[11406,1,\"ⲏ\"],[11407,2],[11408,1,\"ⲑ\"],[11409,2],[11410,1,\"ⲓ\"],[11411,2],[11412,1,\"ⲕ\"],[11413,2],[11414,1,\"ⲗ\"],[11415,2],[11416,1,\"ⲙ\"],[11417,2],[11418,1,\"ⲛ\"],[11419,2],[11420,1,\"ⲝ\"],[11421,2],[11422,1,\"ⲟ\"],[11423,2],[11424,1,\"ⲡ\"],[11425,2],[11426,1,\"ⲣ\"],[11427,2],[11428,1,\"ⲥ\"],[11429,2],[11430,1,\"ⲧ\"],[11431,2],[11432,1,\"ⲩ\"],[11433,2],[11434,1,\"ⲫ\"],[11435,2],[11436,1,\"ⲭ\"],[11437,2],[11438,1,\"ⲯ\"],[11439,2],[11440,1,\"ⲱ\"],[11441,2],[11442,1,\"ⲳ\"],[11443,2],[11444,1,\"ⲵ\"],[11445,2],[11446,1,\"ⲷ\"],[11447,2],[11448,1,\"ⲹ\"],[11449,2],[11450,1,\"ⲻ\"],[11451,2],[11452,1,\"ⲽ\"],[11453,2],[11454,1,\"ⲿ\"],[11455,2],[11456,1,\"ⳁ\"],[11457,2],[11458,1,\"ⳃ\"],[11459,2],[11460,1,\"ⳅ\"],[11461,2],[11462,1,\"ⳇ\"],[11463,2],[11464,1,\"ⳉ\"],[11465,2],[11466,1,\"ⳋ\"],[11467,2],[11468,1,\"ⳍ\"],[11469,2],[11470,1,\"ⳏ\"],[11471,2],[11472,1,\"ⳑ\"],[11473,2],[11474,1,\"ⳓ\"],[11475,2],[11476,1,\"ⳕ\"],[11477,2],[11478,1,\"ⳗ\"],[11479,2],[11480,1,\"ⳙ\"],[11481,2],[11482,1,\"ⳛ\"],[11483,2],[11484,1,\"ⳝ\"],[11485,2],[11486,1,\"ⳟ\"],[11487,2],[11488,1,\"ⳡ\"],[11489,2],[11490,1,\"ⳣ\"],[[11491,11492],2],[[11493,11498],2],[11499,1,\"ⳬ\"],[11500,2],[11501,1,\"ⳮ\"],[[11502,11505],2],[11506,1,\"ⳳ\"],[11507,2],[[11508,11512],3],[[11513,11519],2],[[11520,11557],2],[11558,3],[11559,2],[[11560,11564],3],[11565,2],[[11566,11567],3],[[11568,11621],2],[[11622,11623],2],[[11624,11630],3],[11631,1,\"ⵡ\"],[11632,2],[[11633,11646],3],[11647,2],[[11648,11670],2],[[11671,11679],3],[[11680,11686],2],[11687,3],[[11688,11694],2],[11695,3],[[11696,11702],2],[11703,3],[[11704,11710],2],[11711,3],[[11712,11718],2],[11719,3],[[11720,11726],2],[11727,3],[[11728,11734],2],[11735,3],[[11736,11742],2],[11743,3],[[11744,11775],2],[[11776,11799],2],[[11800,11803],2],[[11804,11805],2],[[11806,11822],2],[11823,2],[11824,2],[11825,2],[[11826,11835],2],[[11836,11842],2],[[11843,11844],2],[[11845,11849],2],[[11850,11854],2],[11855,2],[[11856,11903],3],[[11904,11929],2],[11930,3],[[11931,11934],2],[11935,1,\"母\"],[[11936,12018],2],[12019,1,\"龟\"],[[12020,12031],3],[12032,1,\"一\"],[12033,1,\"丨\"],[12034,1,\"丶\"],[12035,1,\"丿\"],[12036,1,\"乙\"],[12037,1,\"亅\"],[12038,1,\"二\"],[12039,1,\"亠\"],[12040,1,\"人\"],[12041,1,\"儿\"],[12042,1,\"入\"],[12043,1,\"八\"],[12044,1,\"冂\"],[12045,1,\"冖\"],[12046,1,\"冫\"],[12047,1,\"几\"],[12048,1,\"凵\"],[12049,1,\"刀\"],[12050,1,\"力\"],[12051,1,\"勹\"],[12052,1,\"匕\"],[12053,1,\"匚\"],[12054,1,\"匸\"],[12055,1,\"十\"],[12056,1,\"卜\"],[12057,1,\"卩\"],[12058,1,\"厂\"],[12059,1,\"厶\"],[12060,1,\"又\"],[12061,1,\"口\"],[12062,1,\"囗\"],[12063,1,\"土\"],[12064,1,\"士\"],[12065,1,\"夂\"],[12066,1,\"夊\"],[12067,1,\"夕\"],[12068,1,\"大\"],[12069,1,\"女\"],[12070,1,\"子\"],[12071,1,\"宀\"],[12072,1,\"寸\"],[12073,1,\"小\"],[12074,1,\"尢\"],[12075,1,\"尸\"],[12076,1,\"屮\"],[12077,1,\"山\"],[12078,1,\"巛\"],[12079,1,\"工\"],[12080,1,\"己\"],[12081,1,\"巾\"],[12082,1,\"干\"],[12083,1,\"幺\"],[12084,1,\"广\"],[12085,1,\"廴\"],[12086,1,\"廾\"],[12087,1,\"弋\"],[12088,1,\"弓\"],[12089,1,\"彐\"],[12090,1,\"彡\"],[12091,1,\"彳\"],[12092,1,\"心\"],[12093,1,\"戈\"],[12094,1,\"戶\"],[12095,1,\"手\"],[12096,1,\"支\"],[12097,1,\"攴\"],[12098,1,\"文\"],[12099,1,\"斗\"],[12100,1,\"斤\"],[12101,1,\"方\"],[12102,1,\"无\"],[12103,1,\"日\"],[12104,1,\"曰\"],[12105,1,\"月\"],[12106,1,\"木\"],[12107,1,\"欠\"],[12108,1,\"止\"],[12109,1,\"歹\"],[12110,1,\"殳\"],[12111,1,\"毋\"],[12112,1,\"比\"],[12113,1,\"毛\"],[12114,1,\"氏\"],[12115,1,\"气\"],[12116,1,\"水\"],[12117,1,\"火\"],[12118,1,\"爪\"],[12119,1,\"父\"],[12120,1,\"爻\"],[12121,1,\"爿\"],[12122,1,\"片\"],[12123,1,\"牙\"],[12124,1,\"牛\"],[12125,1,\"犬\"],[12126,1,\"玄\"],[12127,1,\"玉\"],[12128,1,\"瓜\"],[12129,1,\"瓦\"],[12130,1,\"甘\"],[12131,1,\"生\"],[12132,1,\"用\"],[12133,1,\"田\"],[12134,1,\"疋\"],[12135,1,\"疒\"],[12136,1,\"癶\"],[12137,1,\"白\"],[12138,1,\"皮\"],[12139,1,\"皿\"],[12140,1,\"目\"],[12141,1,\"矛\"],[12142,1,\"矢\"],[12143,1,\"石\"],[12144,1,\"示\"],[12145,1,\"禸\"],[12146,1,\"禾\"],[12147,1,\"穴\"],[12148,1,\"立\"],[12149,1,\"竹\"],[12150,1,\"米\"],[12151,1,\"糸\"],[12152,1,\"缶\"],[12153,1,\"网\"],[12154,1,\"羊\"],[12155,1,\"羽\"],[12156,1,\"老\"],[12157,1,\"而\"],[12158,1,\"耒\"],[12159,1,\"耳\"],[12160,1,\"聿\"],[12161,1,\"肉\"],[12162,1,\"臣\"],[12163,1,\"自\"],[12164,1,\"至\"],[12165,1,\"臼\"],[12166,1,\"舌\"],[12167,1,\"舛\"],[12168,1,\"舟\"],[12169,1,\"艮\"],[12170,1,\"色\"],[12171,1,\"艸\"],[12172,1,\"虍\"],[12173,1,\"虫\"],[12174,1,\"血\"],[12175,1,\"行\"],[12176,1,\"衣\"],[12177,1,\"襾\"],[12178,1,\"見\"],[12179,1,\"角\"],[12180,1,\"言\"],[12181,1,\"谷\"],[12182,1,\"豆\"],[12183,1,\"豕\"],[12184,1,\"豸\"],[12185,1,\"貝\"],[12186,1,\"赤\"],[12187,1,\"走\"],[12188,1,\"足\"],[12189,1,\"身\"],[12190,1,\"車\"],[12191,1,\"辛\"],[12192,1,\"辰\"],[12193,1,\"辵\"],[12194,1,\"邑\"],[12195,1,\"酉\"],[12196,1,\"釆\"],[12197,1,\"里\"],[12198,1,\"金\"],[12199,1,\"長\"],[12200,1,\"門\"],[12201,1,\"阜\"],[12202,1,\"隶\"],[12203,1,\"隹\"],[12204,1,\"雨\"],[12205,1,\"靑\"],[12206,1,\"非\"],[12207,1,\"面\"],[12208,1,\"革\"],[12209,1,\"韋\"],[12210,1,\"韭\"],[12211,1,\"音\"],[12212,1,\"頁\"],[12213,1,\"風\"],[12214,1,\"飛\"],[12215,1,\"食\"],[12216,1,\"首\"],[12217,1,\"香\"],[12218,1,\"馬\"],[12219,1,\"骨\"],[12220,1,\"高\"],[12221,1,\"髟\"],[12222,1,\"鬥\"],[12223,1,\"鬯\"],[12224,1,\"鬲\"],[12225,1,\"鬼\"],[12226,1,\"魚\"],[12227,1,\"鳥\"],[12228,1,\"鹵\"],[12229,1,\"鹿\"],[12230,1,\"麥\"],[12231,1,\"麻\"],[12232,1,\"黃\"],[12233,1,\"黍\"],[12234,1,\"黑\"],[12235,1,\"黹\"],[12236,1,\"黽\"],[12237,1,\"鼎\"],[12238,1,\"鼓\"],[12239,1,\"鼠\"],[12240,1,\"鼻\"],[12241,1,\"齊\"],[12242,1,\"齒\"],[12243,1,\"龍\"],[12244,1,\"龜\"],[12245,1,\"龠\"],[[12246,12271],3],[[12272,12283],3],[[12284,12287],3],[12288,5,\" \"],[12289,2],[12290,1,\".\"],[[12291,12292],2],[[12293,12295],2],[[12296,12329],2],[[12330,12333],2],[[12334,12341],2],[12342,1,\"〒\"],[12343,2],[12344,1,\"十\"],[12345,1,\"卄\"],[12346,1,\"卅\"],[12347,2],[12348,2],[12349,2],[12350,2],[12351,2],[12352,3],[[12353,12436],2],[[12437,12438],2],[[12439,12440],3],[[12441,12442],2],[12443,5,\" ゙\"],[12444,5,\" ゚\"],[[12445,12446],2],[12447,1,\"より\"],[12448,2],[[12449,12542],2],[12543,1,\"コト\"],[[12544,12548],3],[[12549,12588],2],[12589,2],[12590,2],[12591,2],[12592,3],[12593,1,\"ᄀ\"],[12594,1,\"ᄁ\"],[12595,1,\"ᆪ\"],[12596,1,\"ᄂ\"],[12597,1,\"ᆬ\"],[12598,1,\"ᆭ\"],[12599,1,\"ᄃ\"],[12600,1,\"ᄄ\"],[12601,1,\"ᄅ\"],[12602,1,\"ᆰ\"],[12603,1,\"ᆱ\"],[12604,1,\"ᆲ\"],[12605,1,\"ᆳ\"],[12606,1,\"ᆴ\"],[12607,1,\"ᆵ\"],[12608,1,\"ᄚ\"],[12609,1,\"ᄆ\"],[12610,1,\"ᄇ\"],[12611,1,\"ᄈ\"],[12612,1,\"ᄡ\"],[12613,1,\"ᄉ\"],[12614,1,\"ᄊ\"],[12615,1,\"ᄋ\"],[12616,1,\"ᄌ\"],[12617,1,\"ᄍ\"],[12618,1,\"ᄎ\"],[12619,1,\"ᄏ\"],[12620,1,\"ᄐ\"],[12621,1,\"ᄑ\"],[12622,1,\"ᄒ\"],[12623,1,\"ᅡ\"],[12624,1,\"ᅢ\"],[12625,1,\"ᅣ\"],[12626,1,\"ᅤ\"],[12627,1,\"ᅥ\"],[12628,1,\"ᅦ\"],[12629,1,\"ᅧ\"],[12630,1,\"ᅨ\"],[12631,1,\"ᅩ\"],[12632,1,\"ᅪ\"],[12633,1,\"ᅫ\"],[12634,1,\"ᅬ\"],[12635,1,\"ᅭ\"],[12636,1,\"ᅮ\"],[12637,1,\"ᅯ\"],[12638,1,\"ᅰ\"],[12639,1,\"ᅱ\"],[12640,1,\"ᅲ\"],[12641,1,\"ᅳ\"],[12642,1,\"ᅴ\"],[12643,1,\"ᅵ\"],[12644,3],[12645,1,\"ᄔ\"],[12646,1,\"ᄕ\"],[12647,1,\"ᇇ\"],[12648,1,\"ᇈ\"],[12649,1,\"ᇌ\"],[12650,1,\"ᇎ\"],[12651,1,\"ᇓ\"],[12652,1,\"ᇗ\"],[12653,1,\"ᇙ\"],[12654,1,\"ᄜ\"],[12655,1,\"ᇝ\"],[12656,1,\"ᇟ\"],[12657,1,\"ᄝ\"],[12658,1,\"ᄞ\"],[12659,1,\"ᄠ\"],[12660,1,\"ᄢ\"],[12661,1,\"ᄣ\"],[12662,1,\"ᄧ\"],[12663,1,\"ᄩ\"],[12664,1,\"ᄫ\"],[12665,1,\"ᄬ\"],[12666,1,\"ᄭ\"],[12667,1,\"ᄮ\"],[12668,1,\"ᄯ\"],[12669,1,\"ᄲ\"],[12670,1,\"ᄶ\"],[12671,1,\"ᅀ\"],[12672,1,\"ᅇ\"],[12673,1,\"ᅌ\"],[12674,1,\"ᇱ\"],[12675,1,\"ᇲ\"],[12676,1,\"ᅗ\"],[12677,1,\"ᅘ\"],[12678,1,\"ᅙ\"],[12679,1,\"ᆄ\"],[12680,1,\"ᆅ\"],[12681,1,\"ᆈ\"],[12682,1,\"ᆑ\"],[12683,1,\"ᆒ\"],[12684,1,\"ᆔ\"],[12685,1,\"ᆞ\"],[12686,1,\"ᆡ\"],[12687,3],[[12688,12689],2],[12690,1,\"一\"],[12691,1,\"二\"],[12692,1,\"三\"],[12693,1,\"四\"],[12694,1,\"上\"],[12695,1,\"中\"],[12696,1,\"下\"],[12697,1,\"甲\"],[12698,1,\"乙\"],[12699,1,\"丙\"],[12700,1,\"丁\"],[12701,1,\"天\"],[12702,1,\"地\"],[12703,1,\"人\"],[[12704,12727],2],[[12728,12730],2],[[12731,12735],3],[[12736,12751],2],[[12752,12771],2],[[12772,12783],3],[[12784,12799],2],[12800,5,\"(ᄀ)\"],[12801,5,\"(ᄂ)\"],[12802,5,\"(ᄃ)\"],[12803,5,\"(ᄅ)\"],[12804,5,\"(ᄆ)\"],[12805,5,\"(ᄇ)\"],[12806,5,\"(ᄉ)\"],[12807,5,\"(ᄋ)\"],[12808,5,\"(ᄌ)\"],[12809,5,\"(ᄎ)\"],[12810,5,\"(ᄏ)\"],[12811,5,\"(ᄐ)\"],[12812,5,\"(ᄑ)\"],[12813,5,\"(ᄒ)\"],[12814,5,\"(가)\"],[12815,5,\"(나)\"],[12816,5,\"(다)\"],[12817,5,\"(라)\"],[12818,5,\"(마)\"],[12819,5,\"(바)\"],[12820,5,\"(사)\"],[12821,5,\"(아)\"],[12822,5,\"(자)\"],[12823,5,\"(차)\"],[12824,5,\"(카)\"],[12825,5,\"(타)\"],[12826,5,\"(파)\"],[12827,5,\"(하)\"],[12828,5,\"(주)\"],[12829,5,\"(오전)\"],[12830,5,\"(오후)\"],[12831,3],[12832,5,\"(一)\"],[12833,5,\"(二)\"],[12834,5,\"(三)\"],[12835,5,\"(四)\"],[12836,5,\"(五)\"],[12837,5,\"(六)\"],[12838,5,\"(七)\"],[12839,5,\"(八)\"],[12840,5,\"(九)\"],[12841,5,\"(十)\"],[12842,5,\"(月)\"],[12843,5,\"(火)\"],[12844,5,\"(水)\"],[12845,5,\"(木)\"],[12846,5,\"(金)\"],[12847,5,\"(土)\"],[12848,5,\"(日)\"],[12849,5,\"(株)\"],[12850,5,\"(有)\"],[12851,5,\"(社)\"],[12852,5,\"(名)\"],[12853,5,\"(特)\"],[12854,5,\"(財)\"],[12855,5,\"(祝)\"],[12856,5,\"(労)\"],[12857,5,\"(代)\"],[12858,5,\"(呼)\"],[12859,5,\"(学)\"],[12860,5,\"(監)\"],[12861,5,\"(企)\"],[12862,5,\"(資)\"],[12863,5,\"(協)\"],[12864,5,\"(祭)\"],[12865,5,\"(休)\"],[12866,5,\"(自)\"],[12867,5,\"(至)\"],[12868,1,\"問\"],[12869,1,\"幼\"],[12870,1,\"文\"],[12871,1,\"箏\"],[[12872,12879],2],[12880,1,\"pte\"],[12881,1,\"21\"],[12882,1,\"22\"],[12883,1,\"23\"],[12884,1,\"24\"],[12885,1,\"25\"],[12886,1,\"26\"],[12887,1,\"27\"],[12888,1,\"28\"],[12889,1,\"29\"],[12890,1,\"30\"],[12891,1,\"31\"],[12892,1,\"32\"],[12893,1,\"33\"],[12894,1,\"34\"],[12895,1,\"35\"],[12896,1,\"ᄀ\"],[12897,1,\"ᄂ\"],[12898,1,\"ᄃ\"],[12899,1,\"ᄅ\"],[12900,1,\"ᄆ\"],[12901,1,\"ᄇ\"],[12902,1,\"ᄉ\"],[12903,1,\"ᄋ\"],[12904,1,\"ᄌ\"],[12905,1,\"ᄎ\"],[12906,1,\"ᄏ\"],[12907,1,\"ᄐ\"],[12908,1,\"ᄑ\"],[12909,1,\"ᄒ\"],[12910,1,\"가\"],[12911,1,\"나\"],[12912,1,\"다\"],[12913,1,\"라\"],[12914,1,\"마\"],[12915,1,\"바\"],[12916,1,\"사\"],[12917,1,\"아\"],[12918,1,\"자\"],[12919,1,\"차\"],[12920,1,\"카\"],[12921,1,\"타\"],[12922,1,\"파\"],[12923,1,\"하\"],[12924,1,\"참고\"],[12925,1,\"주의\"],[12926,1,\"우\"],[12927,2],[12928,1,\"一\"],[12929,1,\"二\"],[12930,1,\"三\"],[12931,1,\"四\"],[12932,1,\"五\"],[12933,1,\"六\"],[12934,1,\"七\"],[12935,1,\"八\"],[12936,1,\"九\"],[12937,1,\"十\"],[12938,1,\"月\"],[12939,1,\"火\"],[12940,1,\"水\"],[12941,1,\"木\"],[12942,1,\"金\"],[12943,1,\"土\"],[12944,1,\"日\"],[12945,1,\"株\"],[12946,1,\"有\"],[12947,1,\"社\"],[12948,1,\"名\"],[12949,1,\"特\"],[12950,1,\"財\"],[12951,1,\"祝\"],[12952,1,\"労\"],[12953,1,\"秘\"],[12954,1,\"男\"],[12955,1,\"女\"],[12956,1,\"適\"],[12957,1,\"優\"],[12958,1,\"印\"],[12959,1,\"注\"],[12960,1,\"項\"],[12961,1,\"休\"],[12962,1,\"写\"],[12963,1,\"正\"],[12964,1,\"上\"],[12965,1,\"中\"],[12966,1,\"下\"],[12967,1,\"左\"],[12968,1,\"右\"],[12969,1,\"医\"],[12970,1,\"宗\"],[12971,1,\"学\"],[12972,1,\"監\"],[12973,1,\"企\"],[12974,1,\"資\"],[12975,1,\"協\"],[12976,1,\"夜\"],[12977,1,\"36\"],[12978,1,\"37\"],[12979,1,\"38\"],[12980,1,\"39\"],[12981,1,\"40\"],[12982,1,\"41\"],[12983,1,\"42\"],[12984,1,\"43\"],[12985,1,\"44\"],[12986,1,\"45\"],[12987,1,\"46\"],[12988,1,\"47\"],[12989,1,\"48\"],[12990,1,\"49\"],[12991,1,\"50\"],[12992,1,\"1月\"],[12993,1,\"2月\"],[12994,1,\"3月\"],[12995,1,\"4月\"],[12996,1,\"5月\"],[12997,1,\"6月\"],[12998,1,\"7月\"],[12999,1,\"8月\"],[13000,1,\"9月\"],[13001,1,\"10月\"],[13002,1,\"11月\"],[13003,1,\"12月\"],[13004,1,\"hg\"],[13005,1,\"erg\"],[13006,1,\"ev\"],[13007,1,\"ltd\"],[13008,1,\"ア\"],[13009,1,\"イ\"],[13010,1,\"ウ\"],[13011,1,\"エ\"],[13012,1,\"オ\"],[13013,1,\"カ\"],[13014,1,\"キ\"],[13015,1,\"ク\"],[13016,1,\"ケ\"],[13017,1,\"コ\"],[13018,1,\"サ\"],[13019,1,\"シ\"],[13020,1,\"ス\"],[13021,1,\"セ\"],[13022,1,\"ソ\"],[13023,1,\"タ\"],[13024,1,\"チ\"],[13025,1,\"ツ\"],[13026,1,\"テ\"],[13027,1,\"ト\"],[13028,1,\"ナ\"],[13029,1,\"ニ\"],[13030,1,\"ヌ\"],[13031,1,\"ネ\"],[13032,1,\"ノ\"],[13033,1,\"ハ\"],[13034,1,\"ヒ\"],[13035,1,\"フ\"],[13036,1,\"ヘ\"],[13037,1,\"ホ\"],[13038,1,\"マ\"],[13039,1,\"ミ\"],[13040,1,\"ム\"],[13041,1,\"メ\"],[13042,1,\"モ\"],[13043,1,\"ヤ\"],[13044,1,\"ユ\"],[13045,1,\"ヨ\"],[13046,1,\"ラ\"],[13047,1,\"リ\"],[13048,1,\"ル\"],[13049,1,\"レ\"],[13050,1,\"ロ\"],[13051,1,\"ワ\"],[13052,1,\"ヰ\"],[13053,1,\"ヱ\"],[13054,1,\"ヲ\"],[13055,1,\"令和\"],[13056,1,\"アパート\"],[13057,1,\"アルファ\"],[13058,1,\"アンペア\"],[13059,1,\"アール\"],[13060,1,\"イニング\"],[13061,1,\"インチ\"],[13062,1,\"ウォン\"],[13063,1,\"エスクード\"],[13064,1,\"エーカー\"],[13065,1,\"オンス\"],[13066,1,\"オーム\"],[13067,1,\"カイリ\"],[13068,1,\"カラット\"],[13069,1,\"カロリー\"],[13070,1,\"ガロン\"],[13071,1,\"ガンマ\"],[13072,1,\"ギガ\"],[13073,1,\"ギニー\"],[13074,1,\"キュリー\"],[13075,1,\"ギルダー\"],[13076,1,\"キロ\"],[13077,1,\"キログラム\"],[13078,1,\"キロメートル\"],[13079,1,\"キロワット\"],[13080,1,\"グラム\"],[13081,1,\"グラムトン\"],[13082,1,\"クルゼイロ\"],[13083,1,\"クローネ\"],[13084,1,\"ケース\"],[13085,1,\"コルナ\"],[13086,1,\"コーポ\"],[13087,1,\"サイクル\"],[13088,1,\"サンチーム\"],[13089,1,\"シリング\"],[13090,1,\"センチ\"],[13091,1,\"セント\"],[13092,1,\"ダース\"],[13093,1,\"デシ\"],[13094,1,\"ドル\"],[13095,1,\"トン\"],[13096,1,\"ナノ\"],[13097,1,\"ノット\"],[13098,1,\"ハイツ\"],[13099,1,\"パーセント\"],[13100,1,\"パーツ\"],[13101,1,\"バーレル\"],[13102,1,\"ピアストル\"],[13103,1,\"ピクル\"],[13104,1,\"ピコ\"],[13105,1,\"ビル\"],[13106,1,\"ファラッド\"],[13107,1,\"フィート\"],[13108,1,\"ブッシェル\"],[13109,1,\"フラン\"],[13110,1,\"ヘクタール\"],[13111,1,\"ペソ\"],[13112,1,\"ペニヒ\"],[13113,1,\"ヘルツ\"],[13114,1,\"ペンス\"],[13115,1,\"ページ\"],[13116,1,\"ベータ\"],[13117,1,\"ポイント\"],[13118,1,\"ボルト\"],[13119,1,\"ホン\"],[13120,1,\"ポンド\"],[13121,1,\"ホール\"],[13122,1,\"ホーン\"],[13123,1,\"マイクロ\"],[13124,1,\"マイル\"],[13125,1,\"マッハ\"],[13126,1,\"マルク\"],[13127,1,\"マンション\"],[13128,1,\"ミクロン\"],[13129,1,\"ミリ\"],[13130,1,\"ミリバール\"],[13131,1,\"メガ\"],[13132,1,\"メガトン\"],[13133,1,\"メートル\"],[13134,1,\"ヤード\"],[13135,1,\"ヤール\"],[13136,1,\"ユアン\"],[13137,1,\"リットル\"],[13138,1,\"リラ\"],[13139,1,\"ルピー\"],[13140,1,\"ルーブル\"],[13141,1,\"レム\"],[13142,1,\"レントゲン\"],[13143,1,\"ワット\"],[13144,1,\"0点\"],[13145,1,\"1点\"],[13146,1,\"2点\"],[13147,1,\"3点\"],[13148,1,\"4点\"],[13149,1,\"5点\"],[13150,1,\"6点\"],[13151,1,\"7点\"],[13152,1,\"8点\"],[13153,1,\"9点\"],[13154,1,\"10点\"],[13155,1,\"11点\"],[13156,1,\"12点\"],[13157,1,\"13点\"],[13158,1,\"14点\"],[13159,1,\"15点\"],[13160,1,\"16点\"],[13161,1,\"17点\"],[13162,1,\"18点\"],[13163,1,\"19点\"],[13164,1,\"20点\"],[13165,1,\"21点\"],[13166,1,\"22点\"],[13167,1,\"23点\"],[13168,1,\"24点\"],[13169,1,\"hpa\"],[13170,1,\"da\"],[13171,1,\"au\"],[13172,1,\"bar\"],[13173,1,\"ov\"],[13174,1,\"pc\"],[13175,1,\"dm\"],[13176,1,\"dm2\"],[13177,1,\"dm3\"],[13178,1,\"iu\"],[13179,1,\"平成\"],[13180,1,\"昭和\"],[13181,1,\"大正\"],[13182,1,\"明治\"],[13183,1,\"株式会社\"],[13184,1,\"pa\"],[13185,1,\"na\"],[13186,1,\"μa\"],[13187,1,\"ma\"],[13188,1,\"ka\"],[13189,1,\"kb\"],[13190,1,\"mb\"],[13191,1,\"gb\"],[13192,1,\"cal\"],[13193,1,\"kcal\"],[13194,1,\"pf\"],[13195,1,\"nf\"],[13196,1,\"μf\"],[13197,1,\"μg\"],[13198,1,\"mg\"],[13199,1,\"kg\"],[13200,1,\"hz\"],[13201,1,\"khz\"],[13202,1,\"mhz\"],[13203,1,\"ghz\"],[13204,1,\"thz\"],[13205,1,\"μl\"],[13206,1,\"ml\"],[13207,1,\"dl\"],[13208,1,\"kl\"],[13209,1,\"fm\"],[13210,1,\"nm\"],[13211,1,\"μm\"],[13212,1,\"mm\"],[13213,1,\"cm\"],[13214,1,\"km\"],[13215,1,\"mm2\"],[13216,1,\"cm2\"],[13217,1,\"m2\"],[13218,1,\"km2\"],[13219,1,\"mm3\"],[13220,1,\"cm3\"],[13221,1,\"m3\"],[13222,1,\"km3\"],[13223,1,\"m∕s\"],[13224,1,\"m∕s2\"],[13225,1,\"pa\"],[13226,1,\"kpa\"],[13227,1,\"mpa\"],[13228,1,\"gpa\"],[13229,1,\"rad\"],[13230,1,\"rad∕s\"],[13231,1,\"rad∕s2\"],[13232,1,\"ps\"],[13233,1,\"ns\"],[13234,1,\"μs\"],[13235,1,\"ms\"],[13236,1,\"pv\"],[13237,1,\"nv\"],[13238,1,\"μv\"],[13239,1,\"mv\"],[13240,1,\"kv\"],[13241,1,\"mv\"],[13242,1,\"pw\"],[13243,1,\"nw\"],[13244,1,\"μw\"],[13245,1,\"mw\"],[13246,1,\"kw\"],[13247,1,\"mw\"],[13248,1,\"kω\"],[13249,1,\"mω\"],[13250,3],[13251,1,\"bq\"],[13252,1,\"cc\"],[13253,1,\"cd\"],[13254,1,\"c∕kg\"],[13255,3],[13256,1,\"db\"],[13257,1,\"gy\"],[13258,1,\"ha\"],[13259,1,\"hp\"],[13260,1,\"in\"],[13261,1,\"kk\"],[13262,1,\"km\"],[13263,1,\"kt\"],[13264,1,\"lm\"],[13265,1,\"ln\"],[13266,1,\"log\"],[13267,1,\"lx\"],[13268,1,\"mb\"],[13269,1,\"mil\"],[13270,1,\"mol\"],[13271,1,\"ph\"],[13272,3],[13273,1,\"ppm\"],[13274,1,\"pr\"],[13275,1,\"sr\"],[13276,1,\"sv\"],[13277,1,\"wb\"],[13278,1,\"v∕m\"],[13279,1,\"a∕m\"],[13280,1,\"1日\"],[13281,1,\"2日\"],[13282,1,\"3日\"],[13283,1,\"4日\"],[13284,1,\"5日\"],[13285,1,\"6日\"],[13286,1,\"7日\"],[13287,1,\"8日\"],[13288,1,\"9日\"],[13289,1,\"10日\"],[13290,1,\"11日\"],[13291,1,\"12日\"],[13292,1,\"13日\"],[13293,1,\"14日\"],[13294,1,\"15日\"],[13295,1,\"16日\"],[13296,1,\"17日\"],[13297,1,\"18日\"],[13298,1,\"19日\"],[13299,1,\"20日\"],[13300,1,\"21日\"],[13301,1,\"22日\"],[13302,1,\"23日\"],[13303,1,\"24日\"],[13304,1,\"25日\"],[13305,1,\"26日\"],[13306,1,\"27日\"],[13307,1,\"28日\"],[13308,1,\"29日\"],[13309,1,\"30日\"],[13310,1,\"31日\"],[13311,1,\"gal\"],[[13312,19893],2],[[19894,19903],3],[[19904,19967],2],[[19968,40869],2],[[40870,40891],2],[[40892,40899],2],[[40900,40907],2],[40908,2],[[40909,40917],2],[[40918,40938],2],[[40939,40943],2],[[40944,40959],3],[[40960,42124],2],[[42125,42127],3],[[42128,42145],2],[[42146,42147],2],[[42148,42163],2],[42164,2],[[42165,42176],2],[42177,2],[[42178,42180],2],[42181,2],[42182,2],[[42183,42191],3],[[42192,42237],2],[[42238,42239],2],[[42240,42508],2],[[42509,42511],2],[[42512,42539],2],[[42540,42559],3],[42560,1,\"ꙁ\"],[42561,2],[42562,1,\"ꙃ\"],[42563,2],[42564,1,\"ꙅ\"],[42565,2],[42566,1,\"ꙇ\"],[42567,2],[42568,1,\"ꙉ\"],[42569,2],[42570,1,\"ꙋ\"],[42571,2],[42572,1,\"ꙍ\"],[42573,2],[42574,1,\"ꙏ\"],[42575,2],[42576,1,\"ꙑ\"],[42577,2],[42578,1,\"ꙓ\"],[42579,2],[42580,1,\"ꙕ\"],[42581,2],[42582,1,\"ꙗ\"],[42583,2],[42584,1,\"ꙙ\"],[42585,2],[42586,1,\"ꙛ\"],[42587,2],[42588,1,\"ꙝ\"],[42589,2],[42590,1,\"ꙟ\"],[42591,2],[42592,1,\"ꙡ\"],[42593,2],[42594,1,\"ꙣ\"],[42595,2],[42596,1,\"ꙥ\"],[42597,2],[42598,1,\"ꙧ\"],[42599,2],[42600,1,\"ꙩ\"],[42601,2],[42602,1,\"ꙫ\"],[42603,2],[42604,1,\"ꙭ\"],[[42605,42607],2],[[42608,42611],2],[[42612,42619],2],[[42620,42621],2],[42622,2],[42623,2],[42624,1,\"ꚁ\"],[42625,2],[42626,1,\"ꚃ\"],[42627,2],[42628,1,\"ꚅ\"],[42629,2],[42630,1,\"ꚇ\"],[42631,2],[42632,1,\"ꚉ\"],[42633,2],[42634,1,\"ꚋ\"],[42635,2],[42636,1,\"ꚍ\"],[42637,2],[42638,1,\"ꚏ\"],[42639,2],[42640,1,\"ꚑ\"],[42641,2],[42642,1,\"ꚓ\"],[42643,2],[42644,1,\"ꚕ\"],[42645,2],[42646,1,\"ꚗ\"],[42647,2],[42648,1,\"ꚙ\"],[42649,2],[42650,1,\"ꚛ\"],[42651,2],[42652,1,\"ъ\"],[42653,1,\"ь\"],[42654,2],[42655,2],[[42656,42725],2],[[42726,42735],2],[[42736,42737],2],[[42738,42743],2],[[42744,42751],3],[[42752,42774],2],[[42775,42778],2],[[42779,42783],2],[[42784,42785],2],[42786,1,\"ꜣ\"],[42787,2],[42788,1,\"ꜥ\"],[42789,2],[42790,1,\"ꜧ\"],[42791,2],[42792,1,\"ꜩ\"],[42793,2],[42794,1,\"ꜫ\"],[42795,2],[42796,1,\"ꜭ\"],[42797,2],[42798,1,\"ꜯ\"],[[42799,42801],2],[42802,1,\"ꜳ\"],[42803,2],[42804,1,\"ꜵ\"],[42805,2],[42806,1,\"ꜷ\"],[42807,2],[42808,1,\"ꜹ\"],[42809,2],[42810,1,\"ꜻ\"],[42811,2],[42812,1,\"ꜽ\"],[42813,2],[42814,1,\"ꜿ\"],[42815,2],[42816,1,\"ꝁ\"],[42817,2],[42818,1,\"ꝃ\"],[42819,2],[42820,1,\"ꝅ\"],[42821,2],[42822,1,\"ꝇ\"],[42823,2],[42824,1,\"ꝉ\"],[42825,2],[42826,1,\"ꝋ\"],[42827,2],[42828,1,\"ꝍ\"],[42829,2],[42830,1,\"ꝏ\"],[42831,2],[42832,1,\"ꝑ\"],[42833,2],[42834,1,\"ꝓ\"],[42835,2],[42836,1,\"ꝕ\"],[42837,2],[42838,1,\"ꝗ\"],[42839,2],[42840,1,\"ꝙ\"],[42841,2],[42842,1,\"ꝛ\"],[42843,2],[42844,1,\"ꝝ\"],[42845,2],[42846,1,\"ꝟ\"],[42847,2],[42848,1,\"ꝡ\"],[42849,2],[42850,1,\"ꝣ\"],[42851,2],[42852,1,\"ꝥ\"],[42853,2],[42854,1,\"ꝧ\"],[42855,2],[42856,1,\"ꝩ\"],[42857,2],[42858,1,\"ꝫ\"],[42859,2],[42860,1,\"ꝭ\"],[42861,2],[42862,1,\"ꝯ\"],[42863,2],[42864,1,\"ꝯ\"],[[42865,42872],2],[42873,1,\"ꝺ\"],[42874,2],[42875,1,\"ꝼ\"],[42876,2],[42877,1,\"ᵹ\"],[42878,1,\"ꝿ\"],[42879,2],[42880,1,\"ꞁ\"],[42881,2],[42882,1,\"ꞃ\"],[42883,2],[42884,1,\"ꞅ\"],[42885,2],[42886,1,\"ꞇ\"],[[42887,42888],2],[[42889,42890],2],[42891,1,\"ꞌ\"],[42892,2],[42893,1,\"ɥ\"],[42894,2],[42895,2],[42896,1,\"ꞑ\"],[42897,2],[42898,1,\"ꞓ\"],[42899,2],[[42900,42901],2],[42902,1,\"ꞗ\"],[42903,2],[42904,1,\"ꞙ\"],[42905,2],[42906,1,\"ꞛ\"],[42907,2],[42908,1,\"ꞝ\"],[42909,2],[42910,1,\"ꞟ\"],[42911,2],[42912,1,\"ꞡ\"],[42913,2],[42914,1,\"ꞣ\"],[42915,2],[42916,1,\"ꞥ\"],[42917,2],[42918,1,\"ꞧ\"],[42919,2],[42920,1,\"ꞩ\"],[42921,2],[42922,1,\"ɦ\"],[42923,1,\"ɜ\"],[42924,1,\"ɡ\"],[42925,1,\"ɬ\"],[42926,1,\"ɪ\"],[42927,2],[42928,1,\"ʞ\"],[42929,1,\"ʇ\"],[42930,1,\"ʝ\"],[42931,1,\"ꭓ\"],[42932,1,\"ꞵ\"],[42933,2],[42934,1,\"ꞷ\"],[42935,2],[42936,1,\"ꞹ\"],[42937,2],[42938,1,\"ꞻ\"],[42939,2],[42940,1,\"ꞽ\"],[42941,2],[42942,1,\"ꞿ\"],[42943,2],[[42944,42945],3],[42946,1,\"ꟃ\"],[42947,2],[42948,1,\"ꞔ\"],[42949,1,\"ʂ\"],[42950,1,\"ᶎ\"],[[42951,42998],3],[42999,2],[43000,1,\"ħ\"],[43001,1,\"œ\"],[43002,2],[[43003,43007],2],[[43008,43047],2],[[43048,43051],2],[[43052,43055],3],[[43056,43065],2],[[43066,43071],3],[[43072,43123],2],[[43124,43127],2],[[43128,43135],3],[[43136,43204],2],[43205,2],[[43206,43213],3],[[43214,43215],2],[[43216,43225],2],[[43226,43231],3],[[43232,43255],2],[[43256,43258],2],[43259,2],[43260,2],[43261,2],[[43262,43263],2],[[43264,43309],2],[[43310,43311],2],[[43312,43347],2],[[43348,43358],3],[43359,2],[[43360,43388],2],[[43389,43391],3],[[43392,43456],2],[[43457,43469],2],[43470,3],[[43471,43481],2],[[43482,43485],3],[[43486,43487],2],[[43488,43518],2],[43519,3],[[43520,43574],2],[[43575,43583],3],[[43584,43597],2],[[43598,43599],3],[[43600,43609],2],[[43610,43611],3],[[43612,43615],2],[[43616,43638],2],[[43639,43641],2],[[43642,43643],2],[[43644,43647],2],[[43648,43714],2],[[43715,43738],3],[[43739,43741],2],[[43742,43743],2],[[43744,43759],2],[[43760,43761],2],[[43762,43766],2],[[43767,43776],3],[[43777,43782],2],[[43783,43784],3],[[43785,43790],2],[[43791,43792],3],[[43793,43798],2],[[43799,43807],3],[[43808,43814],2],[43815,3],[[43816,43822],2],[43823,3],[[43824,43866],2],[43867,2],[43868,1,\"ꜧ\"],[43869,1,\"ꬷ\"],[43870,1,\"ɫ\"],[43871,1,\"ꭒ\"],[[43872,43875],2],[[43876,43877],2],[[43878,43879],2],[[43880,43887],3],[43888,1,\"Ꭰ\"],[43889,1,\"Ꭱ\"],[43890,1,\"Ꭲ\"],[43891,1,\"Ꭳ\"],[43892,1,\"Ꭴ\"],[43893,1,\"Ꭵ\"],[43894,1,\"Ꭶ\"],[43895,1,\"Ꭷ\"],[43896,1,\"Ꭸ\"],[43897,1,\"Ꭹ\"],[43898,1,\"Ꭺ\"],[43899,1,\"Ꭻ\"],[43900,1,\"Ꭼ\"],[43901,1,\"Ꭽ\"],[43902,1,\"Ꭾ\"],[43903,1,\"Ꭿ\"],[43904,1,\"Ꮀ\"],[43905,1,\"Ꮁ\"],[43906,1,\"Ꮂ\"],[43907,1,\"Ꮃ\"],[43908,1,\"Ꮄ\"],[43909,1,\"Ꮅ\"],[43910,1,\"Ꮆ\"],[43911,1,\"Ꮇ\"],[43912,1,\"Ꮈ\"],[43913,1,\"Ꮉ\"],[43914,1,\"Ꮊ\"],[43915,1,\"Ꮋ\"],[43916,1,\"Ꮌ\"],[43917,1,\"Ꮍ\"],[43918,1,\"Ꮎ\"],[43919,1,\"Ꮏ\"],[43920,1,\"Ꮐ\"],[43921,1,\"Ꮑ\"],[43922,1,\"Ꮒ\"],[43923,1,\"Ꮓ\"],[43924,1,\"Ꮔ\"],[43925,1,\"Ꮕ\"],[43926,1,\"Ꮖ\"],[43927,1,\"Ꮗ\"],[43928,1,\"Ꮘ\"],[43929,1,\"Ꮙ\"],[43930,1,\"Ꮚ\"],[43931,1,\"Ꮛ\"],[43932,1,\"Ꮜ\"],[43933,1,\"Ꮝ\"],[43934,1,\"Ꮞ\"],[43935,1,\"Ꮟ\"],[43936,1,\"Ꮠ\"],[43937,1,\"Ꮡ\"],[43938,1,\"Ꮢ\"],[43939,1,\"Ꮣ\"],[43940,1,\"Ꮤ\"],[43941,1,\"Ꮥ\"],[43942,1,\"Ꮦ\"],[43943,1,\"Ꮧ\"],[43944,1,\"Ꮨ\"],[43945,1,\"Ꮩ\"],[43946,1,\"Ꮪ\"],[43947,1,\"Ꮫ\"],[43948,1,\"Ꮬ\"],[43949,1,\"Ꮭ\"],[43950,1,\"Ꮮ\"],[43951,1,\"Ꮯ\"],[43952,1,\"Ꮰ\"],[43953,1,\"Ꮱ\"],[43954,1,\"Ꮲ\"],[43955,1,\"Ꮳ\"],[43956,1,\"Ꮴ\"],[43957,1,\"Ꮵ\"],[43958,1,\"Ꮶ\"],[43959,1,\"Ꮷ\"],[43960,1,\"Ꮸ\"],[43961,1,\"Ꮹ\"],[43962,1,\"Ꮺ\"],[43963,1,\"Ꮻ\"],[43964,1,\"Ꮼ\"],[43965,1,\"Ꮽ\"],[43966,1,\"Ꮾ\"],[43967,1,\"Ꮿ\"],[[43968,44010],2],[44011,2],[[44012,44013],2],[[44014,44015],3],[[44016,44025],2],[[44026,44031],3],[[44032,55203],2],[[55204,55215],3],[[55216,55238],2],[[55239,55242],3],[[55243,55291],2],[[55292,55295],3],[[55296,57343],3],[[57344,63743],3],[63744,1,\"豈\"],[63745,1,\"更\"],[63746,1,\"車\"],[63747,1,\"賈\"],[63748,1,\"滑\"],[63749,1,\"串\"],[63750,1,\"句\"],[[63751,63752],1,\"龜\"],[63753,1,\"契\"],[63754,1,\"金\"],[63755,1,\"喇\"],[63756,1,\"奈\"],[63757,1,\"懶\"],[63758,1,\"癩\"],[63759,1,\"羅\"],[63760,1,\"蘿\"],[63761,1,\"螺\"],[63762,1,\"裸\"],[63763,1,\"邏\"],[63764,1,\"樂\"],[63765,1,\"洛\"],[63766,1,\"烙\"],[63767,1,\"珞\"],[63768,1,\"落\"],[63769,1,\"酪\"],[63770,1,\"駱\"],[63771,1,\"亂\"],[63772,1,\"卵\"],[63773,1,\"欄\"],[63774,1,\"爛\"],[63775,1,\"蘭\"],[63776,1,\"鸞\"],[63777,1,\"嵐\"],[63778,1,\"濫\"],[63779,1,\"藍\"],[63780,1,\"襤\"],[63781,1,\"拉\"],[63782,1,\"臘\"],[63783,1,\"蠟\"],[63784,1,\"廊\"],[63785,1,\"朗\"],[63786,1,\"浪\"],[63787,1,\"狼\"],[63788,1,\"郎\"],[63789,1,\"來\"],[63790,1,\"冷\"],[63791,1,\"勞\"],[63792,1,\"擄\"],[63793,1,\"櫓\"],[63794,1,\"爐\"],[63795,1,\"盧\"],[63796,1,\"老\"],[63797,1,\"蘆\"],[63798,1,\"虜\"],[63799,1,\"路\"],[63800,1,\"露\"],[63801,1,\"魯\"],[63802,1,\"鷺\"],[63803,1,\"碌\"],[63804,1,\"祿\"],[63805,1,\"綠\"],[63806,1,\"菉\"],[63807,1,\"錄\"],[63808,1,\"鹿\"],[63809,1,\"論\"],[63810,1,\"壟\"],[63811,1,\"弄\"],[63812,1,\"籠\"],[63813,1,\"聾\"],[63814,1,\"牢\"],[63815,1,\"磊\"],[63816,1,\"賂\"],[63817,1,\"雷\"],[63818,1,\"壘\"],[63819,1,\"屢\"],[63820,1,\"樓\"],[63821,1,\"淚\"],[63822,1,\"漏\"],[63823,1,\"累\"],[63824,1,\"縷\"],[63825,1,\"陋\"],[63826,1,\"勒\"],[63827,1,\"肋\"],[63828,1,\"凜\"],[63829,1,\"凌\"],[63830,1,\"稜\"],[63831,1,\"綾\"],[63832,1,\"菱\"],[63833,1,\"陵\"],[63834,1,\"讀\"],[63835,1,\"拏\"],[63836,1,\"樂\"],[63837,1,\"諾\"],[63838,1,\"丹\"],[63839,1,\"寧\"],[63840,1,\"怒\"],[63841,1,\"率\"],[63842,1,\"異\"],[63843,1,\"北\"],[63844,1,\"磻\"],[63845,1,\"便\"],[63846,1,\"復\"],[63847,1,\"不\"],[63848,1,\"泌\"],[63849,1,\"數\"],[63850,1,\"索\"],[63851,1,\"參\"],[63852,1,\"塞\"],[63853,1,\"省\"],[63854,1,\"葉\"],[63855,1,\"說\"],[63856,1,\"殺\"],[63857,1,\"辰\"],[63858,1,\"沈\"],[63859,1,\"拾\"],[63860,1,\"若\"],[63861,1,\"掠\"],[63862,1,\"略\"],[63863,1,\"亮\"],[63864,1,\"兩\"],[63865,1,\"凉\"],[63866,1,\"梁\"],[63867,1,\"糧\"],[63868,1,\"良\"],[63869,1,\"諒\"],[63870,1,\"量\"],[63871,1,\"勵\"],[63872,1,\"呂\"],[63873,1,\"女\"],[63874,1,\"廬\"],[63875,1,\"旅\"],[63876,1,\"濾\"],[63877,1,\"礪\"],[63878,1,\"閭\"],[63879,1,\"驪\"],[63880,1,\"麗\"],[63881,1,\"黎\"],[63882,1,\"力\"],[63883,1,\"曆\"],[63884,1,\"歷\"],[63885,1,\"轢\"],[63886,1,\"年\"],[63887,1,\"憐\"],[63888,1,\"戀\"],[63889,1,\"撚\"],[63890,1,\"漣\"],[63891,1,\"煉\"],[63892,1,\"璉\"],[63893,1,\"秊\"],[63894,1,\"練\"],[63895,1,\"聯\"],[63896,1,\"輦\"],[63897,1,\"蓮\"],[63898,1,\"連\"],[63899,1,\"鍊\"],[63900,1,\"列\"],[63901,1,\"劣\"],[63902,1,\"咽\"],[63903,1,\"烈\"],[63904,1,\"裂\"],[63905,1,\"說\"],[63906,1,\"廉\"],[63907,1,\"念\"],[63908,1,\"捻\"],[63909,1,\"殮\"],[63910,1,\"簾\"],[63911,1,\"獵\"],[63912,1,\"令\"],[63913,1,\"囹\"],[63914,1,\"寧\"],[63915,1,\"嶺\"],[63916,1,\"怜\"],[63917,1,\"玲\"],[63918,1,\"瑩\"],[63919,1,\"羚\"],[63920,1,\"聆\"],[63921,1,\"鈴\"],[63922,1,\"零\"],[63923,1,\"靈\"],[63924,1,\"領\"],[63925,1,\"例\"],[63926,1,\"禮\"],[63927,1,\"醴\"],[63928,1,\"隸\"],[63929,1,\"惡\"],[63930,1,\"了\"],[63931,1,\"僚\"],[63932,1,\"寮\"],[63933,1,\"尿\"],[63934,1,\"料\"],[63935,1,\"樂\"],[63936,1,\"燎\"],[63937,1,\"療\"],[63938,1,\"蓼\"],[63939,1,\"遼\"],[63940,1,\"龍\"],[63941,1,\"暈\"],[63942,1,\"阮\"],[63943,1,\"劉\"],[63944,1,\"杻\"],[63945,1,\"柳\"],[63946,1,\"流\"],[63947,1,\"溜\"],[63948,1,\"琉\"],[63949,1,\"留\"],[63950,1,\"硫\"],[63951,1,\"紐\"],[63952,1,\"類\"],[63953,1,\"六\"],[63954,1,\"戮\"],[63955,1,\"陸\"],[63956,1,\"倫\"],[63957,1,\"崙\"],[63958,1,\"淪\"],[63959,1,\"輪\"],[63960,1,\"律\"],[63961,1,\"慄\"],[63962,1,\"栗\"],[63963,1,\"率\"],[63964,1,\"隆\"],[63965,1,\"利\"],[63966,1,\"吏\"],[63967,1,\"履\"],[63968,1,\"易\"],[63969,1,\"李\"],[63970,1,\"梨\"],[63971,1,\"泥\"],[63972,1,\"理\"],[63973,1,\"痢\"],[63974,1,\"罹\"],[63975,1,\"裏\"],[63976,1,\"裡\"],[63977,1,\"里\"],[63978,1,\"離\"],[63979,1,\"匿\"],[63980,1,\"溺\"],[63981,1,\"吝\"],[63982,1,\"燐\"],[63983,1,\"璘\"],[63984,1,\"藺\"],[63985,1,\"隣\"],[63986,1,\"鱗\"],[63987,1,\"麟\"],[63988,1,\"林\"],[63989,1,\"淋\"],[63990,1,\"臨\"],[63991,1,\"立\"],[63992,1,\"笠\"],[63993,1,\"粒\"],[63994,1,\"狀\"],[63995,1,\"炙\"],[63996,1,\"識\"],[63997,1,\"什\"],[63998,1,\"茶\"],[63999,1,\"刺\"],[64000,1,\"切\"],[64001,1,\"度\"],[64002,1,\"拓\"],[64003,1,\"糖\"],[64004,1,\"宅\"],[64005,1,\"洞\"],[64006,1,\"暴\"],[64007,1,\"輻\"],[64008,1,\"行\"],[64009,1,\"降\"],[64010,1,\"見\"],[64011,1,\"廓\"],[64012,1,\"兀\"],[64013,1,\"嗀\"],[[64014,64015],2],[64016,1,\"塚\"],[64017,2],[64018,1,\"晴\"],[[64019,64020],2],[64021,1,\"凞\"],[64022,1,\"猪\"],[64023,1,\"益\"],[64024,1,\"礼\"],[64025,1,\"神\"],[64026,1,\"祥\"],[64027,1,\"福\"],[64028,1,\"靖\"],[64029,1,\"精\"],[64030,1,\"羽\"],[64031,2],[64032,1,\"蘒\"],[64033,2],[64034,1,\"諸\"],[[64035,64036],2],[64037,1,\"逸\"],[64038,1,\"都\"],[[64039,64041],2],[64042,1,\"飯\"],[64043,1,\"飼\"],[64044,1,\"館\"],[64045,1,\"鶴\"],[64046,1,\"郞\"],[64047,1,\"隷\"],[64048,1,\"侮\"],[64049,1,\"僧\"],[64050,1,\"免\"],[64051,1,\"勉\"],[64052,1,\"勤\"],[64053,1,\"卑\"],[64054,1,\"喝\"],[64055,1,\"嘆\"],[64056,1,\"器\"],[64057,1,\"塀\"],[64058,1,\"墨\"],[64059,1,\"層\"],[64060,1,\"屮\"],[64061,1,\"悔\"],[64062,1,\"慨\"],[64063,1,\"憎\"],[64064,1,\"懲\"],[64065,1,\"敏\"],[64066,1,\"既\"],[64067,1,\"暑\"],[64068,1,\"梅\"],[64069,1,\"海\"],[64070,1,\"渚\"],[64071,1,\"漢\"],[64072,1,\"煮\"],[64073,1,\"爫\"],[64074,1,\"琢\"],[64075,1,\"碑\"],[64076,1,\"社\"],[64077,1,\"祉\"],[64078,1,\"祈\"],[64079,1,\"祐\"],[64080,1,\"祖\"],[64081,1,\"祝\"],[64082,1,\"禍\"],[64083,1,\"禎\"],[64084,1,\"穀\"],[64085,1,\"突\"],[64086,1,\"節\"],[64087,1,\"練\"],[64088,1,\"縉\"],[64089,1,\"繁\"],[64090,1,\"署\"],[64091,1,\"者\"],[64092,1,\"臭\"],[[64093,64094],1,\"艹\"],[64095,1,\"著\"],[64096,1,\"褐\"],[64097,1,\"視\"],[64098,1,\"謁\"],[64099,1,\"謹\"],[64100,1,\"賓\"],[64101,1,\"贈\"],[64102,1,\"辶\"],[64103,1,\"逸\"],[64104,1,\"難\"],[64105,1,\"響\"],[64106,1,\"頻\"],[64107,1,\"恵\"],[64108,1,\"𤋮\"],[64109,1,\"舘\"],[[64110,64111],3],[64112,1,\"並\"],[64113,1,\"况\"],[64114,1,\"全\"],[64115,1,\"侀\"],[64116,1,\"充\"],[64117,1,\"冀\"],[64118,1,\"勇\"],[64119,1,\"勺\"],[64120,1,\"喝\"],[64121,1,\"啕\"],[64122,1,\"喙\"],[64123,1,\"嗢\"],[64124,1,\"塚\"],[64125,1,\"墳\"],[64126,1,\"奄\"],[64127,1,\"奔\"],[64128,1,\"婢\"],[64129,1,\"嬨\"],[64130,1,\"廒\"],[64131,1,\"廙\"],[64132,1,\"彩\"],[64133,1,\"徭\"],[64134,1,\"惘\"],[64135,1,\"慎\"],[64136,1,\"愈\"],[64137,1,\"憎\"],[64138,1,\"慠\"],[64139,1,\"懲\"],[64140,1,\"戴\"],[64141,1,\"揄\"],[64142,1,\"搜\"],[64143,1,\"摒\"],[64144,1,\"敖\"],[64145,1,\"晴\"],[64146,1,\"朗\"],[64147,1,\"望\"],[64148,1,\"杖\"],[64149,1,\"歹\"],[64150,1,\"殺\"],[64151,1,\"流\"],[64152,1,\"滛\"],[64153,1,\"滋\"],[64154,1,\"漢\"],[64155,1,\"瀞\"],[64156,1,\"煮\"],[64157,1,\"瞧\"],[64158,1,\"爵\"],[64159,1,\"犯\"],[64160,1,\"猪\"],[64161,1,\"瑱\"],[64162,1,\"甆\"],[64163,1,\"画\"],[64164,1,\"瘝\"],[64165,1,\"瘟\"],[64166,1,\"益\"],[64167,1,\"盛\"],[64168,1,\"直\"],[64169,1,\"睊\"],[64170,1,\"着\"],[64171,1,\"磌\"],[64172,1,\"窱\"],[64173,1,\"節\"],[64174,1,\"类\"],[64175,1,\"絛\"],[64176,1,\"練\"],[64177,1,\"缾\"],[64178,1,\"者\"],[64179,1,\"荒\"],[64180,1,\"華\"],[64181,1,\"蝹\"],[64182,1,\"襁\"],[64183,1,\"覆\"],[64184,1,\"視\"],[64185,1,\"調\"],[64186,1,\"諸\"],[64187,1,\"請\"],[64188,1,\"謁\"],[64189,1,\"諾\"],[64190,1,\"諭\"],[64191,1,\"謹\"],[64192,1,\"變\"],[64193,1,\"贈\"],[64194,1,\"輸\"],[64195,1,\"遲\"],[64196,1,\"醙\"],[64197,1,\"鉶\"],[64198,1,\"陼\"],[64199,1,\"難\"],[64200,1,\"靖\"],[64201,1,\"韛\"],[64202,1,\"響\"],[64203,1,\"頋\"],[64204,1,\"頻\"],[64205,1,\"鬒\"],[64206,1,\"龜\"],[64207,1,\"𢡊\"],[64208,1,\"𢡄\"],[64209,1,\"𣏕\"],[64210,1,\"㮝\"],[64211,1,\"䀘\"],[64212,1,\"䀹\"],[64213,1,\"𥉉\"],[64214,1,\"𥳐\"],[64215,1,\"𧻓\"],[64216,1,\"齃\"],[64217,1,\"龎\"],[[64218,64255],3],[64256,1,\"ff\"],[64257,1,\"fi\"],[64258,1,\"fl\"],[64259,1,\"ffi\"],[64260,1,\"ffl\"],[[64261,64262],1,\"st\"],[[64263,64274],3],[64275,1,\"մն\"],[64276,1,\"մե\"],[64277,1,\"մի\"],[64278,1,\"վն\"],[64279,1,\"մխ\"],[[64280,64284],3],[64285,1,\"יִ\"],[64286,2],[64287,1,\"ײַ\"],[64288,1,\"ע\"],[64289,1,\"א\"],[64290,1,\"ד\"],[64291,1,\"ה\"],[64292,1,\"כ\"],[64293,1,\"ל\"],[64294,1,\"ם\"],[64295,1,\"ר\"],[64296,1,\"ת\"],[64297,5,\"+\"],[64298,1,\"שׁ\"],[64299,1,\"שׂ\"],[64300,1,\"שּׁ\"],[64301,1,\"שּׂ\"],[64302,1,\"אַ\"],[64303,1,\"אָ\"],[64304,1,\"אּ\"],[64305,1,\"בּ\"],[64306,1,\"גּ\"],[64307,1,\"דּ\"],[64308,1,\"הּ\"],[64309,1,\"וּ\"],[64310,1,\"זּ\"],[64311,3],[64312,1,\"טּ\"],[64313,1,\"יּ\"],[64314,1,\"ךּ\"],[64315,1,\"כּ\"],[64316,1,\"לּ\"],[64317,3],[64318,1,\"מּ\"],[64319,3],[64320,1,\"נּ\"],[64321,1,\"סּ\"],[64322,3],[64323,1,\"ףּ\"],[64324,1,\"פּ\"],[64325,3],[64326,1,\"צּ\"],[64327,1,\"קּ\"],[64328,1,\"רּ\"],[64329,1,\"שּ\"],[64330,1,\"תּ\"],[64331,1,\"וֹ\"],[64332,1,\"בֿ\"],[64333,1,\"כֿ\"],[64334,1,\"פֿ\"],[64335,1,\"אל\"],[[64336,64337],1,\"ٱ\"],[[64338,64341],1,\"ٻ\"],[[64342,64345],1,\"پ\"],[[64346,64349],1,\"ڀ\"],[[64350,64353],1,\"ٺ\"],[[64354,64357],1,\"ٿ\"],[[64358,64361],1,\"ٹ\"],[[64362,64365],1,\"ڤ\"],[[64366,64369],1,\"ڦ\"],[[64370,64373],1,\"ڄ\"],[[64374,64377],1,\"ڃ\"],[[64378,64381],1,\"چ\"],[[64382,64385],1,\"ڇ\"],[[64386,64387],1,\"ڍ\"],[[64388,64389],1,\"ڌ\"],[[64390,64391],1,\"ڎ\"],[[64392,64393],1,\"ڈ\"],[[64394,64395],1,\"ژ\"],[[64396,64397],1,\"ڑ\"],[[64398,64401],1,\"ک\"],[[64402,64405],1,\"گ\"],[[64406,64409],1,\"ڳ\"],[[64410,64413],1,\"ڱ\"],[[64414,64415],1,\"ں\"],[[64416,64419],1,\"ڻ\"],[[64420,64421],1,\"ۀ\"],[[64422,64425],1,\"ہ\"],[[64426,64429],1,\"ھ\"],[[64430,64431],1,\"ے\"],[[64432,64433],1,\"ۓ\"],[[64434,64449],2],[[64450,64466],3],[[64467,64470],1,\"ڭ\"],[[64471,64472],1,\"ۇ\"],[[64473,64474],1,\"ۆ\"],[[64475,64476],1,\"ۈ\"],[64477,1,\"ۇٴ\"],[[64478,64479],1,\"ۋ\"],[[64480,64481],1,\"ۅ\"],[[64482,64483],1,\"ۉ\"],[[64484,64487],1,\"ې\"],[[64488,64489],1,\"ى\"],[[64490,64491],1,\"ئا\"],[[64492,64493],1,\"ئە\"],[[64494,64495],1,\"ئو\"],[[64496,64497],1,\"ئۇ\"],[[64498,64499],1,\"ئۆ\"],[[64500,64501],1,\"ئۈ\"],[[64502,64504],1,\"ئې\"],[[64505,64507],1,\"ئى\"],[[64508,64511],1,\"ی\"],[64512,1,\"ئج\"],[64513,1,\"ئح\"],[64514,1,\"ئم\"],[64515,1,\"ئى\"],[64516,1,\"ئي\"],[64517,1,\"بج\"],[64518,1,\"بح\"],[64519,1,\"بخ\"],[64520,1,\"بم\"],[64521,1,\"بى\"],[64522,1,\"بي\"],[64523,1,\"تج\"],[64524,1,\"تح\"],[64525,1,\"تخ\"],[64526,1,\"تم\"],[64527,1,\"تى\"],[64528,1,\"تي\"],[64529,1,\"ثج\"],[64530,1,\"ثم\"],[64531,1,\"ثى\"],[64532,1,\"ثي\"],[64533,1,\"جح\"],[64534,1,\"جم\"],[64535,1,\"حج\"],[64536,1,\"حم\"],[64537,1,\"خج\"],[64538,1,\"خح\"],[64539,1,\"خم\"],[64540,1,\"سج\"],[64541,1,\"سح\"],[64542,1,\"سخ\"],[64543,1,\"سم\"],[64544,1,\"صح\"],[64545,1,\"صم\"],[64546,1,\"ضج\"],[64547,1,\"ضح\"],[64548,1,\"ضخ\"],[64549,1,\"ضم\"],[64550,1,\"طح\"],[64551,1,\"طم\"],[64552,1,\"ظم\"],[64553,1,\"عج\"],[64554,1,\"عم\"],[64555,1,\"غج\"],[64556,1,\"غم\"],[64557,1,\"فج\"],[64558,1,\"فح\"],[64559,1,\"فخ\"],[64560,1,\"فم\"],[64561,1,\"فى\"],[64562,1,\"في\"],[64563,1,\"قح\"],[64564,1,\"قم\"],[64565,1,\"قى\"],[64566,1,\"قي\"],[64567,1,\"كا\"],[64568,1,\"كج\"],[64569,1,\"كح\"],[64570,1,\"كخ\"],[64571,1,\"كل\"],[64572,1,\"كم\"],[64573,1,\"كى\"],[64574,1,\"كي\"],[64575,1,\"لج\"],[64576,1,\"لح\"],[64577,1,\"لخ\"],[64578,1,\"لم\"],[64579,1,\"لى\"],[64580,1,\"لي\"],[64581,1,\"مج\"],[64582,1,\"مح\"],[64583,1,\"مخ\"],[64584,1,\"مم\"],[64585,1,\"مى\"],[64586,1,\"مي\"],[64587,1,\"نج\"],[64588,1,\"نح\"],[64589,1,\"نخ\"],[64590,1,\"نم\"],[64591,1,\"نى\"],[64592,1,\"ني\"],[64593,1,\"هج\"],[64594,1,\"هم\"],[64595,1,\"هى\"],[64596,1,\"هي\"],[64597,1,\"يج\"],[64598,1,\"يح\"],[64599,1,\"يخ\"],[64600,1,\"يم\"],[64601,1,\"يى\"],[64602,1,\"يي\"],[64603,1,\"ذٰ\"],[64604,1,\"رٰ\"],[64605,1,\"ىٰ\"],[64606,5,\" ٌّ\"],[64607,5,\" ٍّ\"],[64608,5,\" َّ\"],[64609,5,\" ُّ\"],[64610,5,\" ِّ\"],[64611,5,\" ّٰ\"],[64612,1,\"ئر\"],[64613,1,\"ئز\"],[64614,1,\"ئم\"],[64615,1,\"ئن\"],[64616,1,\"ئى\"],[64617,1,\"ئي\"],[64618,1,\"بر\"],[64619,1,\"بز\"],[64620,1,\"بم\"],[64621,1,\"بن\"],[64622,1,\"بى\"],[64623,1,\"بي\"],[64624,1,\"تر\"],[64625,1,\"تز\"],[64626,1,\"تم\"],[64627,1,\"تن\"],[64628,1,\"تى\"],[64629,1,\"تي\"],[64630,1,\"ثر\"],[64631,1,\"ثز\"],[64632,1,\"ثم\"],[64633,1,\"ثن\"],[64634,1,\"ثى\"],[64635,1,\"ثي\"],[64636,1,\"فى\"],[64637,1,\"في\"],[64638,1,\"قى\"],[64639,1,\"قي\"],[64640,1,\"كا\"],[64641,1,\"كل\"],[64642,1,\"كم\"],[64643,1,\"كى\"],[64644,1,\"كي\"],[64645,1,\"لم\"],[64646,1,\"لى\"],[64647,1,\"لي\"],[64648,1,\"ما\"],[64649,1,\"مم\"],[64650,1,\"نر\"],[64651,1,\"نز\"],[64652,1,\"نم\"],[64653,1,\"نن\"],[64654,1,\"نى\"],[64655,1,\"ني\"],[64656,1,\"ىٰ\"],[64657,1,\"ير\"],[64658,1,\"يز\"],[64659,1,\"يم\"],[64660,1,\"ين\"],[64661,1,\"يى\"],[64662,1,\"يي\"],[64663,1,\"ئج\"],[64664,1,\"ئح\"],[64665,1,\"ئخ\"],[64666,1,\"ئم\"],[64667,1,\"ئه\"],[64668,1,\"بج\"],[64669,1,\"بح\"],[64670,1,\"بخ\"],[64671,1,\"بم\"],[64672,1,\"به\"],[64673,1,\"تج\"],[64674,1,\"تح\"],[64675,1,\"تخ\"],[64676,1,\"تم\"],[64677,1,\"ته\"],[64678,1,\"ثم\"],[64679,1,\"جح\"],[64680,1,\"جم\"],[64681,1,\"حج\"],[64682,1,\"حم\"],[64683,1,\"خج\"],[64684,1,\"خم\"],[64685,1,\"سج\"],[64686,1,\"سح\"],[64687,1,\"سخ\"],[64688,1,\"سم\"],[64689,1,\"صح\"],[64690,1,\"صخ\"],[64691,1,\"صم\"],[64692,1,\"ضج\"],[64693,1,\"ضح\"],[64694,1,\"ضخ\"],[64695,1,\"ضم\"],[64696,1,\"طح\"],[64697,1,\"ظم\"],[64698,1,\"عج\"],[64699,1,\"عم\"],[64700,1,\"غج\"],[64701,1,\"غم\"],[64702,1,\"فج\"],[64703,1,\"فح\"],[64704,1,\"فخ\"],[64705,1,\"فم\"],[64706,1,\"قح\"],[64707,1,\"قم\"],[64708,1,\"كج\"],[64709,1,\"كح\"],[64710,1,\"كخ\"],[64711,1,\"كل\"],[64712,1,\"كم\"],[64713,1,\"لج\"],[64714,1,\"لح\"],[64715,1,\"لخ\"],[64716,1,\"لم\"],[64717,1,\"له\"],[64718,1,\"مج\"],[64719,1,\"مح\"],[64720,1,\"مخ\"],[64721,1,\"مم\"],[64722,1,\"نج\"],[64723,1,\"نح\"],[64724,1,\"نخ\"],[64725,1,\"نم\"],[64726,1,\"نه\"],[64727,1,\"هج\"],[64728,1,\"هم\"],[64729,1,\"هٰ\"],[64730,1,\"يج\"],[64731,1,\"يح\"],[64732,1,\"يخ\"],[64733,1,\"يم\"],[64734,1,\"يه\"],[64735,1,\"ئم\"],[64736,1,\"ئه\"],[64737,1,\"بم\"],[64738,1,\"به\"],[64739,1,\"تم\"],[64740,1,\"ته\"],[64741,1,\"ثم\"],[64742,1,\"ثه\"],[64743,1,\"سم\"],[64744,1,\"سه\"],[64745,1,\"شم\"],[64746,1,\"شه\"],[64747,1,\"كل\"],[64748,1,\"كم\"],[64749,1,\"لم\"],[64750,1,\"نم\"],[64751,1,\"نه\"],[64752,1,\"يم\"],[64753,1,\"يه\"],[64754,1,\"ـَّ\"],[64755,1,\"ـُّ\"],[64756,1,\"ـِّ\"],[64757,1,\"طى\"],[64758,1,\"طي\"],[64759,1,\"عى\"],[64760,1,\"عي\"],[64761,1,\"غى\"],[64762,1,\"غي\"],[64763,1,\"سى\"],[64764,1,\"سي\"],[64765,1,\"شى\"],[64766,1,\"شي\"],[64767,1,\"حى\"],[64768,1,\"حي\"],[64769,1,\"جى\"],[64770,1,\"جي\"],[64771,1,\"خى\"],[64772,1,\"خي\"],[64773,1,\"صى\"],[64774,1,\"صي\"],[64775,1,\"ضى\"],[64776,1,\"ضي\"],[64777,1,\"شج\"],[64778,1,\"شح\"],[64779,1,\"شخ\"],[64780,1,\"شم\"],[64781,1,\"شر\"],[64782,1,\"سر\"],[64783,1,\"صر\"],[64784,1,\"ضر\"],[64785,1,\"طى\"],[64786,1,\"طي\"],[64787,1,\"عى\"],[64788,1,\"عي\"],[64789,1,\"غى\"],[64790,1,\"غي\"],[64791,1,\"سى\"],[64792,1,\"سي\"],[64793,1,\"شى\"],[64794,1,\"شي\"],[64795,1,\"حى\"],[64796,1,\"حي\"],[64797,1,\"جى\"],[64798,1,\"جي\"],[64799,1,\"خى\"],[64800,1,\"خي\"],[64801,1,\"صى\"],[64802,1,\"صي\"],[64803,1,\"ضى\"],[64804,1,\"ضي\"],[64805,1,\"شج\"],[64806,1,\"شح\"],[64807,1,\"شخ\"],[64808,1,\"شم\"],[64809,1,\"شر\"],[64810,1,\"سر\"],[64811,1,\"صر\"],[64812,1,\"ضر\"],[64813,1,\"شج\"],[64814,1,\"شح\"],[64815,1,\"شخ\"],[64816,1,\"شم\"],[64817,1,\"سه\"],[64818,1,\"شه\"],[64819,1,\"طم\"],[64820,1,\"سج\"],[64821,1,\"سح\"],[64822,1,\"سخ\"],[64823,1,\"شج\"],[64824,1,\"شح\"],[64825,1,\"شخ\"],[64826,1,\"طم\"],[64827,1,\"ظم\"],[[64828,64829],1,\"اً\"],[[64830,64831],2],[[64832,64847],3],[64848,1,\"تجم\"],[[64849,64850],1,\"تحج\"],[64851,1,\"تحم\"],[64852,1,\"تخم\"],[64853,1,\"تمج\"],[64854,1,\"تمح\"],[64855,1,\"تمخ\"],[[64856,64857],1,\"جمح\"],[64858,1,\"حمي\"],[64859,1,\"حمى\"],[64860,1,\"سحج\"],[64861,1,\"سجح\"],[64862,1,\"سجى\"],[[64863,64864],1,\"سمح\"],[64865,1,\"سمج\"],[[64866,64867],1,\"سمم\"],[[64868,64869],1,\"صحح\"],[64870,1,\"صمم\"],[[64871,64872],1,\"شحم\"],[64873,1,\"شجي\"],[[64874,64875],1,\"شمخ\"],[[64876,64877],1,\"شمم\"],[64878,1,\"ضحى\"],[[64879,64880],1,\"ضخم\"],[[64881,64882],1,\"طمح\"],[64883,1,\"طمم\"],[64884,1,\"طمي\"],[64885,1,\"عجم\"],[[64886,64887],1,\"عمم\"],[64888,1,\"عمى\"],[64889,1,\"غمم\"],[64890,1,\"غمي\"],[64891,1,\"غمى\"],[[64892,64893],1,\"فخم\"],[64894,1,\"قمح\"],[64895,1,\"قمم\"],[64896,1,\"لحم\"],[64897,1,\"لحي\"],[64898,1,\"لحى\"],[[64899,64900],1,\"لجج\"],[[64901,64902],1,\"لخم\"],[[64903,64904],1,\"لمح\"],[64905,1,\"محج\"],[64906,1,\"محم\"],[64907,1,\"محي\"],[64908,1,\"مجح\"],[64909,1,\"مجم\"],[64910,1,\"مخج\"],[64911,1,\"مخم\"],[[64912,64913],3],[64914,1,\"مجخ\"],[64915,1,\"همج\"],[64916,1,\"همم\"],[64917,1,\"نحم\"],[64918,1,\"نحى\"],[[64919,64920],1,\"نجم\"],[64921,1,\"نجى\"],[64922,1,\"نمي\"],[64923,1,\"نمى\"],[[64924,64925],1,\"يمم\"],[64926,1,\"بخي\"],[64927,1,\"تجي\"],[64928,1,\"تجى\"],[64929,1,\"تخي\"],[64930,1,\"تخى\"],[64931,1,\"تمي\"],[64932,1,\"تمى\"],[64933,1,\"جمي\"],[64934,1,\"جحى\"],[64935,1,\"جمى\"],[64936,1,\"سخى\"],[64937,1,\"صحي\"],[64938,1,\"شحي\"],[64939,1,\"ضحي\"],[64940,1,\"لجي\"],[64941,1,\"لمي\"],[64942,1,\"يحي\"],[64943,1,\"يجي\"],[64944,1,\"يمي\"],[64945,1,\"ممي\"],[64946,1,\"قمي\"],[64947,1,\"نحي\"],[64948,1,\"قمح\"],[64949,1,\"لحم\"],[64950,1,\"عمي\"],[64951,1,\"كمي\"],[64952,1,\"نجح\"],[64953,1,\"مخي\"],[64954,1,\"لجم\"],[64955,1,\"كمم\"],[64956,1,\"لجم\"],[64957,1,\"نجح\"],[64958,1,\"جحي\"],[64959,1,\"حجي\"],[64960,1,\"مجي\"],[64961,1,\"فمي\"],[64962,1,\"بحي\"],[64963,1,\"كمم\"],[64964,1,\"عجم\"],[64965,1,\"صمم\"],[64966,1,\"سخي\"],[64967,1,\"نجي\"],[[64968,64975],3],[[64976,65007],3],[65008,1,\"صلے\"],[65009,1,\"قلے\"],[65010,1,\"الله\"],[65011,1,\"اكبر\"],[65012,1,\"محمد\"],[65013,1,\"صلعم\"],[65014,1,\"رسول\"],[65015,1,\"عليه\"],[65016,1,\"وسلم\"],[65017,1,\"صلى\"],[65018,5,\"صلى الله عليه وسلم\"],[65019,5,\"جل جلاله\"],[65020,1,\"ریال\"],[65021,2],[[65022,65023],3],[[65024,65039],7],[65040,5,\",\"],[65041,1,\"、\"],[65042,3],[65043,5,\":\"],[65044,5,\";\"],[65045,5,\"!\"],[65046,5,\"?\"],[65047,1,\"〖\"],[65048,1,\"〗\"],[65049,3],[[65050,65055],3],[[65056,65059],2],[[65060,65062],2],[[65063,65069],2],[[65070,65071],2],[65072,3],[65073,1,\"—\"],[65074,1,\"–\"],[[65075,65076],5,\"_\"],[65077,5,\"(\"],[65078,5,\")\"],[65079,5,\"{\"],[65080,5,\"}\"],[65081,1,\"〔\"],[65082,1,\"〕\"],[65083,1,\"【\"],[65084,1,\"】\"],[65085,1,\"《\"],[65086,1,\"》\"],[65087,1,\"〈\"],[65088,1,\"〉\"],[65089,1,\"「\"],[65090,1,\"」\"],[65091,1,\"『\"],[65092,1,\"』\"],[[65093,65094],2],[65095,5,\"[\"],[65096,5,\"]\"],[[65097,65100],5,\" ̅\"],[[65101,65103],5,\"_\"],[65104,5,\",\"],[65105,1,\"、\"],[65106,3],[65107,3],[65108,5,\";\"],[65109,5,\":\"],[65110,5,\"?\"],[65111,5,\"!\"],[65112,1,\"—\"],[65113,5,\"(\"],[65114,5,\")\"],[65115,5,\"{\"],[65116,5,\"}\"],[65117,1,\"〔\"],[65118,1,\"〕\"],[65119,5,\"#\"],[65120,5,\"&\"],[65121,5,\"*\"],[65122,5,\"+\"],[65123,1,\"-\"],[65124,5,\"<\"],[65125,5,\">\"],[65126,5,\"=\"],[65127,3],[65128,5,\"\\\\\"],[65129,5,\"$\"],[65130,5,\"%\"],[65131,5,\"@\"],[[65132,65135],3],[65136,5,\" ً\"],[65137,1,\"ـً\"],[65138,5,\" ٌ\"],[65139,2],[65140,5,\" ٍ\"],[65141,3],[65142,5,\" َ\"],[65143,1,\"ـَ\"],[65144,5,\" ُ\"],[65145,1,\"ـُ\"],[65146,5,\" ِ\"],[65147,1,\"ـِ\"],[65148,5,\" ّ\"],[65149,1,\"ـّ\"],[65150,5,\" ْ\"],[65151,1,\"ـْ\"],[65152,1,\"ء\"],[[65153,65154],1,\"آ\"],[[65155,65156],1,\"أ\"],[[65157,65158],1,\"ؤ\"],[[65159,65160],1,\"إ\"],[[65161,65164],1,\"ئ\"],[[65165,65166],1,\"ا\"],[[65167,65170],1,\"ب\"],[[65171,65172],1,\"ة\"],[[65173,65176],1,\"ت\"],[[65177,65180],1,\"ث\"],[[65181,65184],1,\"ج\"],[[65185,65188],1,\"ح\"],[[65189,65192],1,\"خ\"],[[65193,65194],1,\"د\"],[[65195,65196],1,\"ذ\"],[[65197,65198],1,\"ر\"],[[65199,65200],1,\"ز\"],[[65201,65204],1,\"س\"],[[65205,65208],1,\"ش\"],[[65209,65212],1,\"ص\"],[[65213,65216],1,\"ض\"],[[65217,65220],1,\"ط\"],[[65221,65224],1,\"ظ\"],[[65225,65228],1,\"ع\"],[[65229,65232],1,\"غ\"],[[65233,65236],1,\"ف\"],[[65237,65240],1,\"ق\"],[[65241,65244],1,\"ك\"],[[65245,65248],1,\"ل\"],[[65249,65252],1,\"م\"],[[65253,65256],1,\"ن\"],[[65257,65260],1,\"ه\"],[[65261,65262],1,\"و\"],[[65263,65264],1,\"ى\"],[[65265,65268],1,\"ي\"],[[65269,65270],1,\"لآ\"],[[65271,65272],1,\"لأ\"],[[65273,65274],1,\"لإ\"],[[65275,65276],1,\"لا\"],[[65277,65278],3],[65279,7],[65280,3],[65281,5,\"!\"],[65282,5,\"\\\"\"],[65283,5,\"#\"],[65284,5,\"$\"],[65285,5,\"%\"],[65286,5,\"&\"],[65287,5,\"'\"],[65288,5,\"(\"],[65289,5,\")\"],[65290,5,\"*\"],[65291,5,\"+\"],[65292,5,\",\"],[65293,1,\"-\"],[65294,1,\".\"],[65295,5,\"/\"],[65296,1,\"0\"],[65297,1,\"1\"],[65298,1,\"2\"],[65299,1,\"3\"],[65300,1,\"4\"],[65301,1,\"5\"],[65302,1,\"6\"],[65303,1,\"7\"],[65304,1,\"8\"],[65305,1,\"9\"],[65306,5,\":\"],[65307,5,\";\"],[65308,5,\"<\"],[65309,5,\"=\"],[65310,5,\">\"],[65311,5,\"?\"],[65312,5,\"@\"],[65313,1,\"a\"],[65314,1,\"b\"],[65315,1,\"c\"],[65316,1,\"d\"],[65317,1,\"e\"],[65318,1,\"f\"],[65319,1,\"g\"],[65320,1,\"h\"],[65321,1,\"i\"],[65322,1,\"j\"],[65323,1,\"k\"],[65324,1,\"l\"],[65325,1,\"m\"],[65326,1,\"n\"],[65327,1,\"o\"],[65328,1,\"p\"],[65329,1,\"q\"],[65330,1,\"r\"],[65331,1,\"s\"],[65332,1,\"t\"],[65333,1,\"u\"],[65334,1,\"v\"],[65335,1,\"w\"],[65336,1,\"x\"],[65337,1,\"y\"],[65338,1,\"z\"],[65339,5,\"[\"],[65340,5,\"\\\\\"],[65341,5,\"]\"],[65342,5,\"^\"],[65343,5,\"_\"],[65344,5,\"`\"],[65345,1,\"a\"],[65346,1,\"b\"],[65347,1,\"c\"],[65348,1,\"d\"],[65349,1,\"e\"],[65350,1,\"f\"],[65351,1,\"g\"],[65352,1,\"h\"],[65353,1,\"i\"],[65354,1,\"j\"],[65355,1,\"k\"],[65356,1,\"l\"],[65357,1,\"m\"],[65358,1,\"n\"],[65359,1,\"o\"],[65360,1,\"p\"],[65361,1,\"q\"],[65362,1,\"r\"],[65363,1,\"s\"],[65364,1,\"t\"],[65365,1,\"u\"],[65366,1,\"v\"],[65367,1,\"w\"],[65368,1,\"x\"],[65369,1,\"y\"],[65370,1,\"z\"],[65371,5,\"{\"],[65372,5,\"|\"],[65373,5,\"}\"],[65374,5,\"~\"],[65375,1,\"⦅\"],[65376,1,\"⦆\"],[65377,1,\".\"],[65378,1,\"「\"],[65379,1,\"」\"],[65380,1,\"、\"],[65381,1,\"・\"],[65382,1,\"ヲ\"],[65383,1,\"ァ\"],[65384,1,\"ィ\"],[65385,1,\"ゥ\"],[65386,1,\"ェ\"],[65387,1,\"ォ\"],[65388,1,\"ャ\"],[65389,1,\"ュ\"],[65390,1,\"ョ\"],[65391,1,\"ッ\"],[65392,1,\"ー\"],[65393,1,\"ア\"],[65394,1,\"イ\"],[65395,1,\"ウ\"],[65396,1,\"エ\"],[65397,1,\"オ\"],[65398,1,\"カ\"],[65399,1,\"キ\"],[65400,1,\"ク\"],[65401,1,\"ケ\"],[65402,1,\"コ\"],[65403,1,\"サ\"],[65404,1,\"シ\"],[65405,1,\"ス\"],[65406,1,\"セ\"],[65407,1,\"ソ\"],[65408,1,\"タ\"],[65409,1,\"チ\"],[65410,1,\"ツ\"],[65411,1,\"テ\"],[65412,1,\"ト\"],[65413,1,\"ナ\"],[65414,1,\"ニ\"],[65415,1,\"ヌ\"],[65416,1,\"ネ\"],[65417,1,\"ノ\"],[65418,1,\"ハ\"],[65419,1,\"ヒ\"],[65420,1,\"フ\"],[65421,1,\"ヘ\"],[65422,1,\"ホ\"],[65423,1,\"マ\"],[65424,1,\"ミ\"],[65425,1,\"ム\"],[65426,1,\"メ\"],[65427,1,\"モ\"],[65428,1,\"ヤ\"],[65429,1,\"ユ\"],[65430,1,\"ヨ\"],[65431,1,\"ラ\"],[65432,1,\"リ\"],[65433,1,\"ル\"],[65434,1,\"レ\"],[65435,1,\"ロ\"],[65436,1,\"ワ\"],[65437,1,\"ン\"],[65438,1,\"゙\"],[65439,1,\"゚\"],[65440,3],[65441,1,\"ᄀ\"],[65442,1,\"ᄁ\"],[65443,1,\"ᆪ\"],[65444,1,\"ᄂ\"],[65445,1,\"ᆬ\"],[65446,1,\"ᆭ\"],[65447,1,\"ᄃ\"],[65448,1,\"ᄄ\"],[65449,1,\"ᄅ\"],[65450,1,\"ᆰ\"],[65451,1,\"ᆱ\"],[65452,1,\"ᆲ\"],[65453,1,\"ᆳ\"],[65454,1,\"ᆴ\"],[65455,1,\"ᆵ\"],[65456,1,\"ᄚ\"],[65457,1,\"ᄆ\"],[65458,1,\"ᄇ\"],[65459,1,\"ᄈ\"],[65460,1,\"ᄡ\"],[65461,1,\"ᄉ\"],[65462,1,\"ᄊ\"],[65463,1,\"ᄋ\"],[65464,1,\"ᄌ\"],[65465,1,\"ᄍ\"],[65466,1,\"ᄎ\"],[65467,1,\"ᄏ\"],[65468,1,\"ᄐ\"],[65469,1,\"ᄑ\"],[65470,1,\"ᄒ\"],[[65471,65473],3],[65474,1,\"ᅡ\"],[65475,1,\"ᅢ\"],[65476,1,\"ᅣ\"],[65477,1,\"ᅤ\"],[65478,1,\"ᅥ\"],[65479,1,\"ᅦ\"],[[65480,65481],3],[65482,1,\"ᅧ\"],[65483,1,\"ᅨ\"],[65484,1,\"ᅩ\"],[65485,1,\"ᅪ\"],[65486,1,\"ᅫ\"],[65487,1,\"ᅬ\"],[[65488,65489],3],[65490,1,\"ᅭ\"],[65491,1,\"ᅮ\"],[65492,1,\"ᅯ\"],[65493,1,\"ᅰ\"],[65494,1,\"ᅱ\"],[65495,1,\"ᅲ\"],[[65496,65497],3],[65498,1,\"ᅳ\"],[65499,1,\"ᅴ\"],[65500,1,\"ᅵ\"],[[65501,65503],3],[65504,1,\"¢\"],[65505,1,\"£\"],[65506,1,\"¬\"],[65507,5,\" ̄\"],[65508,1,\"¦\"],[65509,1,\"¥\"],[65510,1,\"₩\"],[65511,3],[65512,1,\"│\"],[65513,1,\"←\"],[65514,1,\"↑\"],[65515,1,\"→\"],[65516,1,\"↓\"],[65517,1,\"■\"],[65518,1,\"○\"],[[65519,65528],3],[[65529,65531],3],[65532,3],[65533,3],[[65534,65535],3],[[65536,65547],2],[65548,3],[[65549,65574],2],[65575,3],[[65576,65594],2],[65595,3],[[65596,65597],2],[65598,3],[[65599,65613],2],[[65614,65615],3],[[65616,65629],2],[[65630,65663],3],[[65664,65786],2],[[65787,65791],3],[[65792,65794],2],[[65795,65798],3],[[65799,65843],2],[[65844,65846],3],[[65847,65855],2],[[65856,65930],2],[[65931,65932],2],[[65933,65934],2],[65935,3],[[65936,65947],2],[[65948,65951],3],[65952,2],[[65953,65999],3],[[66000,66044],2],[66045,2],[[66046,66175],3],[[66176,66204],2],[[66205,66207],3],[[66208,66256],2],[[66257,66271],3],[66272,2],[[66273,66299],2],[[66300,66303],3],[[66304,66334],2],[66335,2],[[66336,66339],2],[[66340,66348],3],[[66349,66351],2],[[66352,66368],2],[66369,2],[[66370,66377],2],[66378,2],[[66379,66383],3],[[66384,66426],2],[[66427,66431],3],[[66432,66461],2],[66462,3],[66463,2],[[66464,66499],2],[[66500,66503],3],[[66504,66511],2],[[66512,66517],2],[[66518,66559],3],[66560,1,\"𐐨\"],[66561,1,\"𐐩\"],[66562,1,\"𐐪\"],[66563,1,\"𐐫\"],[66564,1,\"𐐬\"],[66565,1,\"𐐭\"],[66566,1,\"𐐮\"],[66567,1,\"𐐯\"],[66568,1,\"𐐰\"],[66569,1,\"𐐱\"],[66570,1,\"𐐲\"],[66571,1,\"𐐳\"],[66572,1,\"𐐴\"],[66573,1,\"𐐵\"],[66574,1,\"𐐶\"],[66575,1,\"𐐷\"],[66576,1,\"𐐸\"],[66577,1,\"𐐹\"],[66578,1,\"𐐺\"],[66579,1,\"𐐻\"],[66580,1,\"𐐼\"],[66581,1,\"𐐽\"],[66582,1,\"𐐾\"],[66583,1,\"𐐿\"],[66584,1,\"𐑀\"],[66585,1,\"𐑁\"],[66586,1,\"𐑂\"],[66587,1,\"𐑃\"],[66588,1,\"𐑄\"],[66589,1,\"𐑅\"],[66590,1,\"𐑆\"],[66591,1,\"𐑇\"],[66592,1,\"𐑈\"],[66593,1,\"𐑉\"],[66594,1,\"𐑊\"],[66595,1,\"𐑋\"],[66596,1,\"𐑌\"],[66597,1,\"𐑍\"],[66598,1,\"𐑎\"],[66599,1,\"𐑏\"],[[66600,66637],2],[[66638,66717],2],[[66718,66719],3],[[66720,66729],2],[[66730,66735],3],[66736,1,\"𐓘\"],[66737,1,\"𐓙\"],[66738,1,\"𐓚\"],[66739,1,\"𐓛\"],[66740,1,\"𐓜\"],[66741,1,\"𐓝\"],[66742,1,\"𐓞\"],[66743,1,\"𐓟\"],[66744,1,\"𐓠\"],[66745,1,\"𐓡\"],[66746,1,\"𐓢\"],[66747,1,\"𐓣\"],[66748,1,\"𐓤\"],[66749,1,\"𐓥\"],[66750,1,\"𐓦\"],[66751,1,\"𐓧\"],[66752,1,\"𐓨\"],[66753,1,\"𐓩\"],[66754,1,\"𐓪\"],[66755,1,\"𐓫\"],[66756,1,\"𐓬\"],[66757,1,\"𐓭\"],[66758,1,\"𐓮\"],[66759,1,\"𐓯\"],[66760,1,\"𐓰\"],[66761,1,\"𐓱\"],[66762,1,\"𐓲\"],[66763,1,\"𐓳\"],[66764,1,\"𐓴\"],[66765,1,\"𐓵\"],[66766,1,\"𐓶\"],[66767,1,\"𐓷\"],[66768,1,\"𐓸\"],[66769,1,\"𐓹\"],[66770,1,\"𐓺\"],[66771,1,\"𐓻\"],[[66772,66775],3],[[66776,66811],2],[[66812,66815],3],[[66816,66855],2],[[66856,66863],3],[[66864,66915],2],[[66916,66926],3],[66927,2],[[66928,67071],3],[[67072,67382],2],[[67383,67391],3],[[67392,67413],2],[[67414,67423],3],[[67424,67431],2],[[67432,67583],3],[[67584,67589],2],[[67590,67591],3],[67592,2],[67593,3],[[67594,67637],2],[67638,3],[[67639,67640],2],[[67641,67643],3],[67644,2],[[67645,67646],3],[67647,2],[[67648,67669],2],[67670,3],[[67671,67679],2],[[67680,67702],2],[[67703,67711],2],[[67712,67742],2],[[67743,67750],3],[[67751,67759],2],[[67760,67807],3],[[67808,67826],2],[67827,3],[[67828,67829],2],[[67830,67834],3],[[67835,67839],2],[[67840,67861],2],[[67862,67865],2],[[67866,67867],2],[[67868,67870],3],[67871,2],[[67872,67897],2],[[67898,67902],3],[67903,2],[[67904,67967],3],[[67968,68023],2],[[68024,68027],3],[[68028,68029],2],[[68030,68031],2],[[68032,68047],2],[[68048,68049],3],[[68050,68095],2],[[68096,68099],2],[68100,3],[[68101,68102],2],[[68103,68107],3],[[68108,68115],2],[68116,3],[[68117,68119],2],[68120,3],[[68121,68147],2],[[68148,68149],2],[[68150,68151],3],[[68152,68154],2],[[68155,68158],3],[68159,2],[[68160,68167],2],[68168,2],[[68169,68175],3],[[68176,68184],2],[[68185,68191],3],[[68192,68220],2],[[68221,68223],2],[[68224,68252],2],[[68253,68255],2],[[68256,68287],3],[[68288,68295],2],[68296,2],[[68297,68326],2],[[68327,68330],3],[[68331,68342],2],[[68343,68351],3],[[68352,68405],2],[[68406,68408],3],[[68409,68415],2],[[68416,68437],2],[[68438,68439],3],[[68440,68447],2],[[68448,68466],2],[[68467,68471],3],[[68472,68479],2],[[68480,68497],2],[[68498,68504],3],[[68505,68508],2],[[68509,68520],3],[[68521,68527],2],[[68528,68607],3],[[68608,68680],2],[[68681,68735],3],[68736,1,\"𐳀\"],[68737,1,\"𐳁\"],[68738,1,\"𐳂\"],[68739,1,\"𐳃\"],[68740,1,\"𐳄\"],[68741,1,\"𐳅\"],[68742,1,\"𐳆\"],[68743,1,\"𐳇\"],[68744,1,\"𐳈\"],[68745,1,\"𐳉\"],[68746,1,\"𐳊\"],[68747,1,\"𐳋\"],[68748,1,\"𐳌\"],[68749,1,\"𐳍\"],[68750,1,\"𐳎\"],[68751,1,\"𐳏\"],[68752,1,\"𐳐\"],[68753,1,\"𐳑\"],[68754,1,\"𐳒\"],[68755,1,\"𐳓\"],[68756,1,\"𐳔\"],[68757,1,\"𐳕\"],[68758,1,\"𐳖\"],[68759,1,\"𐳗\"],[68760,1,\"𐳘\"],[68761,1,\"𐳙\"],[68762,1,\"𐳚\"],[68763,1,\"𐳛\"],[68764,1,\"𐳜\"],[68765,1,\"𐳝\"],[68766,1,\"𐳞\"],[68767,1,\"𐳟\"],[68768,1,\"𐳠\"],[68769,1,\"𐳡\"],[68770,1,\"𐳢\"],[68771,1,\"𐳣\"],[68772,1,\"𐳤\"],[68773,1,\"𐳥\"],[68774,1,\"𐳦\"],[68775,1,\"𐳧\"],[68776,1,\"𐳨\"],[68777,1,\"𐳩\"],[68778,1,\"𐳪\"],[68779,1,\"𐳫\"],[68780,1,\"𐳬\"],[68781,1,\"𐳭\"],[68782,1,\"𐳮\"],[68783,1,\"𐳯\"],[68784,1,\"𐳰\"],[68785,1,\"𐳱\"],[68786,1,\"𐳲\"],[[68787,68799],3],[[68800,68850],2],[[68851,68857],3],[[68858,68863],2],[[68864,68903],2],[[68904,68911],3],[[68912,68921],2],[[68922,69215],3],[[69216,69246],2],[[69247,69375],3],[[69376,69404],2],[[69405,69414],2],[69415,2],[[69416,69423],3],[[69424,69456],2],[[69457,69465],2],[[69466,69599],3],[[69600,69622],2],[[69623,69631],3],[[69632,69702],2],[[69703,69709],2],[[69710,69713],3],[[69714,69733],2],[[69734,69743],2],[[69744,69758],3],[69759,2],[[69760,69818],2],[[69819,69820],2],[69821,3],[[69822,69825],2],[[69826,69836],3],[69837,3],[[69838,69839],3],[[69840,69864],2],[[69865,69871],3],[[69872,69881],2],[[69882,69887],3],[[69888,69940],2],[69941,3],[[69942,69951],2],[[69952,69955],2],[[69956,69958],2],[[69959,69967],3],[[69968,70003],2],[[70004,70005],2],[70006,2],[[70007,70015],3],[[70016,70084],2],[[70085,70088],2],[[70089,70092],2],[70093,2],[[70094,70095],3],[[70096,70105],2],[70106,2],[70107,2],[70108,2],[[70109,70111],2],[70112,3],[[70113,70132],2],[[70133,70143],3],[[70144,70161],2],[70162,3],[[70163,70199],2],[[70200,70205],2],[70206,2],[[70207,70271],3],[[70272,70278],2],[70279,3],[70280,2],[70281,3],[[70282,70285],2],[70286,3],[[70287,70301],2],[70302,3],[[70303,70312],2],[70313,2],[[70314,70319],3],[[70320,70378],2],[[70379,70383],3],[[70384,70393],2],[[70394,70399],3],[70400,2],[[70401,70403],2],[70404,3],[[70405,70412],2],[[70413,70414],3],[[70415,70416],2],[[70417,70418],3],[[70419,70440],2],[70441,3],[[70442,70448],2],[70449,3],[[70450,70451],2],[70452,3],[[70453,70457],2],[70458,3],[70459,2],[[70460,70468],2],[[70469,70470],3],[[70471,70472],2],[[70473,70474],3],[[70475,70477],2],[[70478,70479],3],[70480,2],[[70481,70486],3],[70487,2],[[70488,70492],3],[[70493,70499],2],[[70500,70501],3],[[70502,70508],2],[[70509,70511],3],[[70512,70516],2],[[70517,70655],3],[[70656,70730],2],[[70731,70735],2],[[70736,70745],2],[70746,3],[70747,2],[70748,3],[70749,2],[70750,2],[70751,2],[[70752,70783],3],[[70784,70853],2],[70854,2],[70855,2],[[70856,70863],3],[[70864,70873],2],[[70874,71039],3],[[71040,71093],2],[[71094,71095],3],[[71096,71104],2],[[71105,71113],2],[[71114,71127],2],[[71128,71133],2],[[71134,71167],3],[[71168,71232],2],[[71233,71235],2],[71236,2],[[71237,71247],3],[[71248,71257],2],[[71258,71263],3],[[71264,71276],2],[[71277,71295],3],[[71296,71351],2],[71352,2],[[71353,71359],3],[[71360,71369],2],[[71370,71423],3],[[71424,71449],2],[71450,2],[[71451,71452],3],[[71453,71467],2],[[71468,71471],3],[[71472,71481],2],[[71482,71487],2],[[71488,71679],3],[[71680,71738],2],[71739,2],[[71740,71839],3],[71840,1,\"𑣀\"],[71841,1,\"𑣁\"],[71842,1,\"𑣂\"],[71843,1,\"𑣃\"],[71844,1,\"𑣄\"],[71845,1,\"𑣅\"],[71846,1,\"𑣆\"],[71847,1,\"𑣇\"],[71848,1,\"𑣈\"],[71849,1,\"𑣉\"],[71850,1,\"𑣊\"],[71851,1,\"𑣋\"],[71852,1,\"𑣌\"],[71853,1,\"𑣍\"],[71854,1,\"𑣎\"],[71855,1,\"𑣏\"],[71856,1,\"𑣐\"],[71857,1,\"𑣑\"],[71858,1,\"𑣒\"],[71859,1,\"𑣓\"],[71860,1,\"𑣔\"],[71861,1,\"𑣕\"],[71862,1,\"𑣖\"],[71863,1,\"𑣗\"],[71864,1,\"𑣘\"],[71865,1,\"𑣙\"],[71866,1,\"𑣚\"],[71867,1,\"𑣛\"],[71868,1,\"𑣜\"],[71869,1,\"𑣝\"],[71870,1,\"𑣞\"],[71871,1,\"𑣟\"],[[71872,71913],2],[[71914,71922],2],[[71923,71934],3],[71935,2],[[71936,72095],3],[[72096,72103],2],[[72104,72105],3],[[72106,72151],2],[[72152,72153],3],[[72154,72161],2],[72162,2],[[72163,72164],2],[[72165,72191],3],[[72192,72254],2],[[72255,72262],2],[72263,2],[[72264,72271],3],[[72272,72323],2],[[72324,72325],2],[[72326,72345],2],[[72346,72348],2],[72349,2],[[72350,72354],2],[[72355,72383],3],[[72384,72440],2],[[72441,72703],3],[[72704,72712],2],[72713,3],[[72714,72758],2],[72759,3],[[72760,72768],2],[[72769,72773],2],[[72774,72783],3],[[72784,72793],2],[[72794,72812],2],[[72813,72815],3],[[72816,72817],2],[[72818,72847],2],[[72848,72849],3],[[72850,72871],2],[72872,3],[[72873,72886],2],[[72887,72959],3],[[72960,72966],2],[72967,3],[[72968,72969],2],[72970,3],[[72971,73014],2],[[73015,73017],3],[73018,2],[73019,3],[[73020,73021],2],[73022,3],[[73023,73031],2],[[73032,73039],3],[[73040,73049],2],[[73050,73055],3],[[73056,73061],2],[73062,3],[[73063,73064],2],[73065,3],[[73066,73102],2],[73103,3],[[73104,73105],2],[73106,3],[[73107,73112],2],[[73113,73119],3],[[73120,73129],2],[[73130,73439],3],[[73440,73462],2],[[73463,73464],2],[[73465,73663],3],[[73664,73713],2],[[73714,73726],3],[73727,2],[[73728,74606],2],[[74607,74648],2],[74649,2],[[74650,74751],3],[[74752,74850],2],[[74851,74862],2],[74863,3],[[74864,74867],2],[74868,2],[[74869,74879],3],[[74880,75075],2],[[75076,77823],3],[[77824,78894],2],[78895,3],[[78896,78904],3],[[78905,82943],3],[[82944,83526],2],[[83527,92159],3],[[92160,92728],2],[[92729,92735],3],[[92736,92766],2],[92767,3],[[92768,92777],2],[[92778,92781],3],[[92782,92783],2],[[92784,92879],3],[[92880,92909],2],[[92910,92911],3],[[92912,92916],2],[92917,2],[[92918,92927],3],[[92928,92982],2],[[92983,92991],2],[[92992,92995],2],[[92996,92997],2],[[92998,93007],3],[[93008,93017],2],[93018,3],[[93019,93025],2],[93026,3],[[93027,93047],2],[[93048,93052],3],[[93053,93071],2],[[93072,93759],3],[93760,1,\"𖹠\"],[93761,1,\"𖹡\"],[93762,1,\"𖹢\"],[93763,1,\"𖹣\"],[93764,1,\"𖹤\"],[93765,1,\"𖹥\"],[93766,1,\"𖹦\"],[93767,1,\"𖹧\"],[93768,1,\"𖹨\"],[93769,1,\"𖹩\"],[93770,1,\"𖹪\"],[93771,1,\"𖹫\"],[93772,1,\"𖹬\"],[93773,1,\"𖹭\"],[93774,1,\"𖹮\"],[93775,1,\"𖹯\"],[93776,1,\"𖹰\"],[93777,1,\"𖹱\"],[93778,1,\"𖹲\"],[93779,1,\"𖹳\"],[93780,1,\"𖹴\"],[93781,1,\"𖹵\"],[93782,1,\"𖹶\"],[93783,1,\"𖹷\"],[93784,1,\"𖹸\"],[93785,1,\"𖹹\"],[93786,1,\"𖹺\"],[93787,1,\"𖹻\"],[93788,1,\"𖹼\"],[93789,1,\"𖹽\"],[93790,1,\"𖹾\"],[93791,1,\"𖹿\"],[[93792,93823],2],[[93824,93850],2],[[93851,93951],3],[[93952,94020],2],[[94021,94026],2],[[94027,94030],3],[94031,2],[[94032,94078],2],[[94079,94087],2],[[94088,94094],3],[[94095,94111],2],[[94112,94175],3],[94176,2],[94177,2],[94178,2],[94179,2],[[94180,94207],3],[[94208,100332],2],[[100333,100337],2],[[100338,100343],2],[[100344,100351],3],[[100352,101106],2],[[101107,110591],3],[[110592,110593],2],[[110594,110878],2],[[110879,110927],3],[[110928,110930],2],[[110931,110947],3],[[110948,110951],2],[[110952,110959],3],[[110960,111355],2],[[111356,113663],3],[[113664,113770],2],[[113771,113775],3],[[113776,113788],2],[[113789,113791],3],[[113792,113800],2],[[113801,113807],3],[[113808,113817],2],[[113818,113819],3],[113820,2],[[113821,113822],2],[113823,2],[[113824,113827],7],[[113828,118783],3],[[118784,119029],2],[[119030,119039],3],[[119040,119078],2],[[119079,119080],3],[119081,2],[[119082,119133],2],[119134,1,\"𝅗𝅥\"],[119135,1,\"𝅘𝅥\"],[119136,1,\"𝅘𝅥𝅮\"],[119137,1,\"𝅘𝅥𝅯\"],[119138,1,\"𝅘𝅥𝅰\"],[119139,1,\"𝅘𝅥𝅱\"],[119140,1,\"𝅘𝅥𝅲\"],[[119141,119154],2],[[119155,119162],3],[[119163,119226],2],[119227,1,\"𝆹𝅥\"],[119228,1,\"𝆺𝅥\"],[119229,1,\"𝆹𝅥𝅮\"],[119230,1,\"𝆺𝅥𝅮\"],[119231,1,\"𝆹𝅥𝅯\"],[119232,1,\"𝆺𝅥𝅯\"],[[119233,119261],2],[[119262,119272],2],[[119273,119295],3],[[119296,119365],2],[[119366,119519],3],[[119520,119539],2],[[119540,119551],3],[[119552,119638],2],[[119639,119647],3],[[119648,119665],2],[[119666,119672],2],[[119673,119807],3],[119808,1,\"a\"],[119809,1,\"b\"],[119810,1,\"c\"],[119811,1,\"d\"],[119812,1,\"e\"],[119813,1,\"f\"],[119814,1,\"g\"],[119815,1,\"h\"],[119816,1,\"i\"],[119817,1,\"j\"],[119818,1,\"k\"],[119819,1,\"l\"],[119820,1,\"m\"],[119821,1,\"n\"],[119822,1,\"o\"],[119823,1,\"p\"],[119824,1,\"q\"],[119825,1,\"r\"],[119826,1,\"s\"],[119827,1,\"t\"],[119828,1,\"u\"],[119829,1,\"v\"],[119830,1,\"w\"],[119831,1,\"x\"],[119832,1,\"y\"],[119833,1,\"z\"],[119834,1,\"a\"],[119835,1,\"b\"],[119836,1,\"c\"],[119837,1,\"d\"],[119838,1,\"e\"],[119839,1,\"f\"],[119840,1,\"g\"],[119841,1,\"h\"],[119842,1,\"i\"],[119843,1,\"j\"],[119844,1,\"k\"],[119845,1,\"l\"],[119846,1,\"m\"],[119847,1,\"n\"],[119848,1,\"o\"],[119849,1,\"p\"],[119850,1,\"q\"],[119851,1,\"r\"],[119852,1,\"s\"],[119853,1,\"t\"],[119854,1,\"u\"],[119855,1,\"v\"],[119856,1,\"w\"],[119857,1,\"x\"],[119858,1,\"y\"],[119859,1,\"z\"],[119860,1,\"a\"],[119861,1,\"b\"],[119862,1,\"c\"],[119863,1,\"d\"],[119864,1,\"e\"],[119865,1,\"f\"],[119866,1,\"g\"],[119867,1,\"h\"],[119868,1,\"i\"],[119869,1,\"j\"],[119870,1,\"k\"],[119871,1,\"l\"],[119872,1,\"m\"],[119873,1,\"n\"],[119874,1,\"o\"],[119875,1,\"p\"],[119876,1,\"q\"],[119877,1,\"r\"],[119878,1,\"s\"],[119879,1,\"t\"],[119880,1,\"u\"],[119881,1,\"v\"],[119882,1,\"w\"],[119883,1,\"x\"],[119884,1,\"y\"],[119885,1,\"z\"],[119886,1,\"a\"],[119887,1,\"b\"],[119888,1,\"c\"],[119889,1,\"d\"],[119890,1,\"e\"],[119891,1,\"f\"],[119892,1,\"g\"],[119893,3],[119894,1,\"i\"],[119895,1,\"j\"],[119896,1,\"k\"],[119897,1,\"l\"],[119898,1,\"m\"],[119899,1,\"n\"],[119900,1,\"o\"],[119901,1,\"p\"],[119902,1,\"q\"],[119903,1,\"r\"],[119904,1,\"s\"],[119905,1,\"t\"],[119906,1,\"u\"],[119907,1,\"v\"],[119908,1,\"w\"],[119909,1,\"x\"],[119910,1,\"y\"],[119911,1,\"z\"],[119912,1,\"a\"],[119913,1,\"b\"],[119914,1,\"c\"],[119915,1,\"d\"],[119916,1,\"e\"],[119917,1,\"f\"],[119918,1,\"g\"],[119919,1,\"h\"],[119920,1,\"i\"],[119921,1,\"j\"],[119922,1,\"k\"],[119923,1,\"l\"],[119924,1,\"m\"],[119925,1,\"n\"],[119926,1,\"o\"],[119927,1,\"p\"],[119928,1,\"q\"],[119929,1,\"r\"],[119930,1,\"s\"],[119931,1,\"t\"],[119932,1,\"u\"],[119933,1,\"v\"],[119934,1,\"w\"],[119935,1,\"x\"],[119936,1,\"y\"],[119937,1,\"z\"],[119938,1,\"a\"],[119939,1,\"b\"],[119940,1,\"c\"],[119941,1,\"d\"],[119942,1,\"e\"],[119943,1,\"f\"],[119944,1,\"g\"],[119945,1,\"h\"],[119946,1,\"i\"],[119947,1,\"j\"],[119948,1,\"k\"],[119949,1,\"l\"],[119950,1,\"m\"],[119951,1,\"n\"],[119952,1,\"o\"],[119953,1,\"p\"],[119954,1,\"q\"],[119955,1,\"r\"],[119956,1,\"s\"],[119957,1,\"t\"],[119958,1,\"u\"],[119959,1,\"v\"],[119960,1,\"w\"],[119961,1,\"x\"],[119962,1,\"y\"],[119963,1,\"z\"],[119964,1,\"a\"],[119965,3],[119966,1,\"c\"],[119967,1,\"d\"],[[119968,119969],3],[119970,1,\"g\"],[[119971,119972],3],[119973,1,\"j\"],[119974,1,\"k\"],[[119975,119976],3],[119977,1,\"n\"],[119978,1,\"o\"],[119979,1,\"p\"],[119980,1,\"q\"],[119981,3],[119982,1,\"s\"],[119983,1,\"t\"],[119984,1,\"u\"],[119985,1,\"v\"],[119986,1,\"w\"],[119987,1,\"x\"],[119988,1,\"y\"],[119989,1,\"z\"],[119990,1,\"a\"],[119991,1,\"b\"],[119992,1,\"c\"],[119993,1,\"d\"],[119994,3],[119995,1,\"f\"],[119996,3],[119997,1,\"h\"],[119998,1,\"i\"],[119999,1,\"j\"],[120000,1,\"k\"],[120001,1,\"l\"],[120002,1,\"m\"],[120003,1,\"n\"],[120004,3],[120005,1,\"p\"],[120006,1,\"q\"],[120007,1,\"r\"],[120008,1,\"s\"],[120009,1,\"t\"],[120010,1,\"u\"],[120011,1,\"v\"],[120012,1,\"w\"],[120013,1,\"x\"],[120014,1,\"y\"],[120015,1,\"z\"],[120016,1,\"a\"],[120017,1,\"b\"],[120018,1,\"c\"],[120019,1,\"d\"],[120020,1,\"e\"],[120021,1,\"f\"],[120022,1,\"g\"],[120023,1,\"h\"],[120024,1,\"i\"],[120025,1,\"j\"],[120026,1,\"k\"],[120027,1,\"l\"],[120028,1,\"m\"],[120029,1,\"n\"],[120030,1,\"o\"],[120031,1,\"p\"],[120032,1,\"q\"],[120033,1,\"r\"],[120034,1,\"s\"],[120035,1,\"t\"],[120036,1,\"u\"],[120037,1,\"v\"],[120038,1,\"w\"],[120039,1,\"x\"],[120040,1,\"y\"],[120041,1,\"z\"],[120042,1,\"a\"],[120043,1,\"b\"],[120044,1,\"c\"],[120045,1,\"d\"],[120046,1,\"e\"],[120047,1,\"f\"],[120048,1,\"g\"],[120049,1,\"h\"],[120050,1,\"i\"],[120051,1,\"j\"],[120052,1,\"k\"],[120053,1,\"l\"],[120054,1,\"m\"],[120055,1,\"n\"],[120056,1,\"o\"],[120057,1,\"p\"],[120058,1,\"q\"],[120059,1,\"r\"],[120060,1,\"s\"],[120061,1,\"t\"],[120062,1,\"u\"],[120063,1,\"v\"],[120064,1,\"w\"],[120065,1,\"x\"],[120066,1,\"y\"],[120067,1,\"z\"],[120068,1,\"a\"],[120069,1,\"b\"],[120070,3],[120071,1,\"d\"],[120072,1,\"e\"],[120073,1,\"f\"],[120074,1,\"g\"],[[120075,120076],3],[120077,1,\"j\"],[120078,1,\"k\"],[120079,1,\"l\"],[120080,1,\"m\"],[120081,1,\"n\"],[120082,1,\"o\"],[120083,1,\"p\"],[120084,1,\"q\"],[120085,3],[120086,1,\"s\"],[120087,1,\"t\"],[120088,1,\"u\"],[120089,1,\"v\"],[120090,1,\"w\"],[120091,1,\"x\"],[120092,1,\"y\"],[120093,3],[120094,1,\"a\"],[120095,1,\"b\"],[120096,1,\"c\"],[120097,1,\"d\"],[120098,1,\"e\"],[120099,1,\"f\"],[120100,1,\"g\"],[120101,1,\"h\"],[120102,1,\"i\"],[120103,1,\"j\"],[120104,1,\"k\"],[120105,1,\"l\"],[120106,1,\"m\"],[120107,1,\"n\"],[120108,1,\"o\"],[120109,1,\"p\"],[120110,1,\"q\"],[120111,1,\"r\"],[120112,1,\"s\"],[120113,1,\"t\"],[120114,1,\"u\"],[120115,1,\"v\"],[120116,1,\"w\"],[120117,1,\"x\"],[120118,1,\"y\"],[120119,1,\"z\"],[120120,1,\"a\"],[120121,1,\"b\"],[120122,3],[120123,1,\"d\"],[120124,1,\"e\"],[120125,1,\"f\"],[120126,1,\"g\"],[120127,3],[120128,1,\"i\"],[120129,1,\"j\"],[120130,1,\"k\"],[120131,1,\"l\"],[120132,1,\"m\"],[120133,3],[120134,1,\"o\"],[[120135,120137],3],[120138,1,\"s\"],[120139,1,\"t\"],[120140,1,\"u\"],[120141,1,\"v\"],[120142,1,\"w\"],[120143,1,\"x\"],[120144,1,\"y\"],[120145,3],[120146,1,\"a\"],[120147,1,\"b\"],[120148,1,\"c\"],[120149,1,\"d\"],[120150,1,\"e\"],[120151,1,\"f\"],[120152,1,\"g\"],[120153,1,\"h\"],[120154,1,\"i\"],[120155,1,\"j\"],[120156,1,\"k\"],[120157,1,\"l\"],[120158,1,\"m\"],[120159,1,\"n\"],[120160,1,\"o\"],[120161,1,\"p\"],[120162,1,\"q\"],[120163,1,\"r\"],[120164,1,\"s\"],[120165,1,\"t\"],[120166,1,\"u\"],[120167,1,\"v\"],[120168,1,\"w\"],[120169,1,\"x\"],[120170,1,\"y\"],[120171,1,\"z\"],[120172,1,\"a\"],[120173,1,\"b\"],[120174,1,\"c\"],[120175,1,\"d\"],[120176,1,\"e\"],[120177,1,\"f\"],[120178,1,\"g\"],[120179,1,\"h\"],[120180,1,\"i\"],[120181,1,\"j\"],[120182,1,\"k\"],[120183,1,\"l\"],[120184,1,\"m\"],[120185,1,\"n\"],[120186,1,\"o\"],[120187,1,\"p\"],[120188,1,\"q\"],[120189,1,\"r\"],[120190,1,\"s\"],[120191,1,\"t\"],[120192,1,\"u\"],[120193,1,\"v\"],[120194,1,\"w\"],[120195,1,\"x\"],[120196,1,\"y\"],[120197,1,\"z\"],[120198,1,\"a\"],[120199,1,\"b\"],[120200,1,\"c\"],[120201,1,\"d\"],[120202,1,\"e\"],[120203,1,\"f\"],[120204,1,\"g\"],[120205,1,\"h\"],[120206,1,\"i\"],[120207,1,\"j\"],[120208,1,\"k\"],[120209,1,\"l\"],[120210,1,\"m\"],[120211,1,\"n\"],[120212,1,\"o\"],[120213,1,\"p\"],[120214,1,\"q\"],[120215,1,\"r\"],[120216,1,\"s\"],[120217,1,\"t\"],[120218,1,\"u\"],[120219,1,\"v\"],[120220,1,\"w\"],[120221,1,\"x\"],[120222,1,\"y\"],[120223,1,\"z\"],[120224,1,\"a\"],[120225,1,\"b\"],[120226,1,\"c\"],[120227,1,\"d\"],[120228,1,\"e\"],[120229,1,\"f\"],[120230,1,\"g\"],[120231,1,\"h\"],[120232,1,\"i\"],[120233,1,\"j\"],[120234,1,\"k\"],[120235,1,\"l\"],[120236,1,\"m\"],[120237,1,\"n\"],[120238,1,\"o\"],[120239,1,\"p\"],[120240,1,\"q\"],[120241,1,\"r\"],[120242,1,\"s\"],[120243,1,\"t\"],[120244,1,\"u\"],[120245,1,\"v\"],[120246,1,\"w\"],[120247,1,\"x\"],[120248,1,\"y\"],[120249,1,\"z\"],[120250,1,\"a\"],[120251,1,\"b\"],[120252,1,\"c\"],[120253,1,\"d\"],[120254,1,\"e\"],[120255,1,\"f\"],[120256,1,\"g\"],[120257,1,\"h\"],[120258,1,\"i\"],[120259,1,\"j\"],[120260,1,\"k\"],[120261,1,\"l\"],[120262,1,\"m\"],[120263,1,\"n\"],[120264,1,\"o\"],[120265,1,\"p\"],[120266,1,\"q\"],[120267,1,\"r\"],[120268,1,\"s\"],[120269,1,\"t\"],[120270,1,\"u\"],[120271,1,\"v\"],[120272,1,\"w\"],[120273,1,\"x\"],[120274,1,\"y\"],[120275,1,\"z\"],[120276,1,\"a\"],[120277,1,\"b\"],[120278,1,\"c\"],[120279,1,\"d\"],[120280,1,\"e\"],[120281,1,\"f\"],[120282,1,\"g\"],[120283,1,\"h\"],[120284,1,\"i\"],[120285,1,\"j\"],[120286,1,\"k\"],[120287,1,\"l\"],[120288,1,\"m\"],[120289,1,\"n\"],[120290,1,\"o\"],[120291,1,\"p\"],[120292,1,\"q\"],[120293,1,\"r\"],[120294,1,\"s\"],[120295,1,\"t\"],[120296,1,\"u\"],[120297,1,\"v\"],[120298,1,\"w\"],[120299,1,\"x\"],[120300,1,\"y\"],[120301,1,\"z\"],[120302,1,\"a\"],[120303,1,\"b\"],[120304,1,\"c\"],[120305,1,\"d\"],[120306,1,\"e\"],[120307,1,\"f\"],[120308,1,\"g\"],[120309,1,\"h\"],[120310,1,\"i\"],[120311,1,\"j\"],[120312,1,\"k\"],[120313,1,\"l\"],[120314,1,\"m\"],[120315,1,\"n\"],[120316,1,\"o\"],[120317,1,\"p\"],[120318,1,\"q\"],[120319,1,\"r\"],[120320,1,\"s\"],[120321,1,\"t\"],[120322,1,\"u\"],[120323,1,\"v\"],[120324,1,\"w\"],[120325,1,\"x\"],[120326,1,\"y\"],[120327,1,\"z\"],[120328,1,\"a\"],[120329,1,\"b\"],[120330,1,\"c\"],[120331,1,\"d\"],[120332,1,\"e\"],[120333,1,\"f\"],[120334,1,\"g\"],[120335,1,\"h\"],[120336,1,\"i\"],[120337,1,\"j\"],[120338,1,\"k\"],[120339,1,\"l\"],[120340,1,\"m\"],[120341,1,\"n\"],[120342,1,\"o\"],[120343,1,\"p\"],[120344,1,\"q\"],[120345,1,\"r\"],[120346,1,\"s\"],[120347,1,\"t\"],[120348,1,\"u\"],[120349,1,\"v\"],[120350,1,\"w\"],[120351,1,\"x\"],[120352,1,\"y\"],[120353,1,\"z\"],[120354,1,\"a\"],[120355,1,\"b\"],[120356,1,\"c\"],[120357,1,\"d\"],[120358,1,\"e\"],[120359,1,\"f\"],[120360,1,\"g\"],[120361,1,\"h\"],[120362,1,\"i\"],[120363,1,\"j\"],[120364,1,\"k\"],[120365,1,\"l\"],[120366,1,\"m\"],[120367,1,\"n\"],[120368,1,\"o\"],[120369,1,\"p\"],[120370,1,\"q\"],[120371,1,\"r\"],[120372,1,\"s\"],[120373,1,\"t\"],[120374,1,\"u\"],[120375,1,\"v\"],[120376,1,\"w\"],[120377,1,\"x\"],[120378,1,\"y\"],[120379,1,\"z\"],[120380,1,\"a\"],[120381,1,\"b\"],[120382,1,\"c\"],[120383,1,\"d\"],[120384,1,\"e\"],[120385,1,\"f\"],[120386,1,\"g\"],[120387,1,\"h\"],[120388,1,\"i\"],[120389,1,\"j\"],[120390,1,\"k\"],[120391,1,\"l\"],[120392,1,\"m\"],[120393,1,\"n\"],[120394,1,\"o\"],[120395,1,\"p\"],[120396,1,\"q\"],[120397,1,\"r\"],[120398,1,\"s\"],[120399,1,\"t\"],[120400,1,\"u\"],[120401,1,\"v\"],[120402,1,\"w\"],[120403,1,\"x\"],[120404,1,\"y\"],[120405,1,\"z\"],[120406,1,\"a\"],[120407,1,\"b\"],[120408,1,\"c\"],[120409,1,\"d\"],[120410,1,\"e\"],[120411,1,\"f\"],[120412,1,\"g\"],[120413,1,\"h\"],[120414,1,\"i\"],[120415,1,\"j\"],[120416,1,\"k\"],[120417,1,\"l\"],[120418,1,\"m\"],[120419,1,\"n\"],[120420,1,\"o\"],[120421,1,\"p\"],[120422,1,\"q\"],[120423,1,\"r\"],[120424,1,\"s\"],[120425,1,\"t\"],[120426,1,\"u\"],[120427,1,\"v\"],[120428,1,\"w\"],[120429,1,\"x\"],[120430,1,\"y\"],[120431,1,\"z\"],[120432,1,\"a\"],[120433,1,\"b\"],[120434,1,\"c\"],[120435,1,\"d\"],[120436,1,\"e\"],[120437,1,\"f\"],[120438,1,\"g\"],[120439,1,\"h\"],[120440,1,\"i\"],[120441,1,\"j\"],[120442,1,\"k\"],[120443,1,\"l\"],[120444,1,\"m\"],[120445,1,\"n\"],[120446,1,\"o\"],[120447,1,\"p\"],[120448,1,\"q\"],[120449,1,\"r\"],[120450,1,\"s\"],[120451,1,\"t\"],[120452,1,\"u\"],[120453,1,\"v\"],[120454,1,\"w\"],[120455,1,\"x\"],[120456,1,\"y\"],[120457,1,\"z\"],[120458,1,\"a\"],[120459,1,\"b\"],[120460,1,\"c\"],[120461,1,\"d\"],[120462,1,\"e\"],[120463,1,\"f\"],[120464,1,\"g\"],[120465,1,\"h\"],[120466,1,\"i\"],[120467,1,\"j\"],[120468,1,\"k\"],[120469,1,\"l\"],[120470,1,\"m\"],[120471,1,\"n\"],[120472,1,\"o\"],[120473,1,\"p\"],[120474,1,\"q\"],[120475,1,\"r\"],[120476,1,\"s\"],[120477,1,\"t\"],[120478,1,\"u\"],[120479,1,\"v\"],[120480,1,\"w\"],[120481,1,\"x\"],[120482,1,\"y\"],[120483,1,\"z\"],[120484,1,\"ı\"],[120485,1,\"ȷ\"],[[120486,120487],3],[120488,1,\"α\"],[120489,1,\"β\"],[120490,1,\"γ\"],[120491,1,\"δ\"],[120492,1,\"ε\"],[120493,1,\"ζ\"],[120494,1,\"η\"],[120495,1,\"θ\"],[120496,1,\"ι\"],[120497,1,\"κ\"],[120498,1,\"λ\"],[120499,1,\"μ\"],[120500,1,\"ν\"],[120501,1,\"ξ\"],[120502,1,\"ο\"],[120503,1,\"π\"],[120504,1,\"ρ\"],[120505,1,\"θ\"],[120506,1,\"σ\"],[120507,1,\"τ\"],[120508,1,\"υ\"],[120509,1,\"φ\"],[120510,1,\"χ\"],[120511,1,\"ψ\"],[120512,1,\"ω\"],[120513,1,\"∇\"],[120514,1,\"α\"],[120515,1,\"β\"],[120516,1,\"γ\"],[120517,1,\"δ\"],[120518,1,\"ε\"],[120519,1,\"ζ\"],[120520,1,\"η\"],[120521,1,\"θ\"],[120522,1,\"ι\"],[120523,1,\"κ\"],[120524,1,\"λ\"],[120525,1,\"μ\"],[120526,1,\"ν\"],[120527,1,\"ξ\"],[120528,1,\"ο\"],[120529,1,\"π\"],[120530,1,\"ρ\"],[[120531,120532],1,\"σ\"],[120533,1,\"τ\"],[120534,1,\"υ\"],[120535,1,\"φ\"],[120536,1,\"χ\"],[120537,1,\"ψ\"],[120538,1,\"ω\"],[120539,1,\"∂\"],[120540,1,\"ε\"],[120541,1,\"θ\"],[120542,1,\"κ\"],[120543,1,\"φ\"],[120544,1,\"ρ\"],[120545,1,\"π\"],[120546,1,\"α\"],[120547,1,\"β\"],[120548,1,\"γ\"],[120549,1,\"δ\"],[120550,1,\"ε\"],[120551,1,\"ζ\"],[120552,1,\"η\"],[120553,1,\"θ\"],[120554,1,\"ι\"],[120555,1,\"κ\"],[120556,1,\"λ\"],[120557,1,\"μ\"],[120558,1,\"ν\"],[120559,1,\"ξ\"],[120560,1,\"ο\"],[120561,1,\"π\"],[120562,1,\"ρ\"],[120563,1,\"θ\"],[120564,1,\"σ\"],[120565,1,\"τ\"],[120566,1,\"υ\"],[120567,1,\"φ\"],[120568,1,\"χ\"],[120569,1,\"ψ\"],[120570,1,\"ω\"],[120571,1,\"∇\"],[120572,1,\"α\"],[120573,1,\"β\"],[120574,1,\"γ\"],[120575,1,\"δ\"],[120576,1,\"ε\"],[120577,1,\"ζ\"],[120578,1,\"η\"],[120579,1,\"θ\"],[120580,1,\"ι\"],[120581,1,\"κ\"],[120582,1,\"λ\"],[120583,1,\"μ\"],[120584,1,\"ν\"],[120585,1,\"ξ\"],[120586,1,\"ο\"],[120587,1,\"π\"],[120588,1,\"ρ\"],[[120589,120590],1,\"σ\"],[120591,1,\"τ\"],[120592,1,\"υ\"],[120593,1,\"φ\"],[120594,1,\"χ\"],[120595,1,\"ψ\"],[120596,1,\"ω\"],[120597,1,\"∂\"],[120598,1,\"ε\"],[120599,1,\"θ\"],[120600,1,\"κ\"],[120601,1,\"φ\"],[120602,1,\"ρ\"],[120603,1,\"π\"],[120604,1,\"α\"],[120605,1,\"β\"],[120606,1,\"γ\"],[120607,1,\"δ\"],[120608,1,\"ε\"],[120609,1,\"ζ\"],[120610,1,\"η\"],[120611,1,\"θ\"],[120612,1,\"ι\"],[120613,1,\"κ\"],[120614,1,\"λ\"],[120615,1,\"μ\"],[120616,1,\"ν\"],[120617,1,\"ξ\"],[120618,1,\"ο\"],[120619,1,\"π\"],[120620,1,\"ρ\"],[120621,1,\"θ\"],[120622,1,\"σ\"],[120623,1,\"τ\"],[120624,1,\"υ\"],[120625,1,\"φ\"],[120626,1,\"χ\"],[120627,1,\"ψ\"],[120628,1,\"ω\"],[120629,1,\"∇\"],[120630,1,\"α\"],[120631,1,\"β\"],[120632,1,\"γ\"],[120633,1,\"δ\"],[120634,1,\"ε\"],[120635,1,\"ζ\"],[120636,1,\"η\"],[120637,1,\"θ\"],[120638,1,\"ι\"],[120639,1,\"κ\"],[120640,1,\"λ\"],[120641,1,\"μ\"],[120642,1,\"ν\"],[120643,1,\"ξ\"],[120644,1,\"ο\"],[120645,1,\"π\"],[120646,1,\"ρ\"],[[120647,120648],1,\"σ\"],[120649,1,\"τ\"],[120650,1,\"υ\"],[120651,1,\"φ\"],[120652,1,\"χ\"],[120653,1,\"ψ\"],[120654,1,\"ω\"],[120655,1,\"∂\"],[120656,1,\"ε\"],[120657,1,\"θ\"],[120658,1,\"κ\"],[120659,1,\"φ\"],[120660,1,\"ρ\"],[120661,1,\"π\"],[120662,1,\"α\"],[120663,1,\"β\"],[120664,1,\"γ\"],[120665,1,\"δ\"],[120666,1,\"ε\"],[120667,1,\"ζ\"],[120668,1,\"η\"],[120669,1,\"θ\"],[120670,1,\"ι\"],[120671,1,\"κ\"],[120672,1,\"λ\"],[120673,1,\"μ\"],[120674,1,\"ν\"],[120675,1,\"ξ\"],[120676,1,\"ο\"],[120677,1,\"π\"],[120678,1,\"ρ\"],[120679,1,\"θ\"],[120680,1,\"σ\"],[120681,1,\"τ\"],[120682,1,\"υ\"],[120683,1,\"φ\"],[120684,1,\"χ\"],[120685,1,\"ψ\"],[120686,1,\"ω\"],[120687,1,\"∇\"],[120688,1,\"α\"],[120689,1,\"β\"],[120690,1,\"γ\"],[120691,1,\"δ\"],[120692,1,\"ε\"],[120693,1,\"ζ\"],[120694,1,\"η\"],[120695,1,\"θ\"],[120696,1,\"ι\"],[120697,1,\"κ\"],[120698,1,\"λ\"],[120699,1,\"μ\"],[120700,1,\"ν\"],[120701,1,\"ξ\"],[120702,1,\"ο\"],[120703,1,\"π\"],[120704,1,\"ρ\"],[[120705,120706],1,\"σ\"],[120707,1,\"τ\"],[120708,1,\"υ\"],[120709,1,\"φ\"],[120710,1,\"χ\"],[120711,1,\"ψ\"],[120712,1,\"ω\"],[120713,1,\"∂\"],[120714,1,\"ε\"],[120715,1,\"θ\"],[120716,1,\"κ\"],[120717,1,\"φ\"],[120718,1,\"ρ\"],[120719,1,\"π\"],[120720,1,\"α\"],[120721,1,\"β\"],[120722,1,\"γ\"],[120723,1,\"δ\"],[120724,1,\"ε\"],[120725,1,\"ζ\"],[120726,1,\"η\"],[120727,1,\"θ\"],[120728,1,\"ι\"],[120729,1,\"κ\"],[120730,1,\"λ\"],[120731,1,\"μ\"],[120732,1,\"ν\"],[120733,1,\"ξ\"],[120734,1,\"ο\"],[120735,1,\"π\"],[120736,1,\"ρ\"],[120737,1,\"θ\"],[120738,1,\"σ\"],[120739,1,\"τ\"],[120740,1,\"υ\"],[120741,1,\"φ\"],[120742,1,\"χ\"],[120743,1,\"ψ\"],[120744,1,\"ω\"],[120745,1,\"∇\"],[120746,1,\"α\"],[120747,1,\"β\"],[120748,1,\"γ\"],[120749,1,\"δ\"],[120750,1,\"ε\"],[120751,1,\"ζ\"],[120752,1,\"η\"],[120753,1,\"θ\"],[120754,1,\"ι\"],[120755,1,\"κ\"],[120756,1,\"λ\"],[120757,1,\"μ\"],[120758,1,\"ν\"],[120759,1,\"ξ\"],[120760,1,\"ο\"],[120761,1,\"π\"],[120762,1,\"ρ\"],[[120763,120764],1,\"σ\"],[120765,1,\"τ\"],[120766,1,\"υ\"],[120767,1,\"φ\"],[120768,1,\"χ\"],[120769,1,\"ψ\"],[120770,1,\"ω\"],[120771,1,\"∂\"],[120772,1,\"ε\"],[120773,1,\"θ\"],[120774,1,\"κ\"],[120775,1,\"φ\"],[120776,1,\"ρ\"],[120777,1,\"π\"],[[120778,120779],1,\"ϝ\"],[[120780,120781],3],[120782,1,\"0\"],[120783,1,\"1\"],[120784,1,\"2\"],[120785,1,\"3\"],[120786,1,\"4\"],[120787,1,\"5\"],[120788,1,\"6\"],[120789,1,\"7\"],[120790,1,\"8\"],[120791,1,\"9\"],[120792,1,\"0\"],[120793,1,\"1\"],[120794,1,\"2\"],[120795,1,\"3\"],[120796,1,\"4\"],[120797,1,\"5\"],[120798,1,\"6\"],[120799,1,\"7\"],[120800,1,\"8\"],[120801,1,\"9\"],[120802,1,\"0\"],[120803,1,\"1\"],[120804,1,\"2\"],[120805,1,\"3\"],[120806,1,\"4\"],[120807,1,\"5\"],[120808,1,\"6\"],[120809,1,\"7\"],[120810,1,\"8\"],[120811,1,\"9\"],[120812,1,\"0\"],[120813,1,\"1\"],[120814,1,\"2\"],[120815,1,\"3\"],[120816,1,\"4\"],[120817,1,\"5\"],[120818,1,\"6\"],[120819,1,\"7\"],[120820,1,\"8\"],[120821,1,\"9\"],[120822,1,\"0\"],[120823,1,\"1\"],[120824,1,\"2\"],[120825,1,\"3\"],[120826,1,\"4\"],[120827,1,\"5\"],[120828,1,\"6\"],[120829,1,\"7\"],[120830,1,\"8\"],[120831,1,\"9\"],[[120832,121343],2],[[121344,121398],2],[[121399,121402],2],[[121403,121452],2],[[121453,121460],2],[121461,2],[[121462,121475],2],[121476,2],[[121477,121483],2],[[121484,121498],3],[[121499,121503],2],[121504,3],[[121505,121519],2],[[121520,122879],3],[[122880,122886],2],[122887,3],[[122888,122904],2],[[122905,122906],3],[[122907,122913],2],[122914,3],[[122915,122916],2],[122917,3],[[122918,122922],2],[[122923,123135],3],[[123136,123180],2],[[123181,123183],3],[[123184,123197],2],[[123198,123199],3],[[123200,123209],2],[[123210,123213],3],[123214,2],[123215,2],[[123216,123583],3],[[123584,123641],2],[[123642,123646],3],[123647,2],[[123648,124927],3],[[124928,125124],2],[[125125,125126],3],[[125127,125135],2],[[125136,125142],2],[[125143,125183],3],[125184,1,\"𞤢\"],[125185,1,\"𞤣\"],[125186,1,\"𞤤\"],[125187,1,\"𞤥\"],[125188,1,\"𞤦\"],[125189,1,\"𞤧\"],[125190,1,\"𞤨\"],[125191,1,\"𞤩\"],[125192,1,\"𞤪\"],[125193,1,\"𞤫\"],[125194,1,\"𞤬\"],[125195,1,\"𞤭\"],[125196,1,\"𞤮\"],[125197,1,\"𞤯\"],[125198,1,\"𞤰\"],[125199,1,\"𞤱\"],[125200,1,\"𞤲\"],[125201,1,\"𞤳\"],[125202,1,\"𞤴\"],[125203,1,\"𞤵\"],[125204,1,\"𞤶\"],[125205,1,\"𞤷\"],[125206,1,\"𞤸\"],[125207,1,\"𞤹\"],[125208,1,\"𞤺\"],[125209,1,\"𞤻\"],[125210,1,\"𞤼\"],[125211,1,\"𞤽\"],[125212,1,\"𞤾\"],[125213,1,\"𞤿\"],[125214,1,\"𞥀\"],[125215,1,\"𞥁\"],[125216,1,\"𞥂\"],[125217,1,\"𞥃\"],[[125218,125258],2],[125259,2],[[125260,125263],3],[[125264,125273],2],[[125274,125277],3],[[125278,125279],2],[[125280,126064],3],[[126065,126132],2],[[126133,126208],3],[[126209,126269],2],[[126270,126463],3],[126464,1,\"ا\"],[126465,1,\"ب\"],[126466,1,\"ج\"],[126467,1,\"د\"],[126468,3],[126469,1,\"و\"],[126470,1,\"ز\"],[126471,1,\"ح\"],[126472,1,\"ط\"],[126473,1,\"ي\"],[126474,1,\"ك\"],[126475,1,\"ل\"],[126476,1,\"م\"],[126477,1,\"ن\"],[126478,1,\"س\"],[126479,1,\"ع\"],[126480,1,\"ف\"],[126481,1,\"ص\"],[126482,1,\"ق\"],[126483,1,\"ر\"],[126484,1,\"ش\"],[126485,1,\"ت\"],[126486,1,\"ث\"],[126487,1,\"خ\"],[126488,1,\"ذ\"],[126489,1,\"ض\"],[126490,1,\"ظ\"],[126491,1,\"غ\"],[126492,1,\"ٮ\"],[126493,1,\"ں\"],[126494,1,\"ڡ\"],[126495,1,\"ٯ\"],[126496,3],[126497,1,\"ب\"],[126498,1,\"ج\"],[126499,3],[126500,1,\"ه\"],[[126501,126502],3],[126503,1,\"ح\"],[126504,3],[126505,1,\"ي\"],[126506,1,\"ك\"],[126507,1,\"ل\"],[126508,1,\"م\"],[126509,1,\"ن\"],[126510,1,\"س\"],[126511,1,\"ع\"],[126512,1,\"ف\"],[126513,1,\"ص\"],[126514,1,\"ق\"],[126515,3],[126516,1,\"ش\"],[126517,1,\"ت\"],[126518,1,\"ث\"],[126519,1,\"خ\"],[126520,3],[126521,1,\"ض\"],[126522,3],[126523,1,\"غ\"],[[126524,126529],3],[126530,1,\"ج\"],[[126531,126534],3],[126535,1,\"ح\"],[126536,3],[126537,1,\"ي\"],[126538,3],[126539,1,\"ل\"],[126540,3],[126541,1,\"ن\"],[126542,1,\"س\"],[126543,1,\"ع\"],[126544,3],[126545,1,\"ص\"],[126546,1,\"ق\"],[126547,3],[126548,1,\"ش\"],[[126549,126550],3],[126551,1,\"خ\"],[126552,3],[126553,1,\"ض\"],[126554,3],[126555,1,\"غ\"],[126556,3],[126557,1,\"ں\"],[126558,3],[126559,1,\"ٯ\"],[126560,3],[126561,1,\"ب\"],[126562,1,\"ج\"],[126563,3],[126564,1,\"ه\"],[[126565,126566],3],[126567,1,\"ح\"],[126568,1,\"ط\"],[126569,1,\"ي\"],[126570,1,\"ك\"],[126571,3],[126572,1,\"م\"],[126573,1,\"ن\"],[126574,1,\"س\"],[126575,1,\"ع\"],[126576,1,\"ف\"],[126577,1,\"ص\"],[126578,1,\"ق\"],[126579,3],[126580,1,\"ش\"],[126581,1,\"ت\"],[126582,1,\"ث\"],[126583,1,\"خ\"],[126584,3],[126585,1,\"ض\"],[126586,1,\"ظ\"],[126587,1,\"غ\"],[126588,1,\"ٮ\"],[126589,3],[126590,1,\"ڡ\"],[126591,3],[126592,1,\"ا\"],[126593,1,\"ب\"],[126594,1,\"ج\"],[126595,1,\"د\"],[126596,1,\"ه\"],[126597,1,\"و\"],[126598,1,\"ز\"],[126599,1,\"ح\"],[126600,1,\"ط\"],[126601,1,\"ي\"],[126602,3],[126603,1,\"ل\"],[126604,1,\"م\"],[126605,1,\"ن\"],[126606,1,\"س\"],[126607,1,\"ع\"],[126608,1,\"ف\"],[126609,1,\"ص\"],[126610,1,\"ق\"],[126611,1,\"ر\"],[126612,1,\"ش\"],[126613,1,\"ت\"],[126614,1,\"ث\"],[126615,1,\"خ\"],[126616,1,\"ذ\"],[126617,1,\"ض\"],[126618,1,\"ظ\"],[126619,1,\"غ\"],[[126620,126624],3],[126625,1,\"ب\"],[126626,1,\"ج\"],[126627,1,\"د\"],[126628,3],[126629,1,\"و\"],[126630,1,\"ز\"],[126631,1,\"ح\"],[126632,1,\"ط\"],[126633,1,\"ي\"],[126634,3],[126635,1,\"ل\"],[126636,1,\"م\"],[126637,1,\"ن\"],[126638,1,\"س\"],[126639,1,\"ع\"],[126640,1,\"ف\"],[126641,1,\"ص\"],[126642,1,\"ق\"],[126643,1,\"ر\"],[126644,1,\"ش\"],[126645,1,\"ت\"],[126646,1,\"ث\"],[126647,1,\"خ\"],[126648,1,\"ذ\"],[126649,1,\"ض\"],[126650,1,\"ظ\"],[126651,1,\"غ\"],[[126652,126703],3],[[126704,126705],2],[[126706,126975],3],[[126976,127019],2],[[127020,127023],3],[[127024,127123],2],[[127124,127135],3],[[127136,127150],2],[[127151,127152],3],[[127153,127166],2],[127167,2],[127168,3],[[127169,127183],2],[127184,3],[[127185,127199],2],[[127200,127221],2],[[127222,127231],3],[127232,3],[127233,5,\"0,\"],[127234,5,\"1,\"],[127235,5,\"2,\"],[127236,5,\"3,\"],[127237,5,\"4,\"],[127238,5,\"5,\"],[127239,5,\"6,\"],[127240,5,\"7,\"],[127241,5,\"8,\"],[127242,5,\"9,\"],[[127243,127244],2],[[127245,127247],3],[127248,5,\"(a)\"],[127249,5,\"(b)\"],[127250,5,\"(c)\"],[127251,5,\"(d)\"],[127252,5,\"(e)\"],[127253,5,\"(f)\"],[127254,5,\"(g)\"],[127255,5,\"(h)\"],[127256,5,\"(i)\"],[127257,5,\"(j)\"],[127258,5,\"(k)\"],[127259,5,\"(l)\"],[127260,5,\"(m)\"],[127261,5,\"(n)\"],[127262,5,\"(o)\"],[127263,5,\"(p)\"],[127264,5,\"(q)\"],[127265,5,\"(r)\"],[127266,5,\"(s)\"],[127267,5,\"(t)\"],[127268,5,\"(u)\"],[127269,5,\"(v)\"],[127270,5,\"(w)\"],[127271,5,\"(x)\"],[127272,5,\"(y)\"],[127273,5,\"(z)\"],[127274,1,\"〔s〕\"],[127275,1,\"c\"],[127276,1,\"r\"],[127277,1,\"cd\"],[127278,1,\"wz\"],[127279,2],[127280,1,\"a\"],[127281,1,\"b\"],[127282,1,\"c\"],[127283,1,\"d\"],[127284,1,\"e\"],[127285,1,\"f\"],[127286,1,\"g\"],[127287,1,\"h\"],[127288,1,\"i\"],[127289,1,\"j\"],[127290,1,\"k\"],[127291,1,\"l\"],[127292,1,\"m\"],[127293,1,\"n\"],[127294,1,\"o\"],[127295,1,\"p\"],[127296,1,\"q\"],[127297,1,\"r\"],[127298,1,\"s\"],[127299,1,\"t\"],[127300,1,\"u\"],[127301,1,\"v\"],[127302,1,\"w\"],[127303,1,\"x\"],[127304,1,\"y\"],[127305,1,\"z\"],[127306,1,\"hv\"],[127307,1,\"mv\"],[127308,1,\"sd\"],[127309,1,\"ss\"],[127310,1,\"ppv\"],[127311,1,\"wc\"],[[127312,127318],2],[127319,2],[[127320,127326],2],[127327,2],[[127328,127337],2],[127338,1,\"mc\"],[127339,1,\"md\"],[127340,1,\"mr\"],[[127341,127343],3],[[127344,127352],2],[127353,2],[127354,2],[[127355,127356],2],[[127357,127358],2],[127359,2],[[127360,127369],2],[[127370,127373],2],[[127374,127375],2],[127376,1,\"dj\"],[[127377,127386],2],[[127387,127404],2],[[127405,127461],3],[[127462,127487],2],[127488,1,\"ほか\"],[127489,1,\"ココ\"],[127490,1,\"サ\"],[[127491,127503],3],[127504,1,\"手\"],[127505,1,\"字\"],[127506,1,\"双\"],[127507,1,\"デ\"],[127508,1,\"二\"],[127509,1,\"多\"],[127510,1,\"解\"],[127511,1,\"天\"],[127512,1,\"交\"],[127513,1,\"映\"],[127514,1,\"無\"],[127515,1,\"料\"],[127516,1,\"前\"],[127517,1,\"後\"],[127518,1,\"再\"],[127519,1,\"新\"],[127520,1,\"初\"],[127521,1,\"終\"],[127522,1,\"生\"],[127523,1,\"販\"],[127524,1,\"声\"],[127525,1,\"吹\"],[127526,1,\"演\"],[127527,1,\"投\"],[127528,1,\"捕\"],[127529,1,\"一\"],[127530,1,\"三\"],[127531,1,\"遊\"],[127532,1,\"左\"],[127533,1,\"中\"],[127534,1,\"右\"],[127535,1,\"指\"],[127536,1,\"走\"],[127537,1,\"打\"],[127538,1,\"禁\"],[127539,1,\"空\"],[127540,1,\"合\"],[127541,1,\"満\"],[127542,1,\"有\"],[127543,1,\"月\"],[127544,1,\"申\"],[127545,1,\"割\"],[127546,1,\"営\"],[127547,1,\"配\"],[[127548,127551],3],[127552,1,\"〔本〕\"],[127553,1,\"〔三〕\"],[127554,1,\"〔二〕\"],[127555,1,\"〔安〕\"],[127556,1,\"〔点〕\"],[127557,1,\"〔打〕\"],[127558,1,\"〔盗〕\"],[127559,1,\"〔勝〕\"],[127560,1,\"〔敗〕\"],[[127561,127567],3],[127568,1,\"得\"],[127569,1,\"可\"],[[127570,127583],3],[[127584,127589],2],[[127590,127743],3],[[127744,127776],2],[[127777,127788],2],[[127789,127791],2],[[127792,127797],2],[127798,2],[[127799,127868],2],[127869,2],[[127870,127871],2],[[127872,127891],2],[[127892,127903],2],[[127904,127940],2],[127941,2],[[127942,127946],2],[[127947,127950],2],[[127951,127955],2],[[127956,127967],2],[[127968,127984],2],[[127985,127991],2],[[127992,127999],2],[[128000,128062],2],[128063,2],[128064,2],[128065,2],[[128066,128247],2],[128248,2],[[128249,128252],2],[[128253,128254],2],[128255,2],[[128256,128317],2],[[128318,128319],2],[[128320,128323],2],[[128324,128330],2],[[128331,128335],2],[[128336,128359],2],[[128360,128377],2],[128378,2],[[128379,128419],2],[128420,2],[[128421,128506],2],[[128507,128511],2],[128512,2],[[128513,128528],2],[128529,2],[[128530,128532],2],[128533,2],[128534,2],[128535,2],[128536,2],[128537,2],[128538,2],[128539,2],[[128540,128542],2],[128543,2],[[128544,128549],2],[[128550,128551],2],[[128552,128555],2],[128556,2],[128557,2],[[128558,128559],2],[[128560,128563],2],[128564,2],[[128565,128576],2],[[128577,128578],2],[[128579,128580],2],[[128581,128591],2],[[128592,128639],2],[[128640,128709],2],[[128710,128719],2],[128720,2],[[128721,128722],2],[[128723,128724],2],[128725,2],[[128726,128735],3],[[128736,128748],2],[[128749,128751],3],[[128752,128755],2],[[128756,128758],2],[[128759,128760],2],[128761,2],[128762,2],[[128763,128767],3],[[128768,128883],2],[[128884,128895],3],[[128896,128980],2],[[128981,128984],2],[[128985,128991],3],[[128992,129003],2],[[129004,129023],3],[[129024,129035],2],[[129036,129039],3],[[129040,129095],2],[[129096,129103],3],[[129104,129113],2],[[129114,129119],3],[[129120,129159],2],[[129160,129167],3],[[129168,129197],2],[[129198,129279],3],[[129280,129291],2],[129292,3],[[129293,129295],2],[[129296,129304],2],[[129305,129310],2],[129311,2],[[129312,129319],2],[[129320,129327],2],[129328,2],[[129329,129330],2],[[129331,129342],2],[129343,2],[[129344,129355],2],[129356,2],[[129357,129359],2],[[129360,129374],2],[[129375,129387],2],[[129388,129392],2],[129393,2],[129394,3],[[129395,129398],2],[[129399,129401],3],[129402,2],[129403,2],[[129404,129407],2],[[129408,129412],2],[[129413,129425],2],[[129426,129431],2],[[129432,129442],2],[[129443,129444],3],[[129445,129450],2],[[129451,129453],3],[[129454,129455],2],[[129456,129465],2],[[129466,129471],2],[129472,2],[[129473,129474],2],[[129475,129482],2],[[129483,129484],3],[[129485,129487],2],[[129488,129510],2],[[129511,129535],2],[[129536,129619],2],[[129620,129631],3],[[129632,129645],2],[[129646,129647],3],[[129648,129651],2],[[129652,129655],3],[[129656,129658],2],[[129659,129663],3],[[129664,129666],2],[[129667,129679],3],[[129680,129685],2],[[129686,131069],3],[[131070,131071],3],[[131072,173782],2],[[173783,173823],3],[[173824,177972],2],[[177973,177983],3],[[177984,178205],2],[[178206,178207],3],[[178208,183969],2],[[183970,183983],3],[[183984,191456],2],[[191457,194559],3],[194560,1,\"丽\"],[194561,1,\"丸\"],[194562,1,\"乁\"],[194563,1,\"𠄢\"],[194564,1,\"你\"],[194565,1,\"侮\"],[194566,1,\"侻\"],[194567,1,\"倂\"],[194568,1,\"偺\"],[194569,1,\"備\"],[194570,1,\"僧\"],[194571,1,\"像\"],[194572,1,\"㒞\"],[194573,1,\"𠘺\"],[194574,1,\"免\"],[194575,1,\"兔\"],[194576,1,\"兤\"],[194577,1,\"具\"],[194578,1,\"𠔜\"],[194579,1,\"㒹\"],[194580,1,\"內\"],[194581,1,\"再\"],[194582,1,\"𠕋\"],[194583,1,\"冗\"],[194584,1,\"冤\"],[194585,1,\"仌\"],[194586,1,\"冬\"],[194587,1,\"况\"],[194588,1,\"𩇟\"],[194589,1,\"凵\"],[194590,1,\"刃\"],[194591,1,\"㓟\"],[194592,1,\"刻\"],[194593,1,\"剆\"],[194594,1,\"割\"],[194595,1,\"剷\"],[194596,1,\"㔕\"],[194597,1,\"勇\"],[194598,1,\"勉\"],[194599,1,\"勤\"],[194600,1,\"勺\"],[194601,1,\"包\"],[194602,1,\"匆\"],[194603,1,\"北\"],[194604,1,\"卉\"],[194605,1,\"卑\"],[194606,1,\"博\"],[194607,1,\"即\"],[194608,1,\"卽\"],[[194609,194611],1,\"卿\"],[194612,1,\"𠨬\"],[194613,1,\"灰\"],[194614,1,\"及\"],[194615,1,\"叟\"],[194616,1,\"𠭣\"],[194617,1,\"叫\"],[194618,1,\"叱\"],[194619,1,\"吆\"],[194620,1,\"咞\"],[194621,1,\"吸\"],[194622,1,\"呈\"],[194623,1,\"周\"],[194624,1,\"咢\"],[194625,1,\"哶\"],[194626,1,\"唐\"],[194627,1,\"啓\"],[194628,1,\"啣\"],[[194629,194630],1,\"善\"],[194631,1,\"喙\"],[194632,1,\"喫\"],[194633,1,\"喳\"],[194634,1,\"嗂\"],[194635,1,\"圖\"],[194636,1,\"嘆\"],[194637,1,\"圗\"],[194638,1,\"噑\"],[194639,1,\"噴\"],[194640,1,\"切\"],[194641,1,\"壮\"],[194642,1,\"城\"],[194643,1,\"埴\"],[194644,1,\"堍\"],[194645,1,\"型\"],[194646,1,\"堲\"],[194647,1,\"報\"],[194648,1,\"墬\"],[194649,1,\"𡓤\"],[194650,1,\"売\"],[194651,1,\"壷\"],[194652,1,\"夆\"],[194653,1,\"多\"],[194654,1,\"夢\"],[194655,1,\"奢\"],[194656,1,\"𡚨\"],[194657,1,\"𡛪\"],[194658,1,\"姬\"],[194659,1,\"娛\"],[194660,1,\"娧\"],[194661,1,\"姘\"],[194662,1,\"婦\"],[194663,1,\"㛮\"],[194664,3],[194665,1,\"嬈\"],[[194666,194667],1,\"嬾\"],[194668,1,\"𡧈\"],[194669,1,\"寃\"],[194670,1,\"寘\"],[194671,1,\"寧\"],[194672,1,\"寳\"],[194673,1,\"𡬘\"],[194674,1,\"寿\"],[194675,1,\"将\"],[194676,3],[194677,1,\"尢\"],[194678,1,\"㞁\"],[194679,1,\"屠\"],[194680,1,\"屮\"],[194681,1,\"峀\"],[194682,1,\"岍\"],[194683,1,\"𡷤\"],[194684,1,\"嵃\"],[194685,1,\"𡷦\"],[194686,1,\"嵮\"],[194687,1,\"嵫\"],[194688,1,\"嵼\"],[194689,1,\"巡\"],[194690,1,\"巢\"],[194691,1,\"㠯\"],[194692,1,\"巽\"],[194693,1,\"帨\"],[194694,1,\"帽\"],[194695,1,\"幩\"],[194696,1,\"㡢\"],[194697,1,\"𢆃\"],[194698,1,\"㡼\"],[194699,1,\"庰\"],[194700,1,\"庳\"],[194701,1,\"庶\"],[194702,1,\"廊\"],[194703,1,\"𪎒\"],[194704,1,\"廾\"],[[194705,194706],1,\"𢌱\"],[194707,1,\"舁\"],[[194708,194709],1,\"弢\"],[194710,1,\"㣇\"],[194711,1,\"𣊸\"],[194712,1,\"𦇚\"],[194713,1,\"形\"],[194714,1,\"彫\"],[194715,1,\"㣣\"],[194716,1,\"徚\"],[194717,1,\"忍\"],[194718,1,\"志\"],[194719,1,\"忹\"],[194720,1,\"悁\"],[194721,1,\"㤺\"],[194722,1,\"㤜\"],[194723,1,\"悔\"],[194724,1,\"𢛔\"],[194725,1,\"惇\"],[194726,1,\"慈\"],[194727,1,\"慌\"],[194728,1,\"慎\"],[194729,1,\"慌\"],[194730,1,\"慺\"],[194731,1,\"憎\"],[194732,1,\"憲\"],[194733,1,\"憤\"],[194734,1,\"憯\"],[194735,1,\"懞\"],[194736,1,\"懲\"],[194737,1,\"懶\"],[194738,1,\"成\"],[194739,1,\"戛\"],[194740,1,\"扝\"],[194741,1,\"抱\"],[194742,1,\"拔\"],[194743,1,\"捐\"],[194744,1,\"𢬌\"],[194745,1,\"挽\"],[194746,1,\"拼\"],[194747,1,\"捨\"],[194748,1,\"掃\"],[194749,1,\"揤\"],[194750,1,\"𢯱\"],[194751,1,\"搢\"],[194752,1,\"揅\"],[194753,1,\"掩\"],[194754,1,\"㨮\"],[194755,1,\"摩\"],[194756,1,\"摾\"],[194757,1,\"撝\"],[194758,1,\"摷\"],[194759,1,\"㩬\"],[194760,1,\"敏\"],[194761,1,\"敬\"],[194762,1,\"𣀊\"],[194763,1,\"旣\"],[194764,1,\"書\"],[194765,1,\"晉\"],[194766,1,\"㬙\"],[194767,1,\"暑\"],[194768,1,\"㬈\"],[194769,1,\"㫤\"],[194770,1,\"冒\"],[194771,1,\"冕\"],[194772,1,\"最\"],[194773,1,\"暜\"],[194774,1,\"肭\"],[194775,1,\"䏙\"],[194776,1,\"朗\"],[194777,1,\"望\"],[194778,1,\"朡\"],[194779,1,\"杞\"],[194780,1,\"杓\"],[194781,1,\"𣏃\"],[194782,1,\"㭉\"],[194783,1,\"柺\"],[194784,1,\"枅\"],[194785,1,\"桒\"],[194786,1,\"梅\"],[194787,1,\"𣑭\"],[194788,1,\"梎\"],[194789,1,\"栟\"],[194790,1,\"椔\"],[194791,1,\"㮝\"],[194792,1,\"楂\"],[194793,1,\"榣\"],[194794,1,\"槪\"],[194795,1,\"檨\"],[194796,1,\"𣚣\"],[194797,1,\"櫛\"],[194798,1,\"㰘\"],[194799,1,\"次\"],[194800,1,\"𣢧\"],[194801,1,\"歔\"],[194802,1,\"㱎\"],[194803,1,\"歲\"],[194804,1,\"殟\"],[194805,1,\"殺\"],[194806,1,\"殻\"],[194807,1,\"𣪍\"],[194808,1,\"𡴋\"],[194809,1,\"𣫺\"],[194810,1,\"汎\"],[194811,1,\"𣲼\"],[194812,1,\"沿\"],[194813,1,\"泍\"],[194814,1,\"汧\"],[194815,1,\"洖\"],[194816,1,\"派\"],[194817,1,\"海\"],[194818,1,\"流\"],[194819,1,\"浩\"],[194820,1,\"浸\"],[194821,1,\"涅\"],[194822,1,\"𣴞\"],[194823,1,\"洴\"],[194824,1,\"港\"],[194825,1,\"湮\"],[194826,1,\"㴳\"],[194827,1,\"滋\"],[194828,1,\"滇\"],[194829,1,\"𣻑\"],[194830,1,\"淹\"],[194831,1,\"潮\"],[194832,1,\"𣽞\"],[194833,1,\"𣾎\"],[194834,1,\"濆\"],[194835,1,\"瀹\"],[194836,1,\"瀞\"],[194837,1,\"瀛\"],[194838,1,\"㶖\"],[194839,1,\"灊\"],[194840,1,\"災\"],[194841,1,\"灷\"],[194842,1,\"炭\"],[194843,1,\"𠔥\"],[194844,1,\"煅\"],[194845,1,\"𤉣\"],[194846,1,\"熜\"],[194847,3],[194848,1,\"爨\"],[194849,1,\"爵\"],[194850,1,\"牐\"],[194851,1,\"𤘈\"],[194852,1,\"犀\"],[194853,1,\"犕\"],[194854,1,\"𤜵\"],[194855,1,\"𤠔\"],[194856,1,\"獺\"],[194857,1,\"王\"],[194858,1,\"㺬\"],[194859,1,\"玥\"],[[194860,194861],1,\"㺸\"],[194862,1,\"瑇\"],[194863,1,\"瑜\"],[194864,1,\"瑱\"],[194865,1,\"璅\"],[194866,1,\"瓊\"],[194867,1,\"㼛\"],[194868,1,\"甤\"],[194869,1,\"𤰶\"],[194870,1,\"甾\"],[194871,1,\"𤲒\"],[194872,1,\"異\"],[194873,1,\"𢆟\"],[194874,1,\"瘐\"],[194875,1,\"𤾡\"],[194876,1,\"𤾸\"],[194877,1,\"𥁄\"],[194878,1,\"㿼\"],[194879,1,\"䀈\"],[194880,1,\"直\"],[194881,1,\"𥃳\"],[194882,1,\"𥃲\"],[194883,1,\"𥄙\"],[194884,1,\"𥄳\"],[194885,1,\"眞\"],[[194886,194887],1,\"真\"],[194888,1,\"睊\"],[194889,1,\"䀹\"],[194890,1,\"瞋\"],[194891,1,\"䁆\"],[194892,1,\"䂖\"],[194893,1,\"𥐝\"],[194894,1,\"硎\"],[194895,1,\"碌\"],[194896,1,\"磌\"],[194897,1,\"䃣\"],[194898,1,\"𥘦\"],[194899,1,\"祖\"],[194900,1,\"𥚚\"],[194901,1,\"𥛅\"],[194902,1,\"福\"],[194903,1,\"秫\"],[194904,1,\"䄯\"],[194905,1,\"穀\"],[194906,1,\"穊\"],[194907,1,\"穏\"],[194908,1,\"𥥼\"],[[194909,194910],1,\"𥪧\"],[194911,3],[194912,1,\"䈂\"],[194913,1,\"𥮫\"],[194914,1,\"篆\"],[194915,1,\"築\"],[194916,1,\"䈧\"],[194917,1,\"𥲀\"],[194918,1,\"糒\"],[194919,1,\"䊠\"],[194920,1,\"糨\"],[194921,1,\"糣\"],[194922,1,\"紀\"],[194923,1,\"𥾆\"],[194924,1,\"絣\"],[194925,1,\"䌁\"],[194926,1,\"緇\"],[194927,1,\"縂\"],[194928,1,\"繅\"],[194929,1,\"䌴\"],[194930,1,\"𦈨\"],[194931,1,\"𦉇\"],[194932,1,\"䍙\"],[194933,1,\"𦋙\"],[194934,1,\"罺\"],[194935,1,\"𦌾\"],[194936,1,\"羕\"],[194937,1,\"翺\"],[194938,1,\"者\"],[194939,1,\"𦓚\"],[194940,1,\"𦔣\"],[194941,1,\"聠\"],[194942,1,\"𦖨\"],[194943,1,\"聰\"],[194944,1,\"𣍟\"],[194945,1,\"䏕\"],[194946,1,\"育\"],[194947,1,\"脃\"],[194948,1,\"䐋\"],[194949,1,\"脾\"],[194950,1,\"媵\"],[194951,1,\"𦞧\"],[194952,1,\"𦞵\"],[194953,1,\"𣎓\"],[194954,1,\"𣎜\"],[194955,1,\"舁\"],[194956,1,\"舄\"],[194957,1,\"辞\"],[194958,1,\"䑫\"],[194959,1,\"芑\"],[194960,1,\"芋\"],[194961,1,\"芝\"],[194962,1,\"劳\"],[194963,1,\"花\"],[194964,1,\"芳\"],[194965,1,\"芽\"],[194966,1,\"苦\"],[194967,1,\"𦬼\"],[194968,1,\"若\"],[194969,1,\"茝\"],[194970,1,\"荣\"],[194971,1,\"莭\"],[194972,1,\"茣\"],[194973,1,\"莽\"],[194974,1,\"菧\"],[194975,1,\"著\"],[194976,1,\"荓\"],[194977,1,\"菊\"],[194978,1,\"菌\"],[194979,1,\"菜\"],[194980,1,\"𦰶\"],[194981,1,\"𦵫\"],[194982,1,\"𦳕\"],[194983,1,\"䔫\"],[194984,1,\"蓱\"],[194985,1,\"蓳\"],[194986,1,\"蔖\"],[194987,1,\"𧏊\"],[194988,1,\"蕤\"],[194989,1,\"𦼬\"],[194990,1,\"䕝\"],[194991,1,\"䕡\"],[194992,1,\"𦾱\"],[194993,1,\"𧃒\"],[194994,1,\"䕫\"],[194995,1,\"虐\"],[194996,1,\"虜\"],[194997,1,\"虧\"],[194998,1,\"虩\"],[194999,1,\"蚩\"],[195000,1,\"蚈\"],[195001,1,\"蜎\"],[195002,1,\"蛢\"],[195003,1,\"蝹\"],[195004,1,\"蜨\"],[195005,1,\"蝫\"],[195006,1,\"螆\"],[195007,3],[195008,1,\"蟡\"],[195009,1,\"蠁\"],[195010,1,\"䗹\"],[195011,1,\"衠\"],[195012,1,\"衣\"],[195013,1,\"𧙧\"],[195014,1,\"裗\"],[195015,1,\"裞\"],[195016,1,\"䘵\"],[195017,1,\"裺\"],[195018,1,\"㒻\"],[195019,1,\"𧢮\"],[195020,1,\"𧥦\"],[195021,1,\"䚾\"],[195022,1,\"䛇\"],[195023,1,\"誠\"],[195024,1,\"諭\"],[195025,1,\"變\"],[195026,1,\"豕\"],[195027,1,\"𧲨\"],[195028,1,\"貫\"],[195029,1,\"賁\"],[195030,1,\"贛\"],[195031,1,\"起\"],[195032,1,\"𧼯\"],[195033,1,\"𠠄\"],[195034,1,\"跋\"],[195035,1,\"趼\"],[195036,1,\"跰\"],[195037,1,\"𠣞\"],[195038,1,\"軔\"],[195039,1,\"輸\"],[195040,1,\"𨗒\"],[195041,1,\"𨗭\"],[195042,1,\"邔\"],[195043,1,\"郱\"],[195044,1,\"鄑\"],[195045,1,\"𨜮\"],[195046,1,\"鄛\"],[195047,1,\"鈸\"],[195048,1,\"鋗\"],[195049,1,\"鋘\"],[195050,1,\"鉼\"],[195051,1,\"鏹\"],[195052,1,\"鐕\"],[195053,1,\"𨯺\"],[195054,1,\"開\"],[195055,1,\"䦕\"],[195056,1,\"閷\"],[195057,1,\"𨵷\"],[195058,1,\"䧦\"],[195059,1,\"雃\"],[195060,1,\"嶲\"],[195061,1,\"霣\"],[195062,1,\"𩅅\"],[195063,1,\"𩈚\"],[195064,1,\"䩮\"],[195065,1,\"䩶\"],[195066,1,\"韠\"],[195067,1,\"𩐊\"],[195068,1,\"䪲\"],[195069,1,\"𩒖\"],[[195070,195071],1,\"頋\"],[195072,1,\"頩\"],[195073,1,\"𩖶\"],[195074,1,\"飢\"],[195075,1,\"䬳\"],[195076,1,\"餩\"],[195077,1,\"馧\"],[195078,1,\"駂\"],[195079,1,\"駾\"],[195080,1,\"䯎\"],[195081,1,\"𩬰\"],[195082,1,\"鬒\"],[195083,1,\"鱀\"],[195084,1,\"鳽\"],[195085,1,\"䳎\"],[195086,1,\"䳭\"],[195087,1,\"鵧\"],[195088,1,\"𪃎\"],[195089,1,\"䳸\"],[195090,1,\"𪄅\"],[195091,1,\"𪈎\"],[195092,1,\"𪊑\"],[195093,1,\"麻\"],[195094,1,\"䵖\"],[195095,1,\"黹\"],[195096,1,\"黾\"],[195097,1,\"鼅\"],[195098,1,\"鼏\"],[195099,1,\"鼖\"],[195100,1,\"鼻\"],[195101,1,\"𪘀\"],[[195102,196605],3],[[196606,196607],3],[[196608,262141],3],[[262142,262143],3],[[262144,327677],3],[[327678,327679],3],[[327680,393213],3],[[393214,393215],3],[[393216,458749],3],[[458750,458751],3],[[458752,524285],3],[[524286,524287],3],[[524288,589821],3],[[589822,589823],3],[[589824,655357],3],[[655358,655359],3],[[655360,720893],3],[[720894,720895],3],[[720896,786429],3],[[786430,786431],3],[[786432,851965],3],[[851966,851967],3],[[851968,917501],3],[[917502,917503],3],[917504,3],[917505,3],[[917506,917535],3],[[917536,917631],3],[[917632,917759],3],[[917760,917999],7],[[918000,983037],3],[[983038,983039],3],[[983040,1048573],3],[[1048574,1048575],3],[[1048576,1114109],3],[[1114110,1114111],3]]");

/***/ }),

/***/ 4293:
/***/ ((module) => {

"use strict";
module.exports = require("buffer");;

/***/ }),

/***/ 5747:
/***/ ((module) => {

"use strict";
module.exports = require("fs");;

/***/ }),

/***/ 8605:
/***/ ((module) => {

"use strict";
module.exports = require("http");;

/***/ }),

/***/ 7211:
/***/ ((module) => {

"use strict";
module.exports = require("https");;

/***/ }),

/***/ 2087:
/***/ ((module) => {

"use strict";
module.exports = require("os");;

/***/ }),

/***/ 5622:
/***/ ((module) => {

"use strict";
module.exports = require("path");;

/***/ }),

/***/ 630:
/***/ ((module) => {

"use strict";
module.exports = require("perf_hooks");;

/***/ }),

/***/ 4213:
/***/ ((module) => {

"use strict";
module.exports = require("punycode");;

/***/ }),

/***/ 2413:
/***/ ((module) => {

"use strict";
module.exports = require("stream");;

/***/ }),

/***/ 3867:
/***/ ((module) => {

"use strict";
module.exports = require("tty");;

/***/ }),

/***/ 8835:
/***/ ((module) => {

"use strict";
module.exports = require("url");;

/***/ }),

/***/ 1669:
/***/ ((module) => {

"use strict";
module.exports = require("util");;

/***/ }),

/***/ 8761:
/***/ ((module) => {

"use strict";
module.exports = require("zlib");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	__webpack_require__.ab = __dirname + "/";/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(3109);
/******/ })()
;
//# sourceMappingURL=index.js.map