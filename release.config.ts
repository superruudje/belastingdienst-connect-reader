module.exports = {
    branches: ["main"],
    plugins: [
        [
            '@semantic-release/commit-analyzer',
            {
                preset: 'conventionalcommits',
                // Skip release for commits like 'docs', 'chore', 'style'.
                ignore: ['docs', 'chore', 'style'],
            },
        ],
        "@semantic-release/release-notes-generator",
        "@semantic-release/changelog",
        "@semantic-release/npm",
        [
            "@semantic-release/git",
            {
                assets: ["CHANGELOG.md", "package.json"],
                message: "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
            },
        ],
        "@semantic-release/github",
    ],
};