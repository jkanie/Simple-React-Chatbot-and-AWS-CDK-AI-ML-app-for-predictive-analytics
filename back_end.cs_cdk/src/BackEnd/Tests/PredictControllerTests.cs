using Amazon.Comprehend;
using Amazon.LexRuntimeV2;
using Amazon.Rekognition;
using Amazon.TranscribeService;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Threading.Tasks;
using Xunit;

namespace Namespace0001.Tests
{
    public class PredictControllerTests
    {
        [Fact]
        public async Task Post_ValidImageKey_ReturnsOkResult()
        {
            // Arrange
            var rekognitionClientMock = new Mock<AmazonRekognitionClient>();
            var transcribeClientMock = new Mock<AmazonTranscribeServiceClient>();
            var comprehendClientMock = new Mock<AmazonComprehendClient>();
            var lexClientMock = new Mock<AmazonLexRuntimeV2Client>();

            var controller = new Controllers.PredictController(rekognitionClientMock.Object, transcribeClientMock.Object, comprehendClientMock.Object, lexClientMock.Object);

            // Act
            var result = await controller.Post("some-image-key");

            // Assert
            // Assert.IsType<OkResult>(result); // For simple return of Ok()
            Assert.IsType<OkObjectResult>(result); // For return of Ok(some_object)
        }
    }
}
