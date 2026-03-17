'use strict';

export enum Games {
  csgo = 'csgo',
  cs2 = 'cs2',
}

export enum StorageStrategies {
  raw = 'raw',
  overlayfs = 'overlayfs',
}

export enum StatusReasons {
  created = 'created',
  updated = 'updated',
  deleted = 'deleted',
  modified = 'modified',
  unknown = 'unknown',
}

export enum SourceRefTypes {
  url = 'url',
  urlFromUrl = 'url-from-url',
  git = 'git',
  container = 'container',
  steamcmd = 'steamcmd',
}

/**
 * SourceRef defines the source from which to fetch the overlay files
 */
export interface SourceRef {
  /**
   * Type of source (url, url-from-url, git, container, steamcmd)
   */
  type: SourceRefTypes;

  /**
   * URL source configuration
   */
  url?: UrlSource;

  /**
   * URL-from-URL source configuration
   */
  urlFromUrl?: UrlFromUrlSource;

  /**
   * Git source configuration
   */
  git?: GitSource;

  /**
   * Container source configuration
   */
  container?: ContainerSource;

  /**
   * SteamCMD source configuration
   */
  steamcmd?: SteamCmdSource;
}

/**
 * UrlSource defines a source that fetches a tar.gz from a URL
 */
export interface UrlSource {
  /**
   * URL to fetch the tar.gz file from
   */
  url: string;
}

/**
 * UrlFromUrlSource defines a source that fetches a URL which returns another URL to fetch a tar.gz
 */
export interface UrlFromUrlSource {
  /**
   * URL that returns another URL to fetch the tar.gz file from
   */
  url: string;
}

/**
 * GitSource defines a source that fetches files from a Git repository
 */
export interface GitSource {
  /**
   * Git repository URL
   */
  repository: string;

  /**
   * Git reference (branch, tag, or commit hash)
   */
  ref?: string;

  /**
   * Path within the repository to use as the source
   */
  path?: string;
}

/**
 * ContainerSource defines a source that fetches files from a container image
 */
export interface ContainerSource {
  /**
   * Container image name
   */
  image: string;

  /**
   * Path within the container to use as the source
   */
  path?: string;
}

/**
 * SteamCmdSource defines a source that fetches files using SteamCMD
 */
export interface SteamCmdSource {
  /**
   * Steam application ID
   */
  appid: string;

  /**
   * Whether to download anonymously (default true)
   */
  anonymousDownload?: boolean;
}
