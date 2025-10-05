import { writable } from 'svelte/store';

export const visitedSections = writable<Set<number>>(new Set());

export function markSectionVisited(sectionIndex: number) {
    visitedSections.update(set => {
        set.add(sectionIndex);
        return set;
    });
}

export function isSectionVisited(sectionIndex: number): boolean {
    let visited = false;
    visitedSections.subscribe(set => {
        visited = set.has(sectionIndex);
    })();
    return visited;
}
