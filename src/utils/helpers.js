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
export function isValidCategoryPath(categories, pathParams) {
    let currentLevel = categories;

    for (const idStr of pathParams) {
        const id = parseInt(idStr);
        if (isNaN(id)) return false;

        const found = currentLevel.find((cat) => cat.id === id);
        if (!found) return false;

        currentLevel = found.children || [];
    }

    return true;
}
export function resolveCategoryPath(categories, pathParams) {
    const path = [];
    let currentLevel = categories;

    for (const idStr of pathParams) {
        const id = parseInt(idStr);
        const match = currentLevel.find((c) => c.id === id);
        if (!match) break;
        path.push(match);
        currentLevel = match.children || [];
    }

    return path;
}
export function findCategoryPathByName(categories, name, path = []) {
    for (const category of categories) {
        const newPath = [...path, category];
        if (category.name === name) return newPath;

        if (category.children) {
            const result = findCategoryPathByName(category.children, name, newPath);
            if (result) return result;
        }
    }
    return null;
}
export function findCategoryBreadcrumbPath(categories, id, path = []) {
    for (const category of categories) {
        const newPath = [...path, category];
        if (category.id === parseInt(id)) return newPath;

        if (category.children?.length) {
            const result = findCategoryBreadcrumbPath(category.children, id, newPath);
            if (result) return result;
        }
    }
    return null;
}
