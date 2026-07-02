# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- 内部パフォーマンス改善（生成出力は不変）: split ハンドラの test 生成で spec 全体の解析をファイルごとに再実行していたのを 1 回に集約、循環スキーマ検出 3 実装を反復 Tarjan（O(V+E)、深い `$ref` チェーンでもスタックオーバーフローしない）に統一、コンポーネントスキーマの依存解析を単一バッチ parse 化、`routeCode` の request 生成二重実行を解消

### Fixed

- query hooks 生成で「引数なし操作 + `x-pagination`」のファイル（split 単独ファイル・全操作引数なしの一枚もの）が `InferRequestType` を import せず TS2304 になるバグを修正。`hono/client` の type import ゲートが引数有無しか見ておらず、infinite hook の `pagination.getRequestArgs` が常に参照する `InferRequestType` を取りこぼしていた
