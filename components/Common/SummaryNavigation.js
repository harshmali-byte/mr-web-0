import React, { useState, useEffect, useRef } from 'react';
import { Grid, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function SummaryNavigation({ Research }) {
    const theme = useTheme();
    const navShowH3 = false;
    const [activeId, setActiveId] = useState();
    const [nestedHeadings, setNestedHeadings] = useState([]);
    const [nestedHeadingsTags, setNestedHeadingsTags] = useState([]);
    const [isNavigationLoaded, setIsNavigationLoaded] = useState(false);

    const headingElementsRef = useRef({});

    useEffect(() => {
        if (isNavigationLoaded || !Research || !Research.Summary) {
            return;
        }

        const container = document.querySelector("#researchPostSummary")

        let headings = container.querySelectorAll(`h2${navShowH3 ? ', h3' : ''}`);
        headings.forEach((head, index) => {
            if (!head.id) {
                head.id = `post_${index}`;
            }
        });

        setNestedHeadingsTags(headings);

    }, [isNavigationLoaded, Research]);

    useEffect(() => {
        if (!nestedHeadingsTags || nestedHeadingsTags.length === 0) {
            return;
        }

        const headingElements = Array.from(nestedHeadingsTags);

        getNestedHeadings(headingElements);
        setIsNavigationLoaded(true);
    }, [nestedHeadingsTags])

    useEffect(() => {
        if (!nestedHeadings && nestedHeadings.length === 0) {
            return;
        }

        const callback = (headings) => {
            headingElementsRef.current = headings.reduce((map, headingElement) => {
                map[headingElement.target.id] = headingElement;
                return map;
            }, headingElementsRef.current);

            // Get all headings that are currently visible on the page
            const visibleHeadings = [];
            Object.keys(headingElementsRef.current).forEach((key) => {
                const headingElement = headingElementsRef.current[key];
                if (headingElement.isIntersecting) {
                    visibleHeadings.push(headingElement);
                }
            });

            const getIndexFromId = (id) =>
                nestedHeadings.findIndex((heading) => heading.id === id);

            // If there is only one visible heading, this is our "active" heading
            if (visibleHeadings.length === 1) {
                setActiveId(visibleHeadings[0].target.id);
                // If there is more than one visible heading,
                // choose the one that is closest to the top of the page
            } else if (visibleHeadings.length > 1) {
                const sortedVisibleHeadings = visibleHeadings.sort(
                    (a, b) => getIndexFromId(a.target.id) > getIndexFromId(b.target.id)
                );

                setActiveId(sortedVisibleHeadings[0].target.id);
            }
        };

        const observer = new IntersectionObserver(callback, { root: document.querySelector('iframe'), rootMargin: "10px" });

        nestedHeadingsTags.forEach((element) =>
            observer.observe(element)
        );

        return () => observer.disconnect();
    }, [nestedHeadingsTags]);

    const getNestedHeadings = (headingElements) => {
        const nestedHeadings = [];

        headingElements.forEach((heading) => {
            const { innerText: title, id } = heading;

            if (heading.nodeName === "H2") {
                nestedHeadings.push({ id, title, items: [] });
            }
            else if (navShowH3 && heading.nodeName === "H3" && nestedHeadings.length > 0) {
                nestedHeadings[nestedHeadings.length - 1].items.push({ id, title });
            }
        });

        setNestedHeadings(nestedHeadings);
    };

    return (
        <nav aria-label="Table of contents">
            <Grid container spacing={0}>
                {nestedHeadings.map((heading, index) => (
                    <Grid xs={12} item key={index} sx={{ borderLeft: heading.id === activeId ? '3px solid' : '', borderLeftColor: theme.palette.themeColor.main, mb: 1, pl: 1, pr: 1 }}>
                        <Link underline="none" sx={{
                            fontSize: 15, cursor: 'pointer', color: heading.id === activeId ? theme.palette.themeColor.main : '',
                            '&:hover': { color: theme.palette.themeColor.main }
                        }}
                            onClick={(e) => {
                                if (heading.id) {
                                    document.querySelector(`#${heading.id}`).scrollIntoView({ behavior: 'smooth' });
                                }
                            }}
                        >
                            {heading.title}
                        </Link>

                        {heading.items.length > 0 && (
                            <Grid container spacing={0}>
                                {heading.items.map((child, childIndex) => (
                                    <Link key={childIndex} underline="none" sx={{ fontSize: 15, cursor: 'pointer', color: heading.id === activeId ? theme.palette.themeColor.main : '' }}
                                        onClick={(e) => {
                                            if (child.id) {
                                                document.querySelector(`#${child.id}`).scrollIntoView({ behavior: 'smooth' });
                                            }
                                        }}
                                    >
                                        {child.title}
                                    </Link>
                                ))}
                            </Grid>
                        )}
                    </Grid>
                ))}
            </Grid>
        </nav>
    )
}