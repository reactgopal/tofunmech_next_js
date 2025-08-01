'use client';

import Link from 'next/link';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

import { usePathname, useParams, useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { findCategoryById, resolveCategoryPath, findCategoryPathByName, findCategoryBreadcrumbPath } from '@/utils/helpers';

const Breadcrumbs = () => {
    const pathname = usePathname();
    const params = useParams();
    const searchParams = useSearchParams();
    const { categories } = useSelector((state) => state.categories);
    const product = useSelector((state) => state.products.add_Details);

    const pathSegments = pathname.split('/').filter((seg) => seg);


    let crumbs = [{ href: '/', label: 'Home' }];

    // 👉 CASE 1: Catelog page (/catelog/1/2/3)
    if (pathSegments[0] === 'catelog') {
        const catIds = pathSegments.slice(1); // remove 'catelog'
        const categoryPath = resolveCategoryPath(categories, catIds);
        crumbs = [
            ...crumbs,
            ...categoryPath.map((cat, i) => ({
                href: `/catelog/${categoryPath.slice(0, i + 1).map((c) => c.id).join('/')}`,
                label: cat.name,
            }))
        ];
    }

    // 👉 CASE 2: Shop page (/shop/Brake Repair Kit?cate=cate3)
    else if (pathSegments[0] === 'shop' && params?.cate_name) {
        const cateName = decodeURIComponent(params.cate_name);
        const categoryPath = findCategoryPathByName(categories, cateName) || [];

        crumbs = [
            ...crumbs,
            ...categoryPath.map((cat, i) => ({
                href: `/catelog/${categoryPath.slice(0, i + 1).map((c) => c.id).join('/')}`,
                label: cat.name,
            }))
        ];
    }

    // 👉 CASE 3: Product Detail (/productsdetail/[id]/[PN])
    else if (pathSegments[0] === 'productsdetail') {
        // const productName = decodeURIComponent(params?.PN || "");
        const productName = product?.name || "";
        const { cate1, cate2, cate3 } = product || {};

        const categoryNames = [cate1, cate2, cate3].filter(Boolean);

        const pathIds = [];
        const categoryPath = [];

        let currentCategories = categories;

        for (const name of categoryNames) {
            const found = currentCategories?.find(cat => cat.name === name);
            if (found) {
                pathIds.push(found.id);
                categoryPath.push(found);
                currentCategories = found.children || [];
            } else {
                break;
            }
        }

        // 👉 Determine last category level (cate1/cate2/cate3)
        const cateParam = `cate${categoryPath.length}`;
        const lastCategory = categoryPath[categoryPath.length - 1];

        crumbs = [
            ...crumbs,
            ...categoryPath.slice(0, -1).map((cat, i) => ({
                href: `/catelog/${pathIds.slice(0, i + 1).join('/')}`,
                label: cat.name,
            })),
            {
                href: `/shop/${encodeURIComponent(lastCategory?.name)}?cate=${cateParam}`,
                label: lastCategory?.name,
            },
            {
                label: productName,
            }
        ];
    }
    console.log(crumbs, "crumbs");


    return (
        <nav aria-label="breadcrumb" className="breadcrumb-nav">
            <ul className="breadcrumb-list">
                {crumbs.map((crumb, index) => (
                    <li key={index} className="breadcrumb-item">
                        {index > 0 && <span className="mx-1"> <MdOutlineKeyboardArrowRight /></span>}
                        {crumb.href && index < crumbs.length - 1 ? (
                            <Link href={crumb.href} className="breadcrumb-link">
                                {crumb.label}

                            </Link>
                        ) : (
                            <span className="breadcrumb-current">{crumb.label}</span>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Breadcrumbs;
