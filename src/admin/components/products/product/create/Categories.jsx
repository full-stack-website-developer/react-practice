import React, { useContext, useState, useEffect } from "react";
import { useFormikContext } from "formik";
import { categoriesList } from "../../../../../store/CategoriesList";
import { FormGroup, FormControlLabel, Checkbox, TextField, Typography, Divider, Box } from "@mui/material";

const Categories = () => {
    const { categories, parentCategories } = useContext(categoriesList);
    const { values, setFieldValue } = useFormikContext();
    const [filteredParentCategories, setFilteredParentCategories] = useState([]);

    useEffect(() => {
        const defaultCategories = parentCategories.map((parentCategory) => {
            const subCategories = categories.filter(
                (category) => parseInt(category.parentId) === parseInt(parentCategory.id)
            );
            return {
                ...parentCategory,
                subCategories: subCategories,
            };
        });
        setFilteredParentCategories(defaultCategories);
    }, [parentCategories, categories]);

    const handleParentCategoryChange = (id) => {
        const { parent } = values.category;
        if (parent.includes(id)) {
            setFieldValue(
                "category.parent",
                parent.filter((parentId) => parentId !== id)
            );
        } else {
            setFieldValue("category.parent", [...parent, id]);
        }
    };

    const handleSubCategoryChange = (id) => {
        const { subCategories } = values.category;
        if (subCategories.includes(id)) {
            setFieldValue(
                "category.subCategories",
                subCategories.filter((subId) => subId !== id)
            );
        } else {
            setFieldValue("category.subCategories", [...subCategories, id]);
        }
    };

    const filterCategory = (e) => {
        const searchValue = e.target.value.toLowerCase();
        if (searchValue === "") {
            setFilteredParentCategories(parentCategories.map((parentCategory) => {
                const subCategories = categories.filter(
                    (category) => parseInt(category.parentId) === parseInt(parentCategory.id)
                );
                return {
                    ...parentCategory,
                    subCategories: subCategories,
                };
            }));
            return;
        }

        const filtered = parentCategories
            .map((parentCategory) => {
                const matchingSubCategories = categories.filter(
                    (category) =>
                        parseInt(category.parentId) === parseInt(parentCategory.id) &&
                        category.name.toLowerCase().includes(searchValue)
                );

                if (
                    parentCategory.name.toLowerCase().includes(searchValue) ||
                    matchingSubCategories.length > 0
                ) {
                    return {
                        ...parentCategory,
                        subCategories: matchingSubCategories,
                    };
                }
                return null;
            })
            .filter((category) => category !== null);

        setFilteredParentCategories(filtered);
    };

    return (
        <Box sx={{ mt: 3 }}>
            <TextField
                label="Search Categories"
                variant="outlined"
                fullWidth
                onChange={filterCategory}
                sx={{ mb: 2 }}
            />

            <FormGroup>
                {filteredParentCategories.length > 0 ? (
                    filteredParentCategories.map((parentCategory) => (
                        <Box key={parentCategory.id} sx={{ mb: 2 }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={values.category.parent.includes(parentCategory.id)}
                                        onChange={() => handleParentCategoryChange(parentCategory.id)}
                                        color="primary"
                                    />
                                }
                                label={<Typography variant="h6">{parentCategory.name}</Typography>}
                            />

                            {parentCategory.subCategories?.length > 0 && (
                                <Box sx={{ pl: 3 }}>
                                    {parentCategory.subCategories.map((subCategory) => (
                                        <FormControlLabel
                                            key={subCategory.id}
                                            control={
                                                <Checkbox
                                                    checked={values.category.subCategories.includes(subCategory.id)}
                                                    onChange={() => handleSubCategoryChange(subCategory.id)}
                                                    color="secondary"
                                                />
                                            }
                                            label={<Typography variant="body1">{subCategory.name}</Typography>}
                                        />
                                    ))}
                                </Box>
                            )}

                            <Divider sx={{ mt: 1, mb: 1 }} />
                        </Box>
                    ))
                ) : (
                    <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                        No categories found. Please adjust your search.
                    </Typography>
                )}
            </FormGroup>
        </Box>
    );
};

export default Categories;
