export function findCategoryById(categories, id) {
    for (const row of categories) {
        if (row.id === parseInt(id)) return row;
        if (row.children) {
            const found = findCategoryById(row.children, id);
            if (found) return found;
        }
    }
    return null;
}
