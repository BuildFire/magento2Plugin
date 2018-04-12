import React, { Component } from 'react';
import { getCategoryDetails } from '../services/category-service';
import Subcategory from '../components/subcategory';
import Spinner from 'react-spinkit';

class SubcategoryContainer extends Component {
  state = {
    isHydrated: false
  };

  componentDidMount() {
    getCategoryDetails(this.props.match.params.id)
      .then(res => {
        const category = JSON.parse(res);

        const promises = category.children
          .split(',')
          .map(id => getCategoryDetails(id));

        Promise.all(promises).then(res => {
          const categories = [];
          res.map(unparsedCategory => {
            const category = JSON.parse(unparsedCategory);
            if (category.include_in_menu) {
              categories.push(category);
            }
          });

          category.childCategoryData = categories
            .filter(({ is_active }) => is_active)
            .sort(
              (categoryA, categoryB) =>
                categoryA.position < categoryB.position ? -1 : 1
            );

          this.setState({
            isHydrated: true,
            category
          });
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return this.state.isHydrated ? (
      <Subcategory
        category={this.state.category}
        categoryImageAtName={window.buildfireConfig.categoryImageAtName}
        categoryThumbnailAtName={window.buildfireConfig.categoryThumbnailAtName}
      />
    ) : (
      <Spinner color="gray" />
    );
  }
}

export default SubcategoryContainer;
