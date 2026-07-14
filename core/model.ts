export interface HeaderRule {
  name: string;
  value: string;
  enabled: boolean;
}

export interface ExcludeFilter {
  pattern: string;
  enabled: boolean;
}

export interface Profile {
  title: string;
  enabled: boolean;
  useGlobalFilters: boolean;
  requestHeaders: HeaderRule[];
  responseHeaders: HeaderRule[];
}

export interface Config {
  profiles: Profile[];
  selectedProfileIndex: number;
  globalExcludeFilters: ExcludeFilter[];
}

type FieldSpec<T> = {
  [K in keyof T]-?: {
    fallback: () => T[K];
    coerce: (raw: unknown) => T[K] | undefined;
  };
};

function build<T>(spec: FieldSpec<T>, overrides: Partial<T> = {}): T {
  const out = {} as Record<keyof T, unknown>;
  for (const key of Object.keys(spec) as (keyof T)[]) {
    const override = overrides[key];
    out[key] = override !== undefined ? override : spec[key].fallback();
  }
  return out as T;
}

function normalize<T>(spec: FieldSpec<T>, raw: unknown): T {
  const source = (raw ?? {}) as Record<keyof T, unknown>;
  const overrides: Partial<T> = {};
  for (const key of Object.keys(spec) as (keyof T)[]) {
    overrides[key] = spec[key].coerce(source[key]);
  }
  return build(spec, overrides);
}

function asString(raw: unknown): string | undefined {
  return typeof raw === 'string' ? raw : undefined;
}

function asBoolean(raw: unknown): boolean | undefined {
  return typeof raw === 'boolean' ? raw : undefined;
}

function asNumber(raw: unknown): number | undefined {
  return typeof raw === 'number' ? raw : undefined;
}

function toArray<T>(value: unknown): T[] {
  if (Array.isArray(value))
    return value as T[];
  if (typeof value === 'object' && value !== null)
    return Object.values(value) as T[];
  return [];
}

const headerRuleSpec: FieldSpec<HeaderRule> = {
  name: { fallback: () => '', coerce: asString },
  value: { fallback: () => '', coerce: asString },
  enabled: { fallback: () => true, coerce: asBoolean },
};

const excludeFilterSpec: FieldSpec<ExcludeFilter> = {
  pattern: { fallback: () => '', coerce: asString },
  enabled: { fallback: () => true, coerce: asBoolean },
};

const profileSpec: FieldSpec<Profile> = {
  title: { fallback: () => 'Profile 1', coerce: asString },
  enabled: { fallback: () => true, coerce: asBoolean },
  useGlobalFilters: { fallback: () => true, coerce: asBoolean },
  requestHeaders: { fallback: () => [], coerce: raw => toArray<HeaderRule>(raw) },
  responseHeaders: { fallback: () => [], coerce: raw => toArray<HeaderRule>(raw) },
};

const configSpec: FieldSpec<Config> = {
  profiles: { fallback: () => [createProfile()], coerce: raw => toArray<unknown>(raw).map(normalizeProfile) },
  selectedProfileIndex: { fallback: () => 0, coerce: asNumber },
  globalExcludeFilters: {
    fallback: () => [],
    coerce: raw => toArray<unknown>(raw).map(f => normalize(excludeFilterSpec, f)),
  },
};

export function createHeaderRule(overrides: Partial<HeaderRule> = {}): HeaderRule {
  return build(headerRuleSpec, overrides);
}

export function createExcludeFilter(overrides: Partial<ExcludeFilter> = {}): ExcludeFilter {
  return build(excludeFilterSpec, overrides);
}

export function createProfile(overrides: Partial<Profile> = {}): Profile {
  return build(profileSpec, overrides);
}

export function createConfig(overrides: Partial<Config> = {}): Config {
  return build(configSpec, overrides);
}

export function normalizeProfile(raw: unknown): Profile {
  return normalize(profileSpec, raw);
}

export function normalizeConfig(raw: unknown): Config {
  const config = normalize(configSpec, raw);
  if (config.profiles.length === 0)
    config.profiles = [createProfile()];
  const inRange = config.selectedProfileIndex >= 0 && config.selectedProfileIndex < config.profiles.length;
  if (!inRange)
    config.selectedProfileIndex = 0;
  return config;
}

export function selectedProfile(config: Config): Profile | undefined {
  return config.profiles[config.selectedProfileIndex];
}
